package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ComplaintRepository;
import com.sw.entity.Complaint;

@Service
public class ComplaintService {
	@Autowired
    private ComplaintRepository complaintRepository;
	
	public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id).orElse(null);
    }

    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public Complaint updateComplaint(Long id, Complaint updatedComplaint) {
        Complaint existing = complaintRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setAccount(updatedComplaint.getAccount());
        existing.setDescription(updatedComplaint.getDescription());
        existing.setStatus(updatedComplaint.getStatus());
        existing.setComplaintDate(updatedComplaint.getComplaintDate());

        return complaintRepository.save(existing);
    }

    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
}
