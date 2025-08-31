import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useUpdatePayroll = (payrollId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/payrolls/${payrollId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate payrolls queries and specific payroll query
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['payrolls', payrollId] });
      // Also invalidate summary as it might be affected
      queryClient.invalidateQueries({ queryKey: ['payrolls', 'summary'] });
    }
  });
};

export default useUpdatePayroll;
