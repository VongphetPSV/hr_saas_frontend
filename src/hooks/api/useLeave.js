import { useState } from 'react';
import axiosInstance from '../../api/axios';

export const useSubmitLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitLeave = async (leaveData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post('/leave/', leaveData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit leave request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitLeave, loading, error };
};



