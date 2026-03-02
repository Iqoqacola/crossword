const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModels');
require('dotenv').config({ path: './.env.dev' });


const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRED }
    );
};

// Login Admin
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Admin.findOne({ where: { username: username } });


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password",
                data: null
            });
        }

        const validPass = await bcrypt.compare(password, user.password_hash);

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password",
                data: null
            });
        }

        const token = generateToken(user.id);

        res.header('Authorization', token).json({
            success: true,
            message: "Logged in successfully",
            data: {
                user: {
                    username: user.username
                },
                token: token,
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
            error: err.message
        })
    }
}

module.exports = {
    loginAdmin
};