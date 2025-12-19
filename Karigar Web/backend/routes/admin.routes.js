const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const User = require('../models/User');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// 1. Fetch list of all users
router.get('/users', auth, role(['admin']), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Suspend or remove user accounts (Using delete for 'remove')
router.delete('/users/:id', auth, role(['admin']), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. View and delete reported/inappropriate reviews
// (Assuming we list all reviews for moderation in this simplified scope)
router.get('/reviews', auth, role(['admin']), async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('customer', 'name')
            .populate('provider', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/reviews/:id', auth, role(['admin']), async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Basic Platform Stats
router.get('/stats', auth, role(['admin']), async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeProviders = await User.countDocuments({ role: 'provider', 'providerProfile.availability': true });

        res.json({
            totalUsers,
            totalBookings,
            activeProviders
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
