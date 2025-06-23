package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.sw.entity.Account;
import com.sw.entity.Complaint;
import com.sw.entity.Order;
import com.sw.entity.Payment;
import com.sw.entity.Product;
import com.sw.entity.Resolution;
import com.sw.entity.Review;
import com.sw.entity.Role;
import com.sw.entity.Shipping;
import com.sw.entity.User;
import com.sw.service.AccountService;
import com.sw.service.ComplaintService;
import com.sw.service.OrderService;
import com.sw.service.PaymentService;
import com.sw.service.ProductService;
import com.sw.service.ResolutionService;
import com.sw.service.ReviewService;
import com.sw.service.RoleService;
import com.sw.service.ShippingService;
import com.sw.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@org.springframework.web.bind.annotation.RestController
public class RestController {
	@Autowired
	private ProductService pService;
	@Autowired
	private AccountService aService;
	@Autowired
	private UserService uService;
	@Autowired
    private RoleService rService;
	@Autowired
    private OrderService oService;
	@Autowired
    private PaymentService paymentService;
	@Autowired
    private ShippingService shippingService;
	@Autowired
    private ReviewService reviewService;
	@Autowired
    private ComplaintService complaintService;
	@Autowired
    private ResolutionService resolutionService;
	
	// Product REST API
	
	@GetMapping("/api/products")
	public List<Product> getAllProducts() {
		return pService.getAllProducts();
	}
	
	@GetMapping("/api/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = pService.getProductById(id);
        if (product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
    }
	
	@PostMapping("/api/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(pService.createProduct(product));
    }
	
	@PutMapping("/api/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = pService.updateProduct(id, product);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }
	
	@DeleteMapping("/api/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        pService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
	
	// Account REST API
	
	@GetMapping("/api/accounts")
    public List<Account> getAllAccounts() {
        return aService.getAllAccounts();
    }

    @GetMapping("/api/accounts/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Account account = aService.getAccountById(id);
        if (account == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(account);
    }

    @PostMapping("/api/accounts")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(aService.createAccount(account));
    }

    @PutMapping("/api/accounts/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        Account updated = aService.updateAccount(id, account);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/accounts/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        aService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
    
    // User REST API
    
    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return uService.getAllUsers();
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = uService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(uService.createUser(user));
    }

    @PutMapping("/api/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updated = uService.updateUser(id, user);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        uService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    // Role REST API
    
    @GetMapping("/api/roles")
    public List<Role> getAllRoles() {
        return rService.getAllRoles();
    }

    @GetMapping("/api/roles/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        Role role = rService.getRoleById(id);
        if (role == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(role);
    }

    @PostMapping("/api/roles")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        return ResponseEntity.ok(rService.createRole(role));
    }

    @PutMapping("/api/roles/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable Long id, @RequestBody Role role) {
        Role updated = rService.updateRole(id, role);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/roles/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        rService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
    
    // Order REST API
    
    @GetMapping("/api/orders")
    public List<Order> getAllOrders() {
        return oService.getAllOrders();
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = oService.getOrderById(id);
        if (order == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(order);
    }

    @PostMapping("/api/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(oService.createOrder(order));
    }

    @PutMapping("/api/orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        Order updated = oService.updateOrder(id, order);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/orders/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        oService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
    
 // Lấy đơn hàng theo tài khoản
    @GetMapping("/api/orders/account/{accountId}")
    public List<Order> getOrdersByAccount(@PathVariable Long accountId) {
        return oService.getOrdersByAccount(accountId);
    }

    // Lấy đơn hàng theo trạng thái
    @GetMapping("/api/orders/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return oService.getOrdersByStatus(status);
    }

    // Lấy đơn hàng theo tài khoản và trạng thái
    @GetMapping("/api/orders/account/{accountId}/status/{status}")
    public List<Order> getOrdersByAccountAndStatus(@PathVariable Long accountId, @PathVariable String status) {
        return oService.getOrdersByAccountAndStatus(accountId, status);
    }

    // Lấy tất cả đơn hàng mới nhất trước
    @GetMapping("/sorted/latest")
    public List<Order> getAllOrdersSortedByDateDesc() {
        return oService.getOrdersSortedByDateDesc();
    }
    
    // Payment REST API
    
    @GetMapping("/api/payments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/api/payments/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        if (payment == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/api/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.createPayment(payment));
    }

    @PutMapping("/api/payments/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        Payment updated = paymentService.updatePayment(id, payment);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
    
    // Shipping REST API
    
    @GetMapping("/api/shippings")
    public List<Shipping> getAllShippings() {
        return shippingService.getAllShippings();
    }

    @GetMapping("/api/shippings/{id}")
    public ResponseEntity<Shipping> getShippingById(@PathVariable Long id) {
        Shipping shipping = shippingService.getShippingById(id);
        if (shipping == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(shipping);
    }

    @PostMapping("/api/shippings")
    public ResponseEntity<Shipping> createShipping(@RequestBody Shipping shipping) {
        return ResponseEntity.ok(shippingService.createShipping(shipping));
    }

    @PutMapping("/api/shippings/{id}")
    public ResponseEntity<Shipping> updateShipping(@PathVariable Long id, @RequestBody Shipping shipping) {
        Shipping updated = shippingService.updateShipping(id, shipping);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/shippings/{id}")
    public ResponseEntity<Void> deleteShipping(@PathVariable Long id) {
        shippingService.deleteShipping(id);
        return ResponseEntity.noContent().build();
    }
    
    // Review REST API
    
    @GetMapping("/api/reviews")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/api/reviews/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        if (review == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(review);
    }

    @PostMapping("/api/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.createReview(review));
    }

    @PutMapping("/api/reviews/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review updated = reviewService.updateReview(id, review);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
    
    // Complaint REST API
    
    @GetMapping("/api/complaints")
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/api/complaints/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        Complaint complaint = complaintService.getComplaintById(id);
        if (complaint == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(complaint);
    }

    @PostMapping("/api/complaints")
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
        return ResponseEntity.ok(complaintService.createComplaint(complaint));
    }

    @PutMapping("/api/complaints/{id}")
    public ResponseEntity<Complaint> updateComplaint(@PathVariable Long id, @RequestBody Complaint complaint) {
        Complaint updated = complaintService.updateComplaint(id, complaint);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/complaints/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
    
    // Resolution REST API
    
    @GetMapping("/api/resolutions")
    public List<Resolution> getAllResolutions() {
        return resolutionService.getAllResolutions();
    }

    @GetMapping("/api/resolutions/{id}")
    public ResponseEntity<Resolution> getResolutionById(@PathVariable Long id) {
        Resolution resolution = resolutionService.getResolutionById(id);
        if (resolution == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(resolution);
    }

    @PostMapping("/api/resolutions")
    public ResponseEntity<Resolution> createResolution(@RequestBody Resolution resolution) {
        return ResponseEntity.ok(resolutionService.createResolution(resolution));
    }

    @PutMapping("/api/resolutions/{id}")
    public ResponseEntity<Resolution> updateResolution(@PathVariable Long id, @RequestBody Resolution resolution) {
        Resolution updated = resolutionService.updateResolution(id, resolution);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/resolutions/{id}")
    public ResponseEntity<Void> deleteResolution(@PathVariable Long id) {
        resolutionService.deleteResolution(id);
        return ResponseEntity.noContent().build();
    }
}
