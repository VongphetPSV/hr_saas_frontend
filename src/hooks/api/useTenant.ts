import { useState } from 'react';
import api from '@/api/axios';
import type { ApiResponse } from '@/types/core';

interface TenantData {
  name: string;
  domain: string;
  subscription_plan?: string;
  settings?: Record<string, unknown>;
}

interface Tenant extends TenantData {
  id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export const useCreateTenant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTenant = async (tenantData: TenantData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<ApiResponse<Tenant>>('/tenants/', tenantData);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTenant, loading, error };
};

export const useGetTenants = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const getTenants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse<Tenant[]>>('/tenants/');
      const tenantData = response.data.data;
      setTenants(tenantData);
      return tenantData;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch tenants');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getTenants, tenants, loading, error };
};