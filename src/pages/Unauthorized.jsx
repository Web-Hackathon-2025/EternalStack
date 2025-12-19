import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4" style={{ color: 'var(--danger)' }}>403 - Unauthorized</h1>
            <p className="text-lg text-gray-600 mb-6">You do not have permission to access this page.</p>
            <button
                onClick={() => navigate('/login')}
                className="btn btn-primary"
            >
                Go to Login
            </button>
        </div>
    );
};

export default Unauthorized;
