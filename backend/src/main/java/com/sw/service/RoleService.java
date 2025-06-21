package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.RoleRepository;
import com.sw.entity.Role;

@Service
public class RoleService {
	@Autowired
    private RoleRepository rDAO;
	
	public List<Role> getAllRoles() {
        return rDAO.findAll();
    }

    public Role getRoleById(Long id) {
        return rDAO.findById(id).orElse(null);
    }

    public Role createRole(Role role) {
        return rDAO.save(role);
    }

    public Role updateRole(Long id, Role updatedRole) {
        Role existing = rDAO.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setRoleName(updatedRole.getRoleName());
        return rDAO.save(existing);
    }

    public void deleteRole(Long id) {
    	rDAO.deleteById(id);
    }
}
