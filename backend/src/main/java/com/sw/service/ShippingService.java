package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ShippingRepository;
import com.sw.entity.Shipping;

@Service
public class ShippingService {
	@Autowired
    private ShippingRepository shippingRepository;

    public List<Shipping> getAllShippings() {
        return shippingRepository.findAll();
    }

    public Shipping getShippingById(Long id) {
        return shippingRepository.findById(id).orElse(null);
    }

    public Shipping createShipping(Shipping shipping) {
        return shippingRepository.save(shipping);
    }

    public Shipping updateShipping(Long id, Shipping updatedShipping) {
        Shipping existing = shippingRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setOrder(updatedShipping.getOrder());
        existing.setCarrier(updatedShipping.getCarrier());
        existing.setStatus(updatedShipping.getStatus());
        existing.setShippingDate(updatedShipping.getShippingDate());

        return shippingRepository.save(existing);
    }

    public void deleteShipping(Long id) {
        shippingRepository.deleteById(id);
    }
}
