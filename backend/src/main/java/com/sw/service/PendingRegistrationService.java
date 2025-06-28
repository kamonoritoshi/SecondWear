package com.sw.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.sw.model.PendingRegistration;

@Service
public class PendingRegistrationService {
	private final Map<String, PendingRegistration> store = new ConcurrentHashMap<>();

    public void save(PendingRegistration pending) {
        store.put(pending.getEmail(), pending);
    }

    public PendingRegistration get(String email) {
        return store.get(email);
    }

    public void remove(String email) {
        store.remove(email);
    }

    public boolean exists(String email) {
        return store.containsKey(email);
    }
}
