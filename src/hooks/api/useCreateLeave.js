import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/leave', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate leaves queries
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    }
  });
};

export default useCreateLeave;
