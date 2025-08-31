import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useHolidays = (year) => {
  return useQuery({
    queryKey: ['holidays', year],
    queryFn: async () => {
      const response = await api.get('/holidays', {
        params: { year }
      });
      return response.data;
    },
    // Cache holidays for longer as they don't change often
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export default useHolidays;
