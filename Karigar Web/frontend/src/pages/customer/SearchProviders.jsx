import React, { useState } from 'react';
import { customerService } from '../../services/api';
import { Link } from 'react-router-dom';

const SearchProviders = () => {
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [providers, setProviders] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await customerService.getProviders({ category, location });
            setProviders(response.data);
            setSearched(true);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-karigar-900 mb-6">Find a Service Provider</h1>

            <form onSubmit={handleSearch} className="mb-8 p-4 bg-karigar-50 rounded shadow flex gap-4">
                <input
                    type="text"
                    placeholder="Service (e.g., Plumber)"
                    className="flex-1 p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="flex-1 p-2 border rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit" className="bg-karigar-800 text-white px-6 py-2 rounded hover:bg-karigar-900">
                    Search
                </button>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                    <div key={provider._id} className="bg-white p-5 rounded shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold">{provider.name}</h2>
                        <p className="text-karigar-800 font-medium">{provider.providerProfile.serviceType}</p>
                        <p className="text-gray-600 mt-2 line-clamp-2">{provider.providerProfile.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="font-bold">${provider.providerProfile.hourlyRate}/hr</span>
                            <Link
                                to={`/customer/provider/${provider._id}`}
                                className="text-karigar-900 border border-karigar-900 px-3 py-1 rounded hover:bg-karigar-900 hover:text-white"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
                {searched && providers.length === 0 && <p className="text-center text-gray-500 w-full">No providers found matching your criteria.</p>}
            </div>
        </div>
    );
};

export default SearchProviders;
