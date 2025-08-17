import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { User } from './useAuth';

type Assignment = {
  id: string;
  tenant_id: string;
  role: string;
  is_active?: boolean;
};

export type Employer = {
  id: string;       // tenant_id
  name: string;     // from tenant
  role: string;     // assignment.role
  active: boolean;  // assignment.is_active
  logo_url?: string | null;
};

const tenantNameCache = new Map<string, string>();

async function getCurrentUserId(): Promise<string> {
  const me = await api.get<User>('/auth/me');
  return me.data.id;
}

async function getTenantName(tenantId: string): Promise<string> {
  if (tenantNameCache.has(tenantId)) return tenantNameCache.get(tenantId)!;
  const res = await api.get(`/tenants/${tenantId}`);
  const name =
    res.data?.name ??
    res.data?.tenant_name ??
    res.data?.company_name ??
    `Tenant ${tenantId}`;
  tenantNameCache.set(tenantId, name);
  return name;
}

async function fetchEmployers(): Promise<Employer[]> {
  try {
    // Try the new job assignments endpoint first
    const userId = await getCurrentUserId();
    const res = await api.get<{ data?: Assignment[] }>(
      `/job-assignments/users/${userId}/job-assignments`,
      { validateStatus: () => true }
    );

    // If successful, use the new format
    if (res.status === 200) {
      const list: Assignment[] = Array.isArray(res.data)
        ? (res.data as any)
        : res.data?.data ?? [];

      const employers: Employer[] = [];
      for (const a of list) {
        const tenantId = a?.tenant_id;
        if (!tenantId) continue;
        const name = await getTenantName(tenantId);
        employers.push({
          id: tenantId,
          name,
          role: a?.role ?? 'member',
          active: a?.is_active ?? true,
          logo_url: null,
        });
      }
      return employers;
    }

    // Fallback to the old employers endpoint
    console.warn('Job assignments endpoint failed, falling back to employers endpoint');
    const fallbackRes = await api.get('/users/me/employers');
    const fallbackList = Array.isArray(fallbackRes.data)
      ? fallbackRes.data
      : fallbackRes.data?.data ?? [];

    return fallbackList.map((e: any) => ({
      id: e?.id ?? e?.tenant_id ?? e?.employer_id ?? String(e),
      name: e?.name ?? e?.tenant_name ?? e?.company_name ?? 'Unknown employer',
      role: e?.role ?? e?.type ?? 'member',
      active: true,
      logo_url: e?.logo_url ?? null,
    }));
  } catch (error: any) {
    console.error('Error fetching employers:', error);
    // Re-throw with a better error message
    throw new Error(
      error?.response?.data?.message || 
      error?.response?.data?.detail || 
      error?.message || 
      'Failed to fetch employers'
    );
  }
}

export function useEmployers() {
  return useQuery<Employer[]>({
    queryKey: ['employers'],
    queryFn: fetchEmployers,
    staleTime: 5 * 60 * 1000, // 5 min
    retry: (count, error: any) => {
      const status = error?.response?.status ?? error?.status;
      if (status === 401 || status === 403 || status === 404) return false;
      return count < 1;
    },
  });
}

export default useEmployers;