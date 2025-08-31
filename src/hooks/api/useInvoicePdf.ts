import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export const useInvoicePdf = (invoiceId) => {
  return useQuery({
    queryKey: ['invoices', invoiceId, 'pdf'],
    queryFn: async () => {
      const response = await api.get(`/invoices/${invoiceId}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    },
    enabled: !!invoiceId, // Only run query if invoiceId is provided
    cacheTime: 30 * 60 * 1000 // Cache PDF for 30 minutes
  });
};

export default useInvoicePdf;
