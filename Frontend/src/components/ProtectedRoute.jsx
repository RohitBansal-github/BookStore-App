import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

function ProtectedRoute({ children }) {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Navigate to="/login-required" replace />;
  }

  return children;
}

export default ProtectedRoute;