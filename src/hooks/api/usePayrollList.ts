import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const usePayrollList = (params = {}) => {
  const { month, status, staff_id } = params;

  return useQuery({
    queryKey: ['payrolls', { month, status, staff_id }],
    queryFn: async () => {
      const response = await api.get('/payrolls', {
        params: {
          month,
          status,
          staff_id
        }
      });
      return response.data;
    }
  });
};

export default usePayrollList;
