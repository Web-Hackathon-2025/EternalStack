const StatusBadge = ({ status }) => {
    const styles = {
        // Green
        Approved: { backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' },
        Completed: { backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' },

        // Blue
        Upcoming: { backgroundColor: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' },
        Confirmed: { backgroundColor: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' },

        // Yellow/Orange
        Pending: { backgroundColor: '#FEF9C3', color: '#854D0E', border: '1px solid #FEF08A' },
        Requested: { backgroundColor: '#FEF9C3', color: '#854D0E', border: '1px solid #FEF08A' },

        // Red
        Suspended: { backgroundColor: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA' },
        Cancelled: { backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' },

        // Gray
        Default: { backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }
    };

    const style = styles[status] || styles.Default;

    return (
        <span
            style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                ...style
            }}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
