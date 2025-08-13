import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useOTReport = () => {
  return useQuery({
    queryKey: ['reports', 'overtime-summary'],
    queryFn: async () => {
      const response = await api.get('/reports/overtime-summary');
      return response.data;
    },
    // Cache report data for a moderate duration
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000 // 30 minutes
  });
};

export default useOTReport;
