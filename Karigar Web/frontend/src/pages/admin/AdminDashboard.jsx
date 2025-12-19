import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalBookings: 0, activeProviders: 0 });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await adminService.getStats();
                const usersRes = await adminService.getUsers();
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await adminService.deleteUser(id);
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-karigar-900 mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded shadow border-t-4 border-blue-500">
                    <h3 className="text-gray-500 font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded shadow border-t-4 border-green-500">
                    <h3 className="text-gray-500 font-semibold">Total Bookings</h3>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                </div>
                <div className="bg-white p-6 rounded shadow border-t-4 border-purple-500">
                    <h3 className="text-gray-500 font-semibold">Active Providers</h3>
                    <p className="text-3xl font-bold">{stats.activeProviders}</p>
                </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-b">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 capitalize">{user.role}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
