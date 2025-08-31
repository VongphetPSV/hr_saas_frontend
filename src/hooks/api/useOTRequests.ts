import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useOTRequests = (params = {}) => {
  const { status, month } = params;

  return useQuery({
    queryKey: ['overtime', { status, month }],
    queryFn: async () => {
      const response = await api.get('/overtime', {
        params: {
          status,
          month
        }
      });
      return response.data;
    }
  });
};

export default useOTRequests;
