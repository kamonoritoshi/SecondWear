package com.sw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sw.dao.ResolutionRepository;
import com.sw.entity.Resolution;

@Service
public class ResolutionService {
	@Autowired
    private ResolutionRepository resolutionRepository;

    public List<Resolution> getAllResolutions() {
        return resolutionRepository.findAll();
    }

    public Resolution getResolutionById(Long id) {
        return resolutionRepository.findById(id).orElse(null);
    }

    public Resolution createResolution(Resolution resolution) {
        return resolutionRepository.save(resolution);
    }

    public Resolution updateResolution(Long id, Resolution updatedResolution) {
        Resolution existing = resolutionRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setComplaint(updatedResolution.getComplaint());
        existing.setResult(updatedResolution.getResult());
        existing.setResolutionDate(updatedResolution.getResolutionDate());

        return resolutionRepository.save(existing);
    }

    public void deleteResolution(Long id) {
        resolutionRepository.deleteById(id);
    }
}
