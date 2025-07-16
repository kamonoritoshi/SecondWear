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

import com.sw.entity.Resolution;
import com.sw.service.ResolutionService;

@RestController
@RequestMapping("/api/resolutions")
public class ResolutionController {
	@Autowired
	private ResolutionService resolutionService;
	
	@GetMapping
	public List<Resolution> getAllResolutions() {
		return resolutionService.getAllResolutions();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Resolution> getResolutionById(@PathVariable Long id) {
		Resolution resolution = resolutionService.getResolutionById(id);
		if (resolution == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(resolution);
	}

	@PostMapping
	public ResponseEntity<Resolution> createResolution(@RequestBody Resolution resolution) {
		return ResponseEntity.ok(resolutionService.createResolution(resolution));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Resolution> updateResolution(@PathVariable Long id, @RequestBody Resolution resolution) {
		Resolution updated = resolutionService.updateResolution(id, resolution);
		if (updated == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteResolution(@PathVariable Long id) {
		resolutionService.deleteResolution(id);
		return ResponseEntity.noContent().build();
	}
}
