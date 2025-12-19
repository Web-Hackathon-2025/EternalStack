import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CustomerRoutes = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'customer') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default CustomerRoutes;
