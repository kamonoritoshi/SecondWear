package com.sw.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.sw.dao.AccountRepository;
import com.sw.dao.CategoryRepository;
import com.sw.dao.ProductRepository;
import com.sw.dto.ProductDTO;
import com.sw.entity.Account;
import com.sw.entity.Category;
import com.sw.entity.Product;
import com.sw.security.CustomUserDetails;
import com.sw.security.JwtUtil;
import com.sw.service.CloudinaryUploadService;
import com.sw.service.ProductImageService;

@RestController
@RequestMapping("/api/seller/products")
public class SellerProductController {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CloudinaryUploadService cloudinaryUploadService;
	@Autowired
	private ProductImageService productImageService;

	@GetMapping
	public List<Product> getSellerProducts(Authentication authentication) {
	    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    Long accountId = userDetails.getAccount().getAccountId();
	    return productRepository.findByAccount_AccountId(accountId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Long id, Authentication authentication) {
	    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
	    Long accountId = userDetails.getAccount().getAccountId();

	    Product product = productRepository.findById(id)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));

	    if (!product.getAccount().getAccountId().equals(accountId)) {
	        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền xem sản phẩm này");
	    }

	    return ResponseEntity.ok(product);
	}
	
	@PostMapping(consumes = "multipart/form-data")
	public ResponseEntity<?> createProduct(
			@RequestPart("product") ProductDTO dto,
			@RequestPart(value = "images", required = false) List<MultipartFile> images,
			Authentication authentication) throws IOException {

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Account sellerAccount = userDetails.getAccount();

		Category category = categoryRepository.findById(dto.getCategoryId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Danh mục không hợp lệ"));

		// Map DTO to Entity
		Product newProduct = new Product();
		newProduct.setName(dto.getName());
		newProduct.setDescription(dto.getDescription());
		newProduct.setCondition(dto.getCondition());
		newProduct.setSize(dto.getSize());
		newProduct.setColor(dto.getColor());
		newProduct.setPrice(dto.getPrice());
		newProduct.setStatus(dto.getStatus());
		newProduct.setQuantity(dto.getQuantity());
		newProduct.setBrand(dto.getBrand());
		newProduct.setOrigin(dto.getOrigin());
		newProduct.setCategory(category);
		newProduct.setAccount(sellerAccount);
		newProduct.setApproved((byte) 0); // Sản phẩm mới mặc định chưa được duyệt

		// Lưu sản phẩm trước để có ID
		Product savedProduct = productRepository.save(newProduct);

		// Upload và lưu các link ảnh vào bảng ProductImage
		if (images != null && !images.isEmpty()) {
			for (MultipartFile imageFile : images) {
				if (!imageFile.isEmpty()) {
					String imageUrl = cloudinaryUploadService.uploadFile(imageFile);
					productImageService.addImage(savedProduct, imageUrl);
				}
			}
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
	}


	// ✨ 2. CẬP NHẬT ENDPOINT SỬA SẢN PHẨM (PUT)
	@PutMapping(value = "/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> updateProduct(
			@PathVariable Long id,
			@RequestPart("product") ProductDTO dto,
			@RequestPart(value = "images", required = false) List<MultipartFile> newImages,
			@RequestParam(value = "deleteImageIds", required = false) List<Long> deleteImageIds,
			Authentication authentication) throws IOException {

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Long accountId = userDetails.getAccount().getAccountId();

		Product existing = productRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));

		if (!existing.getAccount().getAccountId().equals(accountId)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Không có quyền sửa sản phẩm này");
		}
		
		// Cập nhật thông tin sản phẩm từ DTO
		Category category = categoryRepository.findById(dto.getCategoryId())
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Danh mục không hợp lệ"));
		existing.setName(dto.getName());
		existing.setDescription(dto.getDescription());
        // ... (cập nhật các trường khác tương tự)
		existing.setCategory(category);
		
		// Xóa các ảnh được yêu cầu
        if (deleteImageIds != null && !deleteImageIds.isEmpty()) {
            productImageService.deleteImagesByIds(deleteImageIds);
        }

        // Thêm các ảnh mới được upload
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile imageFile : newImages) {
				if (!imageFile.isEmpty()) {
                	String imageUrl = cloudinaryUploadService.uploadFile(imageFile);
                	productImageService.addImage(existing, imageUrl);
				}
            }
        }
        
		productRepository.save(existing);
		return ResponseEntity.ok("✅ Đã cập nhật sản phẩm");
	}

	@PutMapping("/{id}/quantity")
	public ResponseEntity<?> updateProductQuantity(@PathVariable Long id, @RequestBody int newQuantity,
	        @RequestHeader("Authorization") String token) {

	    // Lấy chuỗi token bằng cách loại bỏ "Bearer "
	    String jwt = token.substring(7);

	    // ✅ SỬA ĐỔI: Sử dụng phương thức mới từ JwtUtil
	    String email = jwtUtil.getEmailFromToken(jwt);
	    String role = jwtUtil.getRoleFromToken(jwt);

	    Product product = productRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));

	    Account seller = accountRepository.findByEmailAndRole(email, role)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Không tìm thấy người bán"));

	    if (!product.getAccount().getAccountId().equals(seller.getAccountId())) {
	        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền cập nhật sản phẩm này");
	    }

	    product.setQuantity(newQuantity);
	    productRepository.save(product);

	    return ResponseEntity.ok("Đã cập nhật số lượng mới: " + newQuantity);
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long accountId = userDetails.getAccount().getAccountId();

        // Tìm sản phẩm
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));

        // Kiểm tra quyền sở hữu
        if (!product.getAccount().getAccountId().equals(accountId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền xóa sản phẩm này");
        }

        // Xóa sản phẩm (và các ảnh liên quan nhờ vào Cascade)
        productRepository.delete(product);

        return ResponseEntity.ok("Sản phẩm đã được xóa thành công.");
    }
}
