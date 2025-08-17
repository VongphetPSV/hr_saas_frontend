import { useState } from 'react';
import api from '@/api/axios';
import type { ApiResponse } from '@/types/core';

interface LeaveData {
  start_date: string;
  end_date: string;
  reason: string;
  type: string;
}

interface LeaveResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  reason: string;
  type: string;
}

export const useSubmitLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLeave = async (leaveData: LeaveData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ApiResponse<LeaveResponse>>('/leave/', leaveData);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit leave request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitLeave, loading, error };
};