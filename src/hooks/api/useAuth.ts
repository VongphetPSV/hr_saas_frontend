import { useState } from 'react';
import api from '@/api/axios';
import type { User, ApiResponse } from '@/types/core';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
      const { access_token } = response.data.data;
      localStorage.setItem('accessToken', access_token);
      return response.data.data;
    } catch (err: any) {
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
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse<User>>('/auth/me');
      const userData = response.data.data;
      setUser(userData);
      return userData;
    } catch (err: any) {
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
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ApiResponse<User>>('/auth/register', userData);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};