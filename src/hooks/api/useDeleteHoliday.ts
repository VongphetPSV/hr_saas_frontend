import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useDeleteHoliday = (holidayId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/holidays/${holidayId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all holiday queries as we don't know the year
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      // Also invalidate working days as they might be affected
      queryClient.invalidateQueries({ queryKey: ['working-days'] });
    }
  });
};

export default useDeleteHoliday;
