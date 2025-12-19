const express = require('express');
const router = express.Router();

const customerRoutes = require('./customer.routes');
const providerRoutes = require('./provider.routes');
const adminRoutes = require('./admin.routes');
// Consider adding an auth route for login/register if not handled elsewhere
const Role = require('../models/User'); // Reusing User model for Auth
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple Auth Route Helper (Inline for simplicity as per structure)
router.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await Role.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new Role({ name, email, password, role });
        await user.save();

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Role.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.use('/customer', customerRoutes);
router.use('/provider', providerRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
