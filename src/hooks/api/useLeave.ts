import { useState } from 'react';
import api from '@/api/axios';
import type { ApiResponse } from '@/types/core';

import { Leave, CreateLeaveRequest } from '@/types/api';
import { UseLeaveReturn } from '@/types/hooks';

interface UseSubmitLeaveReturn {
  submitLeave: (leaveData: CreateLeaveRequest) => Promise<Leave>;
  loading: boolean;
  error: string | null;
}

export const useSubmitLeave = (): UseSubmitLeaveReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLeave = async (leaveData: CreateLeaveRequest): Promise<Leave> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ApiResponse<Leave>>('/leave/', leaveData);
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