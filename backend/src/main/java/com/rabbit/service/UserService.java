package com.rabbit.service;

import com.rabbit.entity.User;
import com.rabbit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Default credentials
    private final Map<String, String> defaultCredentials = new HashMap<>();
    {
        defaultCredentials.put("admin@rabbit.com", "admin123");
        defaultCredentials.put("agent@rabbit.com", "agent123");
        defaultCredentials.put("customer@rabbit.com", "customer123");
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .build();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Map<String, Object> login(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        
        // Check if using default credentials
        if (!defaultCredentials.containsKey(email) || !defaultCredentials.get(email).equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return response;
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            if (!user.getIsActive()) {
                response.put("success", false);
                response.put("message", "Account is deactivated");
                return response;
            }

            // Create response without password
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("email", user.getEmail());
            userData.put("name", user.getName());
            userData.put("role", user.getRole());
            userData.put("isActive", user.getIsActive());

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", userData);
            return response;
        }

        response.put("success", false);
        response.put("message", "Invalid email or password");
        return response;
    }

    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();
        
        // Check if email already exists
        if (existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return response;
        }

        // Check if username already exists
        if (existsByUsername(user.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already taken");
            return response;
        }

        // Set default values
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User savedUser = userRepository.save(user);

        // Create response without password
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("email", savedUser.getEmail());
        userData.put("name", savedUser.getName());
        userData.put("role", savedUser.getRole());
        userData.put("isActive", savedUser.getIsActive());

        response.put("success", true);
        response.put("message", "Registration successful");
        response.put("user", userData);
        return response;
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
} 