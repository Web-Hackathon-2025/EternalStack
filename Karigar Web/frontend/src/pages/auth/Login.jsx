import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await authService.login({ email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Redirect based on role
            if (data.role === 'customer') navigate('/customer/dashboard');
            else if (data.role === 'provider') navigate('/provider/dashboard');
            else if (data.role === 'admin') navigate('/admin/dashboard');
        } catch (error) {
            alert('Login Failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-karigar-25">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-karigar-900 mb-6">Login to Karigar</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-karigar-900 text-white py-2 rounded font-semibold hover:bg-karigar-800">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/register" className="text-karigar-800 font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
