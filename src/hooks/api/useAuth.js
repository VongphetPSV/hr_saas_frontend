import { useState } from 'react';
import axiosInstance from '../../api/axios';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post('/api/auth/login', credentials);
      localStorage.setItem('accessToken', response.data.access_token);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const useGetCurrentUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/api/auth/me');
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch user data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getCurrentUser, user, loading, error };
};

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post('/api/auth/register', userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};



