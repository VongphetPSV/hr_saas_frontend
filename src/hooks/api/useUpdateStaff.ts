import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useUpdateStaff = (staffId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/staff/${staffId}`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate staff list and specific staff queries
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    }
  });
};

export default useUpdateStaff;
