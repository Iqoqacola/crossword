DROP DATABASE crossword;

CREATE DATABASE crossword;
-- CREATE DATABASE IF NOT EXISTS crossword;

USE crossword;

CREATE TABLE useradmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert Admin 
INSERT INTO useradmin (username, password_hash) 
VALUES ('tester', '$2b$10$EuJQpgFjMXKHhoNREtBEJuNpA7hmivker.aAFYqezXp7m2uZrp8Yy');

CREATE TABLE puzzles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Puzzle',
    words_data JSON NOT NULL,
    grid_data JSON NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;