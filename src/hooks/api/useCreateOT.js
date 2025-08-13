import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateOT = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/overtime', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate overtime queries
      queryClient.invalidateQueries({ queryKey: ['overtime'] });
    }
  });
};

export default useCreateOT;
