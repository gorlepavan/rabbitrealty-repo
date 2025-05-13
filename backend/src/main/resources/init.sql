-- Step 1: Drop existing tables if they exist
DROP TABLE IF EXISTS property_favorites;
DROP TABLE IF EXISTS property_inquiries;
DROP TABLE IF EXISTS property_amenities;
DROP TABLE IF EXISTS property_images;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS users;

-- Step 2: Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'CUSTOMER', 'AGENT')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create user_sessions table
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Step 4: Create properties table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    agent_id INTEGER NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area DOUBLE PRECISION NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'SOLD', 'RENTED', 'PENDING')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Step 5: Create property_images table
CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Step 6: Create property_amenities table
CREATE TABLE property_amenities (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    amenity_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Step 7: Create property_inquiries table
CREATE TABLE property_inquiries (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RESPONDED', 'CLOSED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Step 8: Create property_favorites table
CREATE TABLE property_favorites (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(property_id, user_id)
);

-- Step 9: Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_properties_agent_id ON properties(agent_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_property_inquiries_customer_id ON property_inquiries(customer_id);
CREATE INDEX idx_property_inquiries_property_id ON property_inquiries(property_id);
CREATE INDEX idx_property_favorites_user_id ON property_favorites(user_id);
CREATE INDEX idx_property_favorites_property_id ON property_favorites(property_id);

-- Insert initial admin user
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

-- Insert sample property amenities
INSERT INTO property_amenities (property_id, amenity_name)
VALUES 
(1, 'Swimming Pool'),
(1, 'Gym'),
(1, 'Parking');

-- Insert sample property images
INSERT INTO property_images (property_id, image_url, is_primary)
VALUES 
(1, 'https://example.com/image1.jpg', true),
(1, 'https://example.com/image2.jpg', false); 