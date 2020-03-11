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

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            error: 'Invalid email or password'
        });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
        return res.status(200).json({
            success: true,
            data: user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid email or password'
        });
    }
};
