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

import com.sw.entity.Complaint;
import com.sw.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
	@Autowired
	private ComplaintService complaintService;
	
	@GetMapping
	public List<Complaint> getAllComplaints() {
		return complaintService.getAllComplaints();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
		Complaint complaint = complaintService.getComplaintById(id);
		if (complaint == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(complaint);
	}

	@PostMapping
	public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
		return ResponseEntity.ok(complaintService.createComplaint(complaint));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Complaint> updateComplaint(@PathVariable Long id, @RequestBody Complaint complaint) {
		Complaint updated = complaintService.updateComplaint(id, complaint);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
		complaintService.deleteComplaint(id);
		return ResponseEntity.noContent().build();
	}
}
