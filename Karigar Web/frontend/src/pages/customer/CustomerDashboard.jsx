import React, { useEffect, useState } from 'react';
import { customerService } from '../../services/api';

const CustomerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await customerService.getBookings();
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-karigar-900 mb-6">My Bookings</h1>
            <div className="grid gap-4">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white p-4 rounded shadow border border-karigar-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">{booking.serviceDetails.description}</h3>
                                <p className="text-gray-600">Provider: {booking.provider?.name}</p>
                                <p className="text-sm text-gray-500">Date: {new Date(booking.serviceDetails.date).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                }`}>
                                {booking.status}
                            </span>
                        </div>
                        {/* Add Review Button logic here later */}
                    </div>
                ))}
                {bookings.length === 0 && <p>No bookings found.</p>}
            </div>
        </div>
    );
};

export default CustomerDashboard;
