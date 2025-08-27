import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - replace with real API call
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const token = 'mock-jwt-token';
        const userData = { ...foundUser };
        delete userData.password;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with real API call
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (existingUsers.find(u => u.email === userData.email)) {
        toast.error('User already exists');
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: 'admin', // Default to admin for demo
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};