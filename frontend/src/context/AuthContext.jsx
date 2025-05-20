import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ token });
  }, []);

  const login = async (data) => {
    const res = await api.post('/auth/login', data);
    localStorage.setItem('token', res.data.token);
    setUser({ token: res.data.token });
    navigate('/');
  };

  const register = async (data) => {
    const res = await api.post('/auth/register', data);
    localStorage.setItem('token', res.data.token);
    setUser({ token: res.data.token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}