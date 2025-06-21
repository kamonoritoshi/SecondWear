package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ReviewRepository;
import com.sw.entity.Review;

@Service
public class ReviewService {
	@Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review updatedReview) {
        Review existing = reviewRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setProduct(updatedReview.getProduct());
        existing.setAccount(updatedReview.getAccount());
        existing.setRating(updatedReview.getRating());
        existing.setComment(updatedReview.getComment());
        existing.setReviewDate(updatedReview.getReviewDate());

        return reviewRepository.save(existing);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
