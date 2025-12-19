const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// 1. Search providers by category and location
// GET /api/customer/providers?category=Plumber&location=Mumbai
router.get('/providers', auth, role(['customer']), async (req, res) => {
    try {
        const { category, location } = req.query;
        const query = { role: 'provider' };

        if (category) query['providerProfile.serviceType'] = category;
        // Simple regex for location matching - in prod use geospatial query
        if (location) query['providerProfile.location'] = { $regex: location, $options: 'i' };

        const providers = await User.find(query).select('-password');
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. View a specific provider's profile and reviews
router.get('/providers/:id', auth, role(['customer']), async (req, res) => {
    try {
        const provider = await User.findById(req.params.id).select('-password');
        if (!provider || provider.role !== 'provider') {
            return res.status(404).json({ message: 'Provider not found' });
        }
        const reviews = await Review.find({ provider: req.params.id }).populate('customer', 'name');
        res.json({ provider, reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Submit a new service request (Booking)
router.post('/book', auth, role(['customer']), async (req, res) => {
    try {
        const { providerId, description, date, location } = req.body;

        const booking = new Booking({
            customer: req.user.id,
            provider: providerId,
            serviceDetails: { description, date, location }
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Fetch customer's own booking history/status
router.get('/bookings', auth, role(['customer']), async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user.id })
            .populate('provider', 'name providerProfile');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Submit a review for a completed service
router.post('/review', auth, role(['customer']), async (req, res) => {
    try {
        const { bookingId, providerId, rating, comment } = req.body;

        // Check if booking is completed (optional validation)
        const booking = await Booking.findOne({ _id: bookingId, status: 'completed' });
        if (!booking) {
            return res.status(400).json({ message: 'Booking not found or not completed' });
        }

        const review = new Review({
            booking: bookingId,
            customer: req.user.id,
            provider: providerId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
