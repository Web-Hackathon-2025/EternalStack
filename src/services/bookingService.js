// Mock data for bookings
const MOCK_BOOKINGS = [
    {
        id: 'BK-1001',
        customerName: 'Aarav Mehta',
        providerName: 'Rajh Sharma',
        service: 'House Wiring',
        date: '2025-05-15',
        time: '10:00 AM',
        amount: 1500,
        status: 'Completed',
        paymentStatus: 'Paid',
        hasIssue: false
    },
    {
        id: 'BK-1002',
        customerName: 'Priya Singh',
        providerName: 'Sneha Patel',
        service: 'Facial',
        date: '2025-05-18',
        time: '2:00 PM',
        amount: 800,
        status: 'Confirmed',
        paymentStatus: 'Pending',
        hasIssue: false
    },
    {
        id: 'BK-1003',
        customerName: 'Rohan Gupta',
        providerName: 'Amit Verma',
        service: 'Leak Repair',
        date: '2025-05-12',
        time: '11:30 AM',
        amount: 500,
        status: 'Completed',
        paymentStatus: 'Paid',
        hasIssue: true
    },
    {
        id: 'BK-1004',
        customerName: 'Kavita Das',
        providerName: 'Vikram Singh',
        service: 'Door Installation',
        date: '2025-05-20',
        time: '4:00 PM',
        amount: 800,
        status: 'Cancelled',
        paymentStatus: 'Refunded',
        hasIssue: false
    },
    {
        id: 'BK-1005',
        customerName: 'Arjun Reddy',
        providerName: 'Rajh Sharma',
        service: 'Switch Repair',
        date: '2025-05-16',
        time: '09:00 AM',
        amount: 150,
        status: 'Completed',
        paymentStatus: 'Paid',
        hasIssue: false
    },
    {
        id: 'BK-1006',
        customerName: 'Meera Iyer',
        providerName: 'Sneha Patel',
        service: 'Manicure',
        date: '2025-05-21',
        time: '11:00 AM',
        amount: 600,
        status: 'Requested',
        paymentStatus: 'Unpaid',
        hasIssue: false
    },
    {
        id: 'BK-1007',
        customerName: 'Suresh Kumar',
        providerName: 'Amit Verma',
        service: 'Pipe Fitting',
        date: '2025-05-22',
        time: '3:00 PM',
        amount: 1200,
        status: 'Requested',
        paymentStatus: 'Unpaid',
        hasIssue: false
    }
];

export const bookingService = {
    getBookings: () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...MOCK_BOOKINGS]), 500);
        });
    },

    getBookingTrends: () => {
        return new Promise((resolve) => {
            // Mock 7-day trend
            const trends = [
                { date: 'May 16', count: 4 },
                { date: 'May 17', count: 6 },
                { date: 'May 18', count: 3 },
                { date: 'May 19', count: 8 },
                { date: 'May 20', count: 5 },
                { date: 'May 21', count: 9 },
                { date: 'May 22', count: 7 },
            ];
            setTimeout(() => resolve(trends), 300);
        });
    }
};
