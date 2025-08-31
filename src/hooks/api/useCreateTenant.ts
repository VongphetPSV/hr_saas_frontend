import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/tenants', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate tenants list query
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    }
  });
};

export default useCreateTenant;
