import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useLeaves = (params = {}) => {
  const { status, month, staff_id } = params;

  return useQuery({
    queryKey: ['leaves', { status, month, staff_id }],
    queryFn: async () => {
      const response = await api.get('/leave', {
        params: {
          status,
          month,
          staff_id
        }
      });
      return response.data;
    }
  });
};

export default useLeaves;
