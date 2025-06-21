package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.OrderRepository;
import com.sw.entity.Order;

@Service
public class OrderService {
	@Autowired
    private OrderRepository oDAO;
	
	public List<Order> getAllOrders() {
        return oDAO.findAll();
    }

    public Order getOrderById(Long id) {
        return oDAO.findById(id).orElse(null);
    }

    public Order createOrder(Order order) {
        return oDAO.save(order);
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        Order existing = oDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAccount(updatedOrder.getAccount());
        existing.setProduct(updatedOrder.getProduct());
        existing.setStatus(updatedOrder.getStatus());
        existing.setTotalAmount(updatedOrder.getTotalAmount());

        return oDAO.save(existing);
    }

    public void deleteOrder(Long id) {
    	oDAO.deleteById(id);
    }
}
