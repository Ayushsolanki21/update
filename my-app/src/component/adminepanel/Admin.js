import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const admin = localStorage.getItem('admin');
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
