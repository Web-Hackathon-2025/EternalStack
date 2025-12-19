import { useState, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, DollarSign, Flag } from 'lucide-react';
import { bookingService } from '../../services/bookingService';
import StatusBadge from '../../components/common/StatusBadge';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                const data = await bookingService.getBookings();
                setBookings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadBookings();
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === 'All' || booking.status === filter;
        const matchesSearch =
            booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalRevenue = bookings
        .filter(b => b.status === 'Completed')
        .reduce((sum, b) => sum + b.amount, 0);

    return (
        <div className="booking-page">
            <div className="page-header">
                <h1 className="page-title">Booking History</h1>
                <div className="revenue-card">
                    <DollarSign size={18} />
                    <span>Total Revenue: ₹{totalRevenue.toLocaleString()}</span>
                </div>
            </div>

            <div className="controls-bar">
                <div className="filter-tabs">
                    {['All', 'Requested', 'Confirmed', 'Completed', 'Cancelled'].map(tab => (
                        <button
                            key={tab}
                            className={`filter-tab ${filter === tab ? 'active' : ''}`}
                            onClick={() => setFilter(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="table-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search Booking ID, Customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Service Details</th>
                            <th>Provider</th>
                            <th>Date & Time</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center">Loading bookings...</td></tr>
                        ) : filteredBookings.length === 0 ? (
                            <tr><td colSpan="7" className="text-center">No bookings found.</td></tr>
                        ) : (
                            filteredBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className="font-medium text-primary">{booking.id}</td>
                                    <td>
                                        <div className="service-info">
                                            <span className="font-medium">{booking.service}</span>
                                            <span className="text-xs text-muted">Customer: {booking.customerName}</span>
                                        </div>
                                    </td>
                                    <td>{booking.providerName}</td>
                                    <td>
                                        <div className="date-time">
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon size={12} className="text-muted" />
                                                <span>{booking.date}</span>
                                            </div>
                                            <span className="text-xs text-muted">{booking.time}</span>
                                        </div>
                                    </td>
                                    <td className="font-medium">₹{booking.amount}</td>
                                    <td>
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td>
                                        {booking.hasIssue && (
                                            <div title="Reported Issue" style={{ color: 'var(--danger)', cursor: 'help' }}>
                                                <Flag size={18} fill="currentColor" />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingHistory;
