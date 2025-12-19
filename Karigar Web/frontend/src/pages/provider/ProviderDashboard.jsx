import React, { useEffect, useState } from 'react';
import { providerService } from '../../services/api';

const ProviderDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const reqResponse = await providerService.getRequests();
            const histResponse = await providerService.getHistory();
            setRequests(reqResponse.data);
            setHistory(histResponse.data);
        } catch (error) {
            console.error('Error loading provider dashboard:', error);
        }
    };

    const handleAction = async (id, status) => {
        try {
            await providerService.updateRequestStatus(id, status);
            loadData(); // Refresh list
        } catch (error) {
            alert('Action failed');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>

            {/* Incoming Requests */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-karigar-800">New Service Requests</h2>
                <div className="grid gap-4">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white p-4 rounded shadow border-l-4 border-karigar-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">{req.serviceDetails.description}</h3>
                                    <p className="text-sm">Customer: {req.customer.name}</p>
                                    <p className="text-sm">Location: {req.serviceDetails.location}</p>
                                    <p className="text-sm">Date: {new Date(req.serviceDetails.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(req._id, 'confirmed')}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleAction(req._id, 'rejected')}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {requests.length === 0 && <p className="text-gray-500">No new requests.</p>}
                </div>
            </section>

            {/* History */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-karigar-800">Booking History</h2>
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-left">
                        <thead className="bg-karigar-100 border-b">
                            <tr>
                                <th className="p-3">Service</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item._id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3">{item.serviceDetails.description}</td>
                                    <td className="p-3">{item.customer?.name}</td>
                                    <td className="p-3">{new Date(item.serviceDetails.date).toLocaleDateString()}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ProviderDashboard;
