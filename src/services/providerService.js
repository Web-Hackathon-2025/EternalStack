// Mock data for providers
const MOCK_PROVIDERS = [
    {
        id: 1,
        name: 'Rajh Sharma',
        category: 'Electrician',
        status: 'Approved',
        rating: 4.8,
        joinedDate: '2025-01-10',
        contact: {
            email: 'rajh.sharma@example.com',
            phone: '+91 98765 43210',
            location: 'Mumbai, MH'
        },
        services: [
            { name: 'House Wiring', price: 1500 },
            { name: 'Fan Installation', price: 300 },
            { name: 'Switch Repair', price: 150 }
        ]
    },
    {
        id: 2,
        name: 'Amit Verma',
        category: 'Plumber',
        status: 'Pending',
        rating: 0,
        joinedDate: '2025-02-15',
        contact: {
            email: 'amit.verma@example.com',
            phone: '+91 98765 12345',
            location: 'Delhi, DL'
        },
        services: [
            { name: 'Leak Repair', price: 500 },
            { name: 'Pipe Installation', price: 1200 }
        ]
    },
    {
        id: 3,
        name: 'Sneha Patel',
        category: 'Beautician',
        status: 'Approved',
        rating: 4.9,
        joinedDate: '2024-12-05',
        contact: {
            email: 'sneha.patel@example.com',
            phone: '+91 98765 67890',
            location: 'Bangalore, KA'
        },
        services: [
            { name: 'Facial', price: 800 },
            { name: 'Haircut', price: 400 },
            { name: 'Manicure', price: 600 }
        ]
    },
    {
        id: 4,
        name: 'Vikram Singh',
        category: 'Carpenter',
        status: 'Suspended',
        rating: 2.5,
        joinedDate: '2024-11-20',
        contact: {
            email: 'vikram.singh@example.com',
            phone: '+91 98765 11223',
            location: 'Pune, MH'
        },
        services: [
            { name: 'Furniture Repair', price: 1000 },
            { name: 'Door Installation', price: 800 }
        ]
    }
];

let providers = [...MOCK_PROVIDERS];

export const providerService = {
    getProviders: () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...providers]), 500); // Simulate network delay
        });
    },

    updateProviderStatus: (id, newStatus) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                providers = providers.map(p =>
                    p.id === id ? { ...p, status: newStatus } : p
                );
                resolve(providers.find(p => p.id === id));
            }, 500);
        });
    },

    getProviderDetails: (id) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(providers.find(p => p.id === id)), 300);
        });
    }
};
