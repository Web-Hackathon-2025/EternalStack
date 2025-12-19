import { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import StatusBadge from '../../components/common/StatusBadge';
import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import './Moderation.css';

const Moderation = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        setLoading(true);
        const data = await reportService.getReports();
        setReports(data);
        setLoading(false);
    };

    const handleResolve = async (id) => {
        // Optimistic update
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
        await reportService.resolveReport(id);
    };

    return (
        <div className="moderation-page">
            <h1 className="page-title">Moderation Queue</h1>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Target</th>
                            <th>Reason</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center">Loading reports...</td></tr>
                        ) : reports.length === 0 ? (
                            <tr><td colSpan="6" className="text-center">No reports found.</td></tr>
                        ) : (
                            reports.map(report => (
                                <tr key={report.id}>
                                    <td className="text-muted">{report.id}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{report.targetName}</span>
                                            <span className="text-xs text-muted">{report.targetType}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-medium text-danger">{report.reason}</span>
                                    </td>
                                    <td style={{ maxWidth: '300px' }} className="text-sm text-muted">
                                        {report.description}
                                    </td>
                                    <td><StatusBadge status={report.status} /></td>
                                    <td className="actions-cell">
                                        {report.status !== 'Resolved' && (
                                            <button
                                                className="action-btn success"
                                                title="Mark Resolved"
                                                onClick={() => handleResolve(report.id)}
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}
                                        <button className="action-btn danger" title="Delete Content">
                                            <Trash2 size={18} />
                                        </button>
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

export default Moderation;
