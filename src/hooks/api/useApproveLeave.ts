import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useApproveLeave = (leaveId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status) => {
      const response = await api.patch(`/leave/${leaveId}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate leaves queries and specific leave query
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      queryClient.invalidateQueries({ queryKey: ['leaves', leaveId] });
    }
  });
};

export default useApproveLeave;
