import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useUpdateLeave = (leaveId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/leave/${leaveId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate leaves queries and specific leave query
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      queryClient.invalidateQueries({ queryKey: ['leaves', leaveId] });
    }
  });
};

export default useUpdateLeave;
