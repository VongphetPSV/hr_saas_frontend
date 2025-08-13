import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useEmployers = () => {
  return useQuery({
    queryKey: ['employers'],
    queryFn: async () => {
      try {
        // First try the new endpoint
        try {
          const response = await api.get('/users/me/employers');
          return response.data;
        } catch (firstError) {
          if (firstError.response?.status === 404) {
            // If new endpoint fails, try the legacy endpoint
            const response = await api.get('/me/assignments');
            return response.data;
          }
          throw firstError;
        }
      } catch (error) {
        console.error('Error fetching employers:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};