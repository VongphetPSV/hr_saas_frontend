import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const response = await api.get('/announcements');
      return response.data;
    },
    // Refresh announcements more frequently as they're important
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });
};

export default useAnnouncements;
