create database fitlife;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, email, password_hash)
VALUES
('Amina', 'amina@example.com', 'Hash@password1'),
('Kamal', 'kamal@example.com', 'Hash@password2'),
('Sara', 'sara@example.com', 'Hash@password3'),
('Omar', 'omar@example.com', 'Hash@password4'),
('Mona', 'mona@example.com', 'Hash@password5'),
('Youssef', 'youssef@example.com', 'Hash@password6'),
('Nour', 'nour@example.com', 'Hash@password7'),
('Ali', 'ali@example.com', 'Hash@password8');
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;
SELECT * FROM users;

create Table user_plan (
id int primary key ,
user_id int ,
plan_id int ,
start_date datetime ,
end_date datetime  
);

create Table plan (
id int primary key ,
full_name varchar(100) ,
duration_in_weeks int ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 )




