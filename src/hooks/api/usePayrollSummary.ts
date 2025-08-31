import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const usePayrollSummary = (month) => {
  return useQuery({
    queryKey: ['payrolls', 'summary', month],
    queryFn: async () => {
      const response = await api.get('/payrolls/summary', {
        params: { month }
      });
      return response.data;
    },
    // Keep summary fresh for shorter time as it's important data
    staleTime: 2 * 60 * 1000 // 2 minutes
  });
};

export default usePayrollSummary;
