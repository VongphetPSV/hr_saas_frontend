import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnnouncement } from '../../api/announcementsClient';

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      // Invalidate announcements queries
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });
};

export default useCreateAnnouncement;
