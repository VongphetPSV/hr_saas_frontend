import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: ['subscription', 'current'],
    queryFn: async () => {
      const response = await api.get('/subscription/current');
      return response.data;
    },
    // Refresh subscription status more frequently
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000 // Refetch every 15 minutes
  });
};

export default useCurrentSubscription;
