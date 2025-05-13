package com.rabbit.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class DatabaseConnectionTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Bean
    CommandLineRunner testDatabaseConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅ Database Connection Test:");
                System.out.println("   URL: " + connection.getMetaData().getURL());
                System.out.println("   Username: " + connection.getMetaData().getUserName());
                System.out.println("   Database Product: " + connection.getMetaData().getDatabaseProductName());
                System.out.println("   Database Version: " + connection.getMetaData().getDatabaseProductVersion());
                
                // Test query execution
                String version = jdbcTemplate.queryForObject("SELECT version()", String.class);
                System.out.println("   PostgreSQL Version: " + version);
                
                // Test table count
                Integer tableCount = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'",
                    Integer.class
                );
                System.out.println("   Number of tables: " + tableCount);
                
                System.out.println("✅ Database connection successful!");
            } catch (Exception e) {
                System.err.println("❌ Database connection failed!");
                System.err.println("Error: " + e.getMessage());
                throw e;
            }
        };
    }
} 