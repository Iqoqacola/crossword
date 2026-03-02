const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/DB.js");

const Admin = sequelize.define("Admin", {
    username: {
        type: DataTypes.STRING(100), allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING(255), allowNull: false,
    },
}, { tableName: "useradmin", timestamps: false });

module.exports = Admin;