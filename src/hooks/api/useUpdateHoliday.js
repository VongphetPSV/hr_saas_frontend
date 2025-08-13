import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useUpdateHoliday = (holidayId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/holidays/${holidayId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Get the year from the updated holiday data
      const year = new Date(variables.date).getFullYear();
      // Invalidate holidays for that year
      queryClient.invalidateQueries({ queryKey: ['holidays', year] });
      // Also invalidate working days as they might be affected
      queryClient.invalidateQueries({ queryKey: ['working-days'] });
    }
  });
};

export default useUpdateHoliday;
