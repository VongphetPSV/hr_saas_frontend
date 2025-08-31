import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useSetWorkingDays = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/working-days', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate working days queries for the specific year/month
      queryClient.invalidateQueries({
        queryKey: ['working-days', {
          year: variables.year,
          month: variables.month
        }]
      });
      // Also invalidate any payroll queries as they might depend on working days
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
    }
  });
};

export default useSetWorkingDays;
