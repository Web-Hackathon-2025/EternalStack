// Mock data for reports
const MOCK_REPORTS = [
    {
        id: 'RPT-001',
        targetType: 'Provider',
        targetName: 'Vikram Singh',
        reason: 'Fake Profile',
        description: 'User claims this provider does not exist at the location.',
        reportedBy: 'System',
        date: '2025-05-18',
        status: 'Pending'
    },
    {
        id: 'RPT-002',
        targetType: 'Review',
        targetName: 'Review #455',
        reason: 'Inappropriate Language',
        description: 'Review contains abusive words.',
        reportedBy: 'Kavita Das',
        date: '2025-05-19',
        status: 'Pending'
    },
    {
        id: 'RPT-003',
        targetType: 'Customer',
        targetName: 'Rohan Gupta',
        reason: 'Non-payment',
        description: 'Provider reported customer refused to pay after service.',
        reportedBy: 'Amit Verma',
        date: '2025-05-10',
        status: 'Resolved'
    }
];

let reports = [...MOCK_REPORTS];

export const reportService = {
    getReports: () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...reports]), 500);
        });
    },

    resolveReport: (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                reports = reports.map(r =>
                    r.id === id ? { ...r, status: 'Resolved' } : r
                );
                resolve(reports.find(r => r.id === id));
            }, 500);
        });
    }
};
