import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useUpdateOT = (overtimeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/overtime/${overtimeId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate overtime queries and specific overtime query
      queryClient.invalidateQueries({ queryKey: ['overtime'] });
      queryClient.invalidateQueries({ queryKey: ['overtime', overtimeId] });
    }
  });
};

export default useUpdateOT;
