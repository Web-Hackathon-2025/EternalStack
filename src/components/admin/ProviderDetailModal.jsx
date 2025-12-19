import { X, Mail, Phone, MapPin } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import './ProviderDetailModal.css';

const ProviderDetailModal = ({ provider, onClose }) => {
    if (!provider) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2 className="text-xl font-bold">{provider.name}</h2>
                        <p className="text-sm text-gray-500">{provider.category}</p>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="info-section">
                        <div className="info-badge">
                            <StatusBadge status={provider.status} />
                        </div>
                        <div className="contact-details">
                            <div className="contact-item">
                                <Mail size={16} /> <span>{provider.contact.email}</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={16} /> <span>{provider.contact.phone}</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={16} /> <span>{provider.contact.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="services-section">
                        <h3 className="section-title">Services & Pricing</h3>
                        <div className="table-container">
                            <table className="services-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th style={{ textAlign: 'right' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {provider.services.map((service, index) => (
                                        <tr key={index}>
                                            <td>{service.name}</td>
                                            <td style={{ textAlign: 'right' }}>₹{service.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="stats-section">
                        <h3 className="section-title">Performance</h3>
                        <div className="stat-card">
                            <span className="stat-label">Rating</span>
                            <span className="stat-value">{provider.rating} / 5.0</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Joined</span>
                            <span className="stat-value">{provider.joinedDate}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetailModal;
