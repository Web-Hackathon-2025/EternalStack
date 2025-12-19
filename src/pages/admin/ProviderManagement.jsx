import { useState, useEffect } from 'react';
import { Eye, Check, CircleOff, Search, Filter } from 'lucide-react';
import { providerService } from '../../services/providerService';
import StatusBadge from '../../components/common/StatusBadge';
import ProviderDetailModal from '../../components/admin/ProviderDetailModal';
import './ProviderManagement.css';

const ProviderManagement = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(null);

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
        try {
            setLoading(true);
            const data = await providerService.getProviders();
            setProviders(data);
        } catch (error) {
            console.error("Failed to fetch providers", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // Optimistic update
            setProviders(prev => prev.map(p =>
                p.id === id ? { ...p, status: newStatus } : p
            ));

            await providerService.updateProviderStatus(id, newStatus);
        } catch (error) {
            console.error("Failed to update status", error);
            fetchProviders(); // Revert on error
        }
    };

    const filteredProviders = providers.filter(provider => {
        const matchesFilter = filter === 'All' || provider.status === filter;
        const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: providers.length,
        pending: providers.filter(p => p.status === 'Pending').length,
        approved: providers.filter(p => p.status === 'Approved').length,
        suspended: providers.filter(p => p.status === 'Suspended').length
    };

    return (
        <div className="provider-page">
            <div className="page-header">
                <h1 className="page-title">Provider Management</h1>
                <div className="page-actions">
                    {/* Summary Stats small view */}
                    <div className="stat-pill">Total: {stats.total}</div>
                    <div className="stat-pill warning">Pending: {stats.pending}</div>
                </div>
            </div>

            <div className="controls-bar">
                <div className="filter-tabs">
                    {['All', 'Approved', 'Pending', 'Suspended'].map(tab => (
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
                        placeholder="Search providers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Provider Info</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center">Loading providers...</td></tr>
                        ) : filteredProviders.length === 0 ? (
                            <tr><td colSpan="5" className="text-center">No providers found.</td></tr>
                        ) : (
                            filteredProviders.map(provider => (
                                <tr key={provider.id}>
                                    <td>
                                        <div className="provider-cell">
                                            <div className="avatar-sm">{provider.name.charAt(0)}</div>
                                            <div className="provider-info-text">
                                                <span className="font-medium">{provider.name}</span>
                                                <span className="text-xs text-muted">{provider.contact.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{provider.category}</td>
                                    <td><StatusBadge status={provider.status} /></td>
                                    <td>
                                        <span className="rating-badge">
                                            ★ {provider.rating > 0 ? provider.rating : 'New'}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            className="action-btn"
                                            title="View Details"
                                            onClick={() => setSelectedProvider(provider)}
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {provider.status !== 'Approved' && (
                                            <button
                                                className="action-btn success"
                                                title="Approve"
                                                onClick={() => handleStatusUpdate(provider.id, 'Approved')}
                                            >
                                                <Check size={18} />
                                            </button>
                                        )}
                                        {provider.status !== 'Suspended' && (
                                            <button
                                                className="action-btn danger"
                                                title="Suspend"
                                                onClick={() => handleStatusUpdate(provider.id, 'Suspended')}
                                            >
                                                <CircleOff size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ProviderDetailModal
                provider={selectedProvider}
                onClose={() => setSelectedProvider(null)}
            />
        </div>
    );
};

export default ProviderManagement;
