import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/payrolls', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate payrolls queries
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      // Also invalidate summary as it might be affected
      queryClient.invalidateQueries({ queryKey: ['payrolls', 'summary'] });
    }
  });
};

export default useCreatePayroll;
