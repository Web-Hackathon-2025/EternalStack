import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import SearchProviders from './pages/customer/SearchProviders';
import ProviderProfile from './pages/customer/ProviderProfile';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ManageProfile from './pages/provider/ManageProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Moderation from './pages/admin/Moderation';

// Route Wrappers
import CustomerRoutes from './routes/CustomerRoutes';
import ProviderRoutes from './routes/ProviderRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
    return (
        <div className="min-h-screen bg-karigar-50">
            <nav className="p-4 bg-white shadow flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-karigar-900">Karigar</Link>
                <div className="space-x-4">
                    <Link to="/login" className="text-karigar-800 hover:underline">Login</Link>
                </div>
            </nav>

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<div className="p-12 text-center"><h1 className="text-4xl text-karigar-900 font-bold">Welcome to Karigar</h1><p>Find local experts for your needs.</p></div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer Routes */}
                <Route element={<CustomerRoutes />}>
                    <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/search" element={<SearchProviders />} />
                    <Route path="/customer/provider/:id" element={<ProviderProfile />} />
                </Route>

                {/* Provider Routes */}
                <Route element={<ProviderRoutes />}>
                    <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                    <Route path="/provider/profile" element={<ManageProfile />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoutes />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/moderation" element={<Moderation />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
