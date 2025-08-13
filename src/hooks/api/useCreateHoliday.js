import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/holidays', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Get the year from the created holiday data
      const year = new Date(variables.date).getFullYear();
      // Invalidate holidays for that year
      queryClient.invalidateQueries({ queryKey: ['holidays', year] });
      // Also invalidate working days as they might be affected
      queryClient.invalidateQueries({ queryKey: ['working-days'] });
    }
  });
};

export default useCreateHoliday;
