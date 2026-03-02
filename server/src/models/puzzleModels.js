const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/DB.js");

const Puzzle = sequelize.define("Puzzle", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'Untitled Puzzle'
    },
    words_data: {
        type: DataTypes.JSON,
        allowNull: false,
        // Example Content: [{ word: "REACT", clue: "Library frontend", answer: ... }]
    },
    grid_data: {
        type: DataTypes.JSON,
        allowNull: false,
        // Example Content: { rows: 10, cols: 10, cells: [...] }
    }
}, {
    tableName: "puzzles",
    timestamps: true,
});

module.exports = Puzzle;