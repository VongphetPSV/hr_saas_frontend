import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useTenants = (params = {}) => {
  const { search = '', page = 1, page_size = 10 } = params;

  return useQuery({
    queryKey: ['tenants', { search, page, page_size }],
    queryFn: async () => {
      const response = await api.get('/tenants', {
        params: {
          search,
          page,
          page_size
        }
      });
      return response.data;
    },
    keepPreviousData: true // Keep previous data while fetching next page
  });
};

export default useTenants;
