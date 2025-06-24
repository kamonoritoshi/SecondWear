package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.PaymentRepository;
import com.sw.entity.Payment;

@Service
public class PaymentService {
	@Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        Payment existing = paymentRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setOrder(updatedPayment.getOrder());
        existing.setMethod(updatedPayment.getMethod());
        existing.setStatus(updatedPayment.getStatus());
        existing.setAmount(updatedPayment.getAmount());

        return paymentRepository.save(existing);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
