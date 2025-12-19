import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';

const Moderation = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await adminService.getReviews();
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await adminService.deleteReview(id);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            alert('Failed to delete review');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-karigar-900 mb-6">Content Moderation</h1>
            <div className="grid gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white p-4 rounded shadow border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{review.provider?.name} <span className="text-sm font-normal text-gray-500">reviewed by {review.customer?.name}</span></h3>
                                <div className="text-yellow-500 text-sm mb-2">{'★'.repeat(review.rating)}</div>
                                <p className="text-gray-700 italic">"{review.comment}"</p>
                            </div>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="text-red-600 hover:text-red-800 text-sm font-semibold border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                            >
                                Delete Review
                            </button>
                        </div>
                    </div>
                ))}
                {reviews.length === 0 && <p>No reviews to moderate.</p>}
            </div>
        </div>
    );
};

export default Moderation;
