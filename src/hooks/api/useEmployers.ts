// src/hooks/useEmployers.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

function getToken(): string | null {
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

async function fetchEmployers() {
  const { data } = await api.get('auth/me');
  const userId = data?.id;
  if (!userId) throw new Error('Missing user id');
  const response = await api.get(`job-assignments/users/${userId}/job-assignments`);
  return response.data;
}

export function useEmployers() {
  const token = getToken();
  return useQuery({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
    enabled: !!token, // do not call until token exists
    staleTime: 60_000,
    retry: (count, err: any) => {
      const s = err?.response?.status;
      if (s === 401 || s === 403) return false;
      return count < 2;
    },
  });
}