import { UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from './core';
import { Announcement, Leave, Staff, Tenant, Holiday, Overtime, Payroll } from './api';

export interface UseAnnouncementsReturn extends UseQueryResult<ApiResponse<Announcement[]>> {}

export interface UseLeaveReturn extends UseQueryResult<ApiResponse<Leave[]>> {
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
}

export interface UseStaffReturn extends UseQueryResult<ApiResponse<Staff[]>> {
  create: (data: Partial<Staff>) => Promise<void>;
  update: (id: string, data: Partial<Staff>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export interface UseTenantReturn extends UseQueryResult<ApiResponse<Tenant>> {
  update: (data: Partial<Tenant>) => Promise<void>;
}

export interface UseHolidayReturn extends UseQueryResult<ApiResponse<Holiday[]>> {
  create: (data: Partial<Holiday>) => Promise<void>;
  update: (id: string, data: Partial<Holiday>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export interface UseOvertimeReturn extends UseQueryResult<ApiResponse<Overtime[]>> {
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
}

export interface UsePayrollReturn extends UseQueryResult<ApiResponse<Payroll[]>> {
  generate: (staffId: string, period: string) => Promise<void>;
  approve: (id: string) => Promise<void>;
  process: (id: string) => Promise<void>;
}

export interface UsePaginationProps {
  page: number;
  perPage: number;
  total: number;
}

export interface UsePaginationReturn {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export interface UseFilterProps<T> {
  data: T[];
  filterKey: keyof T;
}

export interface UseFilterReturn<T> {
  filteredData: T[];
  filter: string;
  setFilter: (filter: string) => void;
  clearFilter: () => void;
}

export interface UseSortProps<T> {
  data: T[];
  defaultSortKey?: keyof T;
  defaultOrder?: 'asc' | 'desc';
}

export interface UseSortReturn<T> {
  sortedData: T[];
  sortKey: keyof T | null;
  sortOrder: 'asc' | 'desc';
  setSortKey: (key: keyof T) => void;
  toggleSortOrder: () => void;
  clearSort: () => void;
}


