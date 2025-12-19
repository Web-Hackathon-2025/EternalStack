import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        navigate('/admin/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ background: 'var(--background)' }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h1 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--primary)' }}>Karigar Admin</h1>
                <p className="text-center mb-6 text-gray-500">Select a role to simulate login:</p>

                <div className="space-y-4 flex flex-col gap-4">
                    <button
                        onClick={() => handleLogin('Admin')}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 btn btn-primary"
                    >
                        Login as Admin
                    </button>

                    <button
                        onClick={() => handleLogin('User')}
                        className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 btn"
                        style={{ background: '#E2E8F0' }}
                    >
                        Login as User (Restricted)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
