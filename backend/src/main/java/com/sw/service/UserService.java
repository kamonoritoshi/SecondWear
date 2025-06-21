package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.UserRepository;
import com.sw.entity.User;

@Service
public class UserService {
	@Autowired
    private UserRepository uDAO;
	
	public List<User> getAllUsers() {
        return uDAO.findAll();
    }

    public User getUserById(Long id) {
        return uDAO.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return uDAO.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User existing = uDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(updatedUser.getName());
        existing.setEmail(updatedUser.getEmail());
        existing.setPhone(updatedUser.getPhone());
        existing.setAddress(updatedUser.getAddress());

        return uDAO.save(existing);
    }

    public void deleteUser(Long id) {
    	uDAO.deleteById(id);
    }
}
