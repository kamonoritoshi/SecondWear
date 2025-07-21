package com.sw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sw.dao.AccountRepository;
import com.sw.dto.AdminStatisticsResponse;
import com.sw.entity.Account;
import com.sw.service.AdminStatisticsService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
    private AdminStatisticsService statisticsService;
	
	
	@Autowired
    private AccountRepository accountRepository;

	
    @GetMapping("/statistics")
    public AdminStatisticsResponse getStatistics() {
        return statisticsService.getAdminStatistics();
    }
    
    
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
    
}
