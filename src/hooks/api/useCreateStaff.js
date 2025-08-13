import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/staff', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate staff list queries
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    }
  });
};

export default useCreateStaff;
