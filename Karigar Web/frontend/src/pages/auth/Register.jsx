import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer'
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await authService.register(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            if (data.role === 'customer') navigate('/customer/dashboard');
            else if (data.role === 'provider') navigate('/provider/dashboard');
        } catch (error) {
            alert('Registration Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-karigar-25">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-karigar-900 mb-6">Create Account</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-2 border rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <select
                        className="w-full p-2 border rounded"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="customer">I want to hire</option>
                        <option value="provider">I want to work</option>
                    </select>
                    <button type="submit" className="w-full bg-karigar-900 text-white py-2 rounded font-semibold hover:bg-karigar-800">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-karigar-800 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
