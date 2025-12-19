import React, { useState, useEffect } from 'react';
import { providerService } from '../../services/api';

const ManageProfile = () => {
    const [formData, setFormData] = useState({
        serviceType: '',
        experience: '',
        hourlyRate: '',
        description: '',
        availability: true
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await providerService.getProfile();
            const p = response.data.providerProfile || {};
            setFormData({
                serviceType: p.serviceType || '',
                experience: p.experience || '',
                hourlyRate: p.hourlyRate || '',
                description: p.description || '',
                availability: p.availability !== undefined ? p.availability : true
            });
        } catch (error) {
            console.error("Could not load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await providerService.updateProfile(formData);
            alert('Profile updated successfully');
        } catch (error) {
            alert('Failed to update profile');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading profile settings...</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <div className="bg-white p-6 rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Service Type</label>
                        <select
                            name="serviceType"
                            className="w-full p-2 border rounded"
                            value={formData.serviceType}
                            onChange={handleChange}
                        >
                            <option value="">Select Service</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Cleaner">Cleaner</option>
                            <option value="Painter">Painter</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Experience (Years)</label>
                            <input
                                type="number"
                                name="experience"
                                className="w-full p-2 border rounded"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
                            <input
                                type="number"
                                name="hourlyRate"
                                className="w-full p-2 border rounded"
                                value={formData.hourlyRate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full p-2 border rounded"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="availability"
                            id="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                        />
                        <label htmlFor="availability">Available for new bookings</label>
                    </div>
                    <button type="submit" className="w-full bg-karigar-800 text-white py-2 rounded font-semibold hover:bg-karigar-900">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default ManageProfile;
