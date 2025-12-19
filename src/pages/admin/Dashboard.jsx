import { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Clock, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { providerService } from '../../services/providerService';
import { bookingService } from '../../services/bookingService';
import Card from '../../components/common/Card';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        activeKarigars: 0,
        totalBookings: 0,
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
            const activeKarigars = providers.filter(p => p.status === 'Approved').length;
            const totalBookings = bookings.length;
            const pendingRequests = bookings.filter(b => b.status === 'Requested').length;

            setStats({
                totalCustomers,
                activeKarigars,
                totalBookings,
                pendingRequests
            });

            setBookingTrends(trends);
        };
        loadDashboardData();
    }, []);

    return (
        <div className="dashboard-page">
            <h1 className="page-title">Status Overview</h1>

            <div className="card-grid">
                <Card className="stat-card-highlight">
                    <div className="stat-content">
                        <div className="stat-header">
                            <Briefcase size={28} className="text-secondary" />
                            <span className="stat-label">Active Karigars</span>
                        </div>
                        <div className="stat-number">{stats.activeKarigars}</div>
                    </div>
                </Card>

                <Card className="stat-card-highlight">
                    <div className="stat-content">
                        <div className="stat-header">
                            <Calendar size={28} className="text-secondary" />
                            <span className="stat-label">Total Bookings</span>
                        </div>
                        <div className="stat-number">{stats.totalBookings}</div>
                    </div>
                </Card>

                <Card className="stat-card-highlight">
                    <div className="stat-content">
                        <div className="stat-header">
                            <Clock size={28} className="text-primary" />
                            <span className="stat-label text-primary">Pending Requests</span>
                        </div>
                        <div className="stat-number text-primary">{stats.pendingRequests}</div>
                    </div>
                </Card>

                <Card className="stat-card-highlight">
                    <div className="stat-content">
                        <div className="stat-header">
                            <Users size={28} className="text-secondary" />
                            <span className="stat-label">Total Customers</span>
                        </div>
                        <div className="stat-number">{stats.totalCustomers}</div>
                    </div>
                </Card>
            </div>

            <Card title="Booking Trends" className="chart-card">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookingTrends}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#1A365D', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid #E2E8F0',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#F56523"
                                strokeWidth={4}
                                dot={{ r: 5, fill: '#F56523', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};
export default Dashboard;
