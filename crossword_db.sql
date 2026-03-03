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
-- username: tester
-- password: tester123
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

-- =====================================
-- DATA DUMMY 1
-- =====================================
-- M O U S E . . . . .
-- O . . . . . . . . .
-- N . H . B . . . . .
-- I N T E R N E T . .
-- T . M . O . . . . .
-- O . L . W . . . W .
-- R . . . S E R V E R
-- . . . . E . . . B .
-- . . . . R . . . . .
INSERT INTO puzzles (title, words_data, grid_data) 
VALUES (
    'Puzzle 1: Internet & Hardware',
    '[
        {"word": "MOUSE", "clue": "Perangkat keras untuk menggerakkan kursor", "row": 0, "col": 0, "direction": "HORIZONTAL"},
        {"word": "MONITOR", "clue": "Layar untuk menampilkan output visual komputer", "row": 0, "col": 0, "direction": "VERTICAL"},
        {"word": "HTML", "clue": "Bahasa markup standar untuk membuat halaman web", "row": 2, "col": 2, "direction": "VERTICAL"},
        {"word": "INTERNET", "clue": "Jaringan global yang menghubungkan komputer di seluruh dunia", "row": 3, "col": 0, "direction": "HORIZONTAL"},
        {"word": "BROWSER", "clue": "Perangkat lunak untuk menjelajahi web (contoh: Chrome)", "row": 2, "col": 4, "direction": "VERTICAL"},
        {"word": "SERVER", "clue": "Komputer penyedia layanan dan data untuk client", "row": 6, "col": 4, "direction": "HORIZONTAL"},
        {"word": "WEB", "clue": "Singkatan dari World Wide ...", "row": 5, "col": 8, "direction": "VERTICAL"}
    ]',
    '{
        "rows": 9, 
        "cols": 10, 
        "cells": [
            ["M", "O", "U", "S", "E", null, null, null, null, null],
            ["O", null, null, null, null, null, null, null, null, null],
            ["N", null, "H", null, "B", null, null, null, null, null],
            ["I", "N", "T", "E", "R", "N", "E", "T", null, null],
            ["T", null, "M", null, "O", null, null, null, null, null],
            ["O", null, "L", null, "W", null, null, null, "W", null],
            ["R", null, null, null, "S", "E", "R", "V", "E", "R"],
            [null, null, null, null, "E", null, null, null, "B", null],
            [null, null, null, null, "R", null, null, null, null, null]
        ]
    }'
);

-- =====================================
-- DATA DUMMY 2
-- =====================================
-- U N I T Y . .
-- N . . . . . .
-- R . . . . . .
-- E N G I N E .
-- A . A . . . .
-- L . M O U S E
-- . . E . . O .
-- . . . . B U G
-- . . . . . N .
-- . . . . . D .
INSERT INTO puzzles (title, words_data, grid_data) 
VALUES (
    'Puzzle 2: Game Development',
    '[
        {"word": "UNITY", "clue": "Game engine populer yang menggunakan C#", "row": 0, "col": 0, "direction": "HORIZONTAL"},
        {"word": "UNREAL", "clue": "Game engine canggih buatan Epic Games", "row": 0, "col": 0, "direction": "VERTICAL"},
        {"word": "ENGINE", "clue": "Mesin utama di balik pembuatan video game (Bahasa Inggris)", "row": 3, "col": 0, "direction": "HORIZONTAL"},
        {"word": "GAME", "clue": "Permainan interaktif (Bahasa Inggris)", "row": 3, "col": 2, "direction": "VERTICAL"},
        {"word": "MOUSE", "clue": "Alat kontrol utama PC gaming selain keyboard", "row": 5, "col": 2, "direction": "HORIZONTAL"},
        {"word": "SOUND", "clue": "Audio atau efek suara di dalam game", "row": 5, "col": 5, "direction": "VERTICAL"},
        {"word": "BUG", "clue": "Error atau kecacatan dalam kode program", "row": 7, "col": 4, "direction": "HORIZONTAL"}
    ]',
    '{
        "rows": 10, 
        "cols": 7, 
        "cells": [
            ["U", "N", "I", "T", "Y", null, null],
            ["N", null, null, null, null, null, null],
            ["R", null, null, null, null, null, null],
            ["E", "N", "G", "I", "N", "E", null],
            ["A", null, "A", null, null, null, null],
            ["L", null, "M", "O", "U", "S", "E"],
            [null, null, "E", null, null, "O", null],
            [null, null, null, null, "B", "U", "G"],
            [null, null, null, null, null, "N", null],
            [null, null, null, null, null, "D", null]
        ]
    }'
);