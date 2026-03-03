const express = require('express');
const auth = require('../middleware/auth.js');
const { loginAdmin } = require('../controllers/authController.js');

const router = express.Router();

//Verify Route 
router.get('/me', auth, (req, res) => {
    res.status(200).json({
        message: "Token is valid"
    });
});

router.post('/signin', loginAdmin)

module.exports = router;