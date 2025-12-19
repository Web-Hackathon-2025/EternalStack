import { useState, useEffect } from 'react';
import { Search, MapPin, Star, Phone, Check, X, Ban, Eye } from 'lucide-react';
import { providerService } from '../../services/providerService';
import StatusBadge from '../../components/common/StatusBadge';
import ProviderDetailModal from '../../components/admin/ProviderDetailModal';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './ProviderManagement.css';

const ProviderManagement = () => {
    const [providers, setProviders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState(null);

    useEffect(() => {
        loadProviders();
    }, []);

    const loadProviders = async () => {
        setLoading(true);
        const data = await providerService.getProviders();
        setProviders(data);
        setLoading(false);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        const updated = await providerService.updateProviderStatus(id, newStatus);
        setProviders(prev => prev.map(p => p.id === id ? updated : p));
    };

    const filteredProviders = providers.filter(provider => {
        const matchesFilter = filter === 'All' || provider.status === filter;
        const matchesSearch = provider.name.toLowerCase().includes(search.toLowerCase()) ||
            provider.category.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="provider-page">
            <div className="page-header">
                <h1 className="page-title">Provider Management</h1>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search Providers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
            </div>

            <div className="card-grid">
                {loading ? (
                    <p>Loading providers...</p>
                ) : filteredProviders.length === 0 ? (
                    <p>No providers found.</p>
                ) : (
                    filteredProviders.map(provider => (
                        <Card key={provider.id} className="provider-card">
                            <div className="provider-header">
                                <div className="provider-avatar">
                                    {provider.name.charAt(0)}
                                </div>
                                <div className="provider-info">
                                    <h3 className="provider-name">{provider.name}</h3>
                                    <span className="provider-category">{provider.category}</span>
                                </div>
                                <div className="status-badge-wrapper">
                                    <StatusBadge status={provider.status} />
                                </div>
                            </div>

                            <div className="provider-details-compact">
                                <div className="detail-row">
                                    <MapPin size={16} className="text-muted" />
                                    <span>{provider.location || 'Mumbai, MH'}</span>
                                </div>
                                <div className="detail-row">
                                    <Star size={16} className="text-warning" fill="currentColor" />
                                    <span>{provider.rating} Rating</span>
                                </div>
                                <div className="detail-row">
                                    <Phone size={16} className="text-muted" />
                                    <span>{provider.contact}</span>
                                </div>
                            </div>

                            <div className="provider-actions">
                                {provider.status === 'Pending' && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="action-btn-full"
                                        onClick={() => handleStatusUpdate(provider.id, 'Approved')}
                                    >
                                        <Check size={16} /> Approve
                                    </Button>
                                )}
                                {provider.status === 'Approved' && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleStatusUpdate(provider.id, 'Suspended')}
                                    >
                                        <Ban size={16} /> Suspend
                                    </Button>
                                )}
                                {provider.status === 'Suspended' && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleStatusUpdate(provider.id, 'Approved')}
                                    >
                                        <Check size={16} /> Re-Approve
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedProvider(provider)}
                                >
                                    <Eye size={16} /> View
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {selectedProvider && (
                <ProviderDetailModal
                    provider={selectedProvider}
                    onClose={() => setSelectedProvider(null)}
                />
            )}
        </div>
    );
};

export default ProviderManagement;
