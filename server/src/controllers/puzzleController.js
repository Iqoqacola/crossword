const Admin = require('../models/adminModels');
const Puzzle = require('../models/puzzleModels');

// Create New Puzzle (Admin only)
const createPuzzle = async (req, res) => {
    const { title, words_data, grid_data } = req.body;

    try {
        const newPuzzle = await Puzzle.create({
            title,
            words_data,
            grid_data
        });

        res.status(201).json({
            success: true,
            message: "Puzzle created successfully",
            data: newPuzzle
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create puzzle",
            data: null,
            error: error.message
        });
    }
};

// Get All Puzzles (Public)
const getAllPuzzles = async (req, res) => {
    try {
        const puzzles = await Puzzle.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: "Puzzles retrieved successfully",
            data: puzzles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve puzzles",
            data: null,
            error: error.message
        });
    }
};

// Get Puzzle By ID (Public)
const getPuzzleById = async (req, res) => {
    const { id } = req.params;

    try {
        const puzzle = await Puzzle.findByPk(id);

        if (!puzzle) {
            return res.status(404).json({
                success: false,
                message: "Puzzle not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Puzzle retrieved successfully",
            data: puzzle
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal server error occurred",
            data: null,
            error: error.message
        });
    }
};

// Preview crossword generation
const generatePreview = (req, res) => {
    const { words_data } = req.body;

    if (!words_data || !Array.isArray(words_data) || words_data.length < 5) {
        return res.status(400).json({
            success: false,
            message: "Sediakan minimal 5 kata untuk di-generate",
            data: null
        });
    }

    try {
        const result = generateCrossword(words_data);

        res.status(200).json({
            success: true,
            message: "Crossword successfully generated",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating crossword",
            data: null,
            error: error.message
        });
    }
};

module.exports = {
    createPuzzle,
    getAllPuzzles,
    getPuzzleById,
    generatePreview
};