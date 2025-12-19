import { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { providerService } from '../../services/providerService';
import { bookingService } from '../../services/bookingService';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        activeProviders: 0,
        successfulBookings: 0,
        pendingRequests: 0,
    });

    const [bookingTrends, setBookingTrends] = useState([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            const [providers, bookings, trends] = await Promise.all([
                providerService.getProviders(),
                bookingService.getBookings(),
                bookingService.getBookingTrends()
            ]);

            const totalCustomers = new Set(bookings.map(b => b.customerName)).size;
            const activeProviders = providers.filter(p => p.status === 'Approved').length;
            const successfulBookings = bookings.filter(b => b.status === 'Completed').length;
            const pendingRequests = bookings.filter(b => b.status === 'Requested').length;

            setStats({
                totalCustomers,
                activeProviders,
                successfulBookings,
                pendingRequests
            });

            setBookingTrends(trends);
        };
        loadDashboardData();
    }, []);

    return (
        <div className="dashboard-page">
            <h1 className="page-title">Dashboard Overview</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-indigo-100 text-indigo-600">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Customers</span>
                        <span className="stat-value">{stats.totalCustomers}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-blue-100 text-blue-600">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Active Providers</span>
                        <span className="stat-value">{stats.activeProviders}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Successful Bookings</span>
                        <span className="stat-value">{stats.successfulBookings}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-yellow-100 text-yellow-600">
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Pending Requests</span>
                        <span className="stat-value">{stats.pendingRequests}</span>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                <h2 className="section-title">Booking Trends</h2>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookingTrends}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#4F46E5"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
