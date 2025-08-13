import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const response = await api.get('/departments');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000 // Keep in cache for 30 minutes
  });
};

export default useDepartments;
