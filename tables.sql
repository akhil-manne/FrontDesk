-- Create the database first
CREATE DATABASE clinic_db;

-- Use the created database
USE clinic_db;

-- Table: Admin
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_username VARCHAR(255) NOT NULL UNIQUE,
    admin_password VARCHAR(255) NOT NULL
);

-- Table: FrontDeskStaff
CREATE TABLE FrontDeskStaff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_username VARCHAR(255) NOT NULL UNIQUE,
    staff_password VARCHAR(255) NOT NULL
);

-- Table: Queue
CREATE TABLE Queue (
    q_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    queue_status ENUM('normal', 'urgent') NOT NULL,
    queue_progress ENUM('wait', 'with_doc', 'complete') NOT NULL DEFAULT 'wait',
    priority_num INT NOT NULL,
    wait_time INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Doctor
CREATE TABLE Doctor (
    doc_id INT AUTO_INCREMENT PRIMARY KEY,
    doc_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    gender CHAR(1) NOT NULL,
    location VARCHAR(255) NOT NULL,
    next_available TIMESTAMP,
    doc_status ENUM('available', 'busy', 'off-duty') NOT NULL DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Appointments
CREATE TABLE Appointments (
    app_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doc_id INT NOT NULL,
    app_time TIMESTAMP NOT NULL,
    app_status ENUM('booked', 'completed', 'canceled') NOT NULL DEFAULT 'booked',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Queue(q_id),
    FOREIGN KEY (doc_id) REFERENCES Doctor(doc_id)
);

INSERT INTO FrontDeskStaff (username, password)
VALUES 
('frontDeskUser', 'frontDeskPass123'),
('frontDeskUser2', 'securePass456'),
('frontDeskUser3', 'anotherPass789');

