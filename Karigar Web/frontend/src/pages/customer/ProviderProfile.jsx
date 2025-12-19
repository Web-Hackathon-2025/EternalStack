import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerService } from '../../services/api';

const ProviderProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Booking Form State
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await customerService.getProviderById(id);
                setProvider(response.data.provider);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Error fetching provider:', error);
            }
        };
        fetchDetails();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await customerService.createBooking({
                providerId: id,
                date,
                description,
                location
            });
            alert('Booking requested successfully!');
            navigate('/customer/dashboard');
        } catch (error) {
            alert('Booking failed: ' + error.response?.data?.message);
        }
    };

    if (!provider) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded shadow mb-6">
                <h1 className="text-3xl font-bold text-karigar-900">{provider.name}</h1>
                <p className="text-xl text-karigar-700">{provider.providerProfile.serviceType}</p>
                <p className="mt-4">{provider.providerProfile.description}</p>
                <div className="mt-4 flex gap-4 text-sm text-gray-600">
                    <span>Experience: {provider.providerProfile.experience} years</span>
                    <span>Rate: ${provider.providerProfile.hourlyRate}/hr</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Booking Form */}
                <div className="bg-karigar-25 p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Book Service</h2>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 border rounded input-primary"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded input-primary"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                required
                                className="w-full p-2 border rounded input-primary"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-karigar-800 text-white py-2 rounded hover:bg-karigar-900 transition">
                            Request Booking
                        </button>
                    </form>
                </div>

                {/* Reviews */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white p-4 rounded shadow-sm border">
                                <div className="flex justify-between">
                                    <span className="font-semibold">{review.customer.name}</span>
                                    <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
