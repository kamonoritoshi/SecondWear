package com.sw.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sw.entity.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long>{

}
