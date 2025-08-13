import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useApproveOT = (overtimeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status) => {
      const response = await api.patch(`/overtime/${overtimeId}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate overtime queries and specific overtime query
      queryClient.invalidateQueries({ queryKey: ['overtime'] });
      queryClient.invalidateQueries({ queryKey: ['overtime', overtimeId] });
    }
  });
};

export default useApproveOT;
