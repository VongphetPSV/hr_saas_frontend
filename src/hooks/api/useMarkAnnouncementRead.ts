import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useMarkAnnouncementRead = (announcementId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`/announcements/${announcementId}/read`);
      return response.data;
    },
    onSuccess: () => {
      // Update the announcements list to reflect read status
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });
};

export default useMarkAnnouncementRead;
