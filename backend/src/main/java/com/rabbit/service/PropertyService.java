package com.rabbit.service;

import com.rabbit.entity.Property;
import com.rabbit.entity.User;
import com.rabbit.repository.PropertyRepository;
import com.rabbit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public Property createProperty(Property property) {
        // Validate agent exists and is an agent
        User agent = userRepository.findById(property.getAgent().getId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));
        
        if (!agent.getRole().name().equals("AGENT")) {
            throw new RuntimeException("User is not an agent");
        }

        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public Property updateProperty(Long id, Property propertyDetails) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Update fields
        property.setTitle(propertyDetails.getTitle());
        property.setDescription(propertyDetails.getDescription());
        property.setLocation(propertyDetails.getLocation());
        property.setPrice(propertyDetails.getPrice());
        property.setPropertyType(propertyDetails.getPropertyType());
        property.setBedrooms(propertyDetails.getBedrooms());
        property.setBathrooms(propertyDetails.getBathrooms());
        property.setArea(propertyDetails.getArea());
        property.setStatus(propertyDetails.getStatus());

        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        propertyRepository.delete(property);
    }

    public List<Property> getPropertiesByAgent(Long agentId) {
        User agent = userRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));
        
        if (!agent.getRole().name().equals("AGENT")) {
            throw new RuntimeException("User is not an agent");
        }

        return propertyRepository.findByAgent(agent);
    }
} 