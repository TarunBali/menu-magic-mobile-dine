
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface StaffProtectedRouteProps {
  children: React.ReactNode;
}

const StaffProtectedRoute: React.FC<StaffProtectedRouteProps> = ({ children }) => {
  const { isStaffAuthenticated } = useAuth();

  if (!isStaffAuthenticated) {
    return <Navigate to="/staff" replace />;
  }

  return <>{children}</>;
};

export default StaffProtectedRoute;
