const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const User = require('../models/User');
const Booking = require('../models/Booking');

// 1. Get Provider Profile (Own)
router.get('/profile', auth, role(['provider']), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Update provider profile
router.put('/profile', auth, role(['provider']), async (req, res) => {
    try {
        const { serviceType, experience, hourlyRate, availability, description } = req.body;

        // Using dot notation to update nested objects without overwriting the whole object
        const updateData = {};
        if (serviceType) updateData['providerProfile.serviceType'] = serviceType;
        if (experience) updateData['providerProfile.experience'] = experience;
        if (hourlyRate) updateData['providerProfile.hourlyRate'] = hourlyRate;
        if (availability !== undefined) updateData['providerProfile.availability'] = availability;
        if (description) updateData['providerProfile.description'] = description;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Fetch incoming service requests
router.get('/requests', auth, role(['provider']), async (req, res) => {
    try {
        // Fetch requests that are pending/requested or potentially confirmed
        const requests = await Booking.find({
            provider: req.user.id,
            status: 'requested'
        }).populate('customer', 'name email'); // Include customer contact info
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Update status of a request (Accept, Reject, Reschedule -> Confirmed/Rejected)
router.put('/requests/:id', auth, role(['provider']), async (req, res) => {
    try {
        const { status } = req.body; // 'confirmed', 'rejected'

        if (!['confirmed', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status update' });
        }

        const booking = await Booking.findOne({ _id: req.params.id, provider: req.user.id });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. View confirmed booking history (and completed)
router.get('/history', auth, role(['provider']), async (req, res) => {
    try {
        const history = await Booking.find({
            provider: req.user.id,
            status: { $in: ['confirmed', 'completed', 'cancelled'] }
        }).populate('customer', 'name');
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
