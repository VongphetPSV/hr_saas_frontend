import { useState } from 'react';
import api from '@/api/axios';
import type { ApiResponse, User } from '@/types/core';

interface StaffMember extends User {
  department?: string;
  position?: string;
  hire_date?: string;
  salary?: number;
}

export const useGetStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [staff, setStaff] = useState<StaffMember[]>([]);

  const getStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse<StaffMember[]>>('/staff/');
      const staffData = response.data.data;
      setStaff(staffData);
      return staffData;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch staff');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getStaff, staff, loading, error };
};