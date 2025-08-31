import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useAssignPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/subscription/assign', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate current subscription and invoice history
      queryClient.invalidateQueries({ queryKey: ['subscription', 'current'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'invoice-history'] });
    }
  });
};

export default useAssignPlan;
