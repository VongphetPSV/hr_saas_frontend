import { useState } from 'react';
import axiosInstance from '../../api/axios';

export const useCreateTenant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTenant = async (tenantData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post('/tenants/', tenantData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTenant, loading, error };
};

export const useGetTenants = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tenants, setTenants] = useState([]);

  const getTenants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/tenants/');
      setTenants(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch tenants');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getTenants, tenants, loading, error };
};



