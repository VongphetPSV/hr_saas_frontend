import { useState } from 'react';
import axiosInstance from '../../api/axios';

export const useGetStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staff, setStaff] = useState([]);

  const getStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/staff/');
      setStaff(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch staff');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getStaff, staff, loading, error };
};



