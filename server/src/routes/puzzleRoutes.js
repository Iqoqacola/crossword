const express = require('express');
const auth = require('../middleware/auth.js');

const {
    createPuzzle,
    getAllPuzzles,
    getPuzzleById,
    generatePreview
} = require('../controllers/puzzleController.js');

const router = express.Router();

// (Public)
router.get('/', getAllPuzzles);
router.get('/:id', getPuzzleById);

// (Protected)
router.post('/create', auth, createPuzzle);
router.post('/generate', auth, generatePreview);

module.exports = router;