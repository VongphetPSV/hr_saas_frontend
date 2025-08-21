import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '@/api/axios';
import { getAccessToken } from '@/lib/tokenUtils';

export interface Employer {
  id: string;           // tenant_id
  name: string;         // tenant name
  role: string;         // assignment role
  isActive: boolean;    // assignment status
  logoUrl?: string;     // tenant logo
  status: string;       // tenant status
  subscriptionStatus?: string; // tenant subscription status
}

interface Assignment {
  id: string;
  tenant_id: string;
  role: string;
  is_active: boolean;
  tenant: {
    id: string;
    name: string;
    logo_url?: string;
    status: string;
    subscription_status?: string;
  };
}

const EMPLOYERS_QUERY_KEY = ['employers'] as const;
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

async function fetchEmployers(): Promise<Employer[]> {
  // Get current user's assignments
  const { data: assignments } = await api.get<{ data: Assignment[] }>('/users/me/assignments');

  if (!Array.isArray(assignments?.data)) {
    throw new Error('Invalid assignments response format');
  }

  // Transform assignments to employers
  return assignments.data.map((assignment): Employer => ({
    id: assignment.tenant_id,
    name: assignment.tenant.name,
    role: assignment.role,
    isActive: assignment.is_active,
    logoUrl: assignment.tenant.logo_url,
    status: assignment.tenant.status,
    subscriptionStatus: assignment.tenant.subscription_status,
  }));
}

interface UseEmployersOptions {
  enabled?: boolean;
  staleTime?: number;
}

export function useEmployers(options: UseEmployersOptions = {}): UseQueryResult<Employer[]> {
  const token = getAccessToken();

  return useQuery({
    queryKey: EMPLOYERS_QUERY_KEY,
    queryFn: fetchEmployers,
    // Only run if we have a token and the consumer hasn't disabled the query
    enabled: options.enabled !== false && !!token,
    // Use provided stale time or default
    staleTime: options.staleTime ?? STALE_TIME,
    // Don't retry on auth errors, retry other errors up to 2 times
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

// Helper to get active employers from the cache
export function getActiveEmployers(employers: Employer[] | undefined): Employer[] {
  if (!employers) return [];
  
  return employers.filter(employer => 
    employer.isActive && 
    employer.status === 'ACTIVE' &&
    employer.subscriptionStatus !== 'EXPIRED'
  );
}

// Helper to find employer by ID
export function getEmployerById(
  employers: Employer[] | undefined, 
  id: string
): Employer | undefined {
  if (!employers) return undefined;
  return employers.find(employer => employer.id === id);
}

export default useEmployers;