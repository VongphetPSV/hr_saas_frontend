import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useStaffList = (params = {}) => {
  const { 
    department_id,
    active,
    page = 1,
    page_size = 10
  } = params;

  return useQuery({
    queryKey: ['staff', { department_id, active, page, page_size }],
    queryFn: async () => {
      const response = await api.get('/staff', {
        params: {
          department_id,
          active,
          page,
          page_size
        }
      });
      return response.data;
    },
    keepPreviousData: true
  });
};

export default useStaffList;
