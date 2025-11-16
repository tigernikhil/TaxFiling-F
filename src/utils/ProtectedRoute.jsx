import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
}
