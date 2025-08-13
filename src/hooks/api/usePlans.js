import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const usePlans = () => {
  return useQuery({
    queryKey: ['subscription', 'plans'],
    queryFn: async () => {
      const response = await api.get('/subscription/plans');
      return response.data;
    },
    // Cache plans for longer as they don't change often
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export default usePlans;
