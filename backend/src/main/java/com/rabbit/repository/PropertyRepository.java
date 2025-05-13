package com.rabbit.repository;

import com.rabbit.entity.Property;
import com.rabbit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByPropertyType(String propertyType);
    List<Property> findByIsAvailable(Boolean isAvailable);
    List<Property> findByPriceLessThanEqual(BigDecimal maxPrice);
    List<Property> findByAgent(User agent);
    List<Property> findByStatus(String status);
} 