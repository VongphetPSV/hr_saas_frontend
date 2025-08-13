import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useInvoiceHistory = () => {
  return useQuery({
    queryKey: ['reports', 'invoice-history'],
    queryFn: async () => {
      const response = await api.get('/reports/invoice-history');
      return response.data;
    }
  });
};

export default useInvoiceHistory;
