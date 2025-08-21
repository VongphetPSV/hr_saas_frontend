import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import api from '@/api/axios';
import type { Assignment, Employer, EmployerError } from '@/types/employer';
import { getAccessToken } from '@/lib/tokenUtils';

const EMPLOYERS_QUERY_KEY = ['employers'] as const;
const STALE_TIME = 60_000; // 1 minute

async function fetchEmployers(): Promise<Employer[]> {
  try {
    // Call the working assignments endpoint
    const response = await api.get('/users/me/assignments');
    const assignments = response.data;
    
    console.log('Raw assignments data:', assignments);
    
    if (!Array.isArray(assignments)) {
      console.error('Expected array but got:', typeof assignments);
      return [];
    }
    
    // Map the response to Employer format
    const employers: Employer[] = assignments.map((assignment: Assignment) => ({
      id: assignment.tenant_id,
      name: assignment.tenant?.name || `Tenant ${assignment.tenant_id}`,
      role: assignment.role,
      isActive: assignment.is_active,
      logoUrl: assignment.tenant?.logo_url || null,
      status: assignment.tenant?.status || 'INACTIVE',
      subscriptionStatus: assignment.tenant?.subscription_status,
    }));
    
    console.log('Mapped employers:', employers);
    return employers;
    
  } catch (error: any) {
    console.error('Failed to fetch employers:', error);
    const employerError = new Error(
      error?.response?.data?.message || 
      error?.response?.data?.detail || 
      'Failed to fetch employers'
    ) as EmployerError;
    
    employerError.code = error?.response?.data?.code;
    employerError.status = error?.response?.status;
    employerError.detail = error?.response?.data?.detail;
    
    throw employerError;
  }
}

export function useEmployers(options: { enabled?: boolean } = {}): UseQueryResult<Employer[], EmployerError> & {
  getActiveEmployers: () => Employer[];
  getEmployerById: (id: string) => Employer | undefined;
  invalidate: () => Promise<void>;
  refetch: () => Promise<void>;
} {
  const queryClient = useQueryClient();
  const token = getAccessToken();
  
  const query = useQuery<Employer[], EmployerError>({
    queryKey: EMPLOYERS_QUERY_KEY,
    queryFn: fetchEmployers,
    staleTime: STALE_TIME,
    enabled: options.enabled ?? !!token,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) return false;
      return failureCount < 2;
    },
    onSuccess: (data) => {
      console.log('useEmployers success:', data);
    },
    onError: (error) => {
      console.error('useEmployers error:', error);
    },
  });

  const getActiveEmployers = (): Employer[] => {
    return query.data?.filter(employer => 
      employer.isActive && 
      employer.status === 'ACTIVE' &&
      employer.subscriptionStatus !== 'EXPIRED'
    ) ?? [];
  };

  const getEmployerById = (id: string): Employer | undefined => {
    return query.data?.find(employer => employer.id === id);
  };

  const invalidate = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: EMPLOYERS_QUERY_KEY });
  };

  const refetch = async (): Promise<void> => {
    await query.refetch();
  };

  return {
    ...query,
    getActiveEmployers,
    getEmployerById,
    invalidate,
    refetch,
  };
}

// Helper to update employer selection optimistically
export async function updateSelectedEmployer(
  queryClient: any,
  employerId: string
): Promise<void> {
  // Get current employers data
  const previousData = queryClient.getQueryData<Employer[]>(EMPLOYERS_QUERY_KEY);
  if (!previousData) return;

  // Optimistically update the active status
  const updatedData = previousData.map(employer => ({
    ...employer,
    isActive: employer.id === employerId,
  }));

  // Update the cache immediately
  queryClient.setQueryData(EMPLOYERS_QUERY_KEY, updatedData);

  try {
    // Make the API call to update the selection
    await api.post('/users/me/active-employer', { 
      employer_id: employerId 
    });
    
    // On success, invalidate the query to fetch fresh data
    await queryClient.invalidateQueries({ queryKey: EMPLOYERS_QUERY_KEY });
  } catch (error: any) {
    console.error('Failed to update selected employer:', error);
    // Revert changes and throw
    queryClient.setQueryData(EMPLOYERS_QUERY_KEY, previousData);
    throw error;
  }
}

export type { Employer, EmployerError };
export default useEmployers;