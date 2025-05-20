import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ role }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  // Asume que el payload del token incluye rol si lo deseas
  return <Outlet />;
}