-- This file is intentionally left empty to allow users to register themselves
-- No default data will be inserted

-- Insert admin user
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('admin', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Admin User', 'admin@rabbit.com', '1234567890', 'ADMIN', true);

-- Insert sample agent
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('agent1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'John Agent', 'agent@rabbit.com', '9876543210', 'AGENT', true);

-- Insert sample customer
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('customer1', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Jane Customer', 'customer@rabbit.com', '5555555555', 'CUSTOMER', true);

-- Insert sample property
INSERT INTO properties (title, description, location, price, agent_id, property_type, bedrooms, bathrooms, area)
VALUES ('Luxury Apartment', 'Beautiful luxury apartment in city center', 'New York, NY', 500000.00, 2, 'APARTMENT', 2, 2, 1200.00);

-- Insert Sample Properties
INSERT INTO properties (title, description, address, price, property_type, bedrooms, bathrooms, square_feet, is_available)
VALUES 
('Family House', 'Spacious family house with garden', '456 Oak Ave', 750000.00, 'HOUSE', 4, 3, 2500.00, true),
('Studio Apartment', 'Modern studio apartment', '789 Pine Rd', 250000.00, 'APARTMENT', 1, 1, 600.00, true);

-- Default admin user
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('admin@rabbit.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Admin User', 'admin@rabbit.com', '1234567890', 'ADMIN', true);

-- Default agent user
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('agent@rabbit.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'John Agent', 'agent@rabbit.com', '9876543210', 'AGENT', true);

-- Default customer user
INSERT INTO users (username, password, name, email, phone_number, role, is_active)
VALUES ('customer@rabbit.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'Jane Customer', 'customer@rabbit.com', '5555555555', 'CUSTOMER', true);

-- Insert sample properties
INSERT INTO properties (title, description, location, price, agent_id, property_type, bedrooms, bathrooms, area, is_available)
VALUES 
('Luxury Apartment', 'Beautiful luxury apartment in city center', 'New York, NY', 500000.00, 2, 'APARTMENT', 2, 2, 1200.00, true),
('Family House', 'Spacious family house with garden', '456 Oak Ave', 750000.00, 2, 'HOUSE', 4, 3, 2500.00, true),
('Studio Apartment', 'Modern studio apartment', '789 Pine Rd', 250000.00, 2, 'APARTMENT', 1, 1, 600.00, true); 