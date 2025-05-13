package com.rabbit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public String testDatabase() {
        try {
            String result = jdbcTemplate.queryForObject("SELECT version()", String.class);
            return "Database connection successful! PostgreSQL version: " + result;
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }

    @GetMapping("/tables")
    public String listTables() {
        try {
            String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
            return jdbcTemplate.queryForList(sql, String.class).toString();
        } catch (Exception e) {
            return "Error listing tables: " + e.getMessage();
        }
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        String sql = "SELECT id, email, first_name, last_name, phone, role, is_active FROM users";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/users/admins")
    public List<Map<String, Object>> getAdminUsers() {
        String sql = "SELECT id, email, first_name, last_name, phone, role, is_active FROM users WHERE role = 'ADMIN'";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/users/agents")
    public List<Map<String, Object>> getAgentUsers() {
        String sql = "SELECT id, email, first_name, last_name, phone, role, is_active FROM users WHERE role = 'AGENT'";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/users/customers")
    public List<Map<String, Object>> getCustomerUsers() {
        String sql = "SELECT id, email, first_name, last_name, phone, role, is_active FROM users WHERE role = 'CUSTOMER'";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/users/active")
    public List<Map<String, Object>> getActiveUsers() {
        String sql = "SELECT id, email, first_name, last_name, phone, role, is_active FROM users WHERE is_active = true";
        return jdbcTemplate.queryForList(sql);
    }
} 