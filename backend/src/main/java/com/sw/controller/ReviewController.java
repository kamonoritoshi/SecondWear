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

import com.sw.entity.Review;
import com.sw.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	@GetMapping
	public List<Review> getAllReviews() {
		return reviewService.getAllReviews();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
		Review review = reviewService.getReviewById(id);
		if (review == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(review);
	}

	@PostMapping
	public ResponseEntity<Review> createReview(@RequestBody Review review) {
		return ResponseEntity.ok(reviewService.createReview(review));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
		Review updated = reviewService.updateReview(id, review);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
		reviewService.deleteReview(id);
		return ResponseEntity.noContent().build();
	}
}
