import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => {
      const response = await api.get('/dashboard/overview');
      return response.data;
    },
    // Refresh dashboard data frequently
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });
};

export default useDashboardOverview;
