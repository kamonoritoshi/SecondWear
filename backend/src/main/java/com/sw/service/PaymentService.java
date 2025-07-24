package com.sw.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.PaymentRepository;
import com.sw.entity.Order;
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
    
    public Payment findByOrderId(Long orderId) {
        return paymentRepository.findByOrder_OrderId(orderId);
    }
    
    public Payment createPayment(Order order, String method, String status, BigDecimal amount) {
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setMethod(method);
        payment.setStatus(status);
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDateTime.now());
        return paymentRepository.save(payment);
    }
}
