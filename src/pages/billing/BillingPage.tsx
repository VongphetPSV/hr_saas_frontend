import { useState } from 'react';
import { useInvoiceHistory } from '../../hooks/api/useInvoiceHistory';
import { useInvoicePdf } from '../../hooks/api/useInvoicePdf';
import { useCurrentSubscription } from '../../hooks/api/useCurrentSubscription';
import { usePlans } from '../../hooks/api/usePlans';
import { downloadBlob } from '../../utils/download';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { toast } from 'react-hot-toast';

const BillingPage = () => {
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState(null);
  const { data: invoices, isLoading: isLoadingInvoices } = useInvoiceHistory();
  const { data: subscription } = useCurrentSubscription();
  const { data: plans } = usePlans();
  const { mutateAsync: getPdf } = useInvoicePdf();

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      setDownloadingInvoiceId(invoiceId);
      const blob = await getPdf(invoiceId);
      downloadBlob(blob, `invoice-${invoiceId}.pdf`);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error('Download error:', error);
    } finally {
      setDownloadingInvoiceId(null);
    }
  };

  if (isLoadingInvoices) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Current Plan */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Current Subscription
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Plan</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {subscription?.plan_name || 'No active plan'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className={`mt-1 text-lg font-medium ${
                subscription?.status === 'active'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {subscription?.status || 'Inactive'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Next Billing</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {subscription?.next_billing_date
                  ? new Date(subscription.next_billing_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Available Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border p-6 ${
                  plan.id === subscription?.plan_id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {plan.description}
                </p>
                <p className="mt-4 text-2xl font-semibold text-gray-900">
                  ${plan.price}/mo
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.id === subscription?.plan_id ? 'outline' : 'primary'}
                  className="w-full mt-6"
                  disabled={plan.id === subscription?.plan_id}
                >
                  {plan.id === subscription?.plan_id ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Invoice History */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Invoice History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices?.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{invoice.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        loading={downloadingInvoiceId === invoice.id}
                      >
                        Download PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingPage;
