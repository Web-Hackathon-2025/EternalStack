import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProviderRoutes = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'provider') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProviderRoutes;
