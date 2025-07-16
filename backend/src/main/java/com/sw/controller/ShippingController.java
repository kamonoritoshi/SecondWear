package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.entity.Shipping;
import com.sw.service.ShippingService;

@RestController
@RequestMapping("/api/shippings")
public class ShippingController {
	@Autowired 
	private ShippingService shippingService;

	@GetMapping
	public List<Shipping> getAllShippings() {
		return shippingService.getAllShippings();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Shipping> getShippingById(@PathVariable Long id) {
		Shipping shipping = shippingService.getShippingById(id);
		if (shipping == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(shipping);
	}

	@PostMapping
	public ResponseEntity<Shipping> createShipping(@RequestBody Shipping shipping) {
		return ResponseEntity.ok(shippingService.createShipping(shipping));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Shipping> updateShipping(@PathVariable Long id, @RequestBody Shipping shipping) {
		Shipping updated = shippingService.updateShipping(id, shipping);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteShipping(@PathVariable Long id) {
		shippingService.deleteShipping(id);
		return ResponseEntity.noContent().build();
	}
}
