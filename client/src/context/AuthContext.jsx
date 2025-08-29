import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await axios.get('/api/auth/verify', {
        headers: { 'auth-token': token }
      });

      setUser(response.data);
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (name, email, password, role = 'user') => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        confirmPassword: password,
        role
      });
      toast.success('Registration successful!');
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed';
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};