const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
        return res.status(200).json({
            success: true,
            data: user,
            token
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'This email already exists'
            });
        }
        return res.status(500).json({
            error: 'Server error'
        });
    }
};
