import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useEmployers = () => {
  return useQuery({
    queryKey: ['employers'],
    queryFn: async () => {
      const response = await api.get('/users/employers');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
    retry: 1,
  });
};

export default useEmployers;