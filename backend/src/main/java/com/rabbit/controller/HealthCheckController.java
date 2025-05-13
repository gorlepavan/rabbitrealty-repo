package com.rabbit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Map<String, Object> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        
        try {
            // Check database connection
            String dbVersion = jdbcTemplate.queryForObject("SELECT version()", String.class);
            response.put("database", Map.of(
                "status", "UP",
                "version", dbVersion
            ));
            
            // Check tables
            String tables = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'",
                String.class
            );
            response.put("tables", tables);
            
        } catch (Exception e) {
            response.put("database", Map.of(
                "status", "DOWN",
                "error", e.getMessage()
            ));
        }
        
        return response;
    }
} 