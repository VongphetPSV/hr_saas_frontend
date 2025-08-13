import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/announcements', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate announcements queries
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });
};

export default useCreateAnnouncement;
