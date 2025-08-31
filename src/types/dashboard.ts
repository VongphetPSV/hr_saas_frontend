import { ReactNode } from 'react';

export interface MetricCard {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: string;
  color: 'blue' | 'orange' | 'green' | 'purple';
  bgColor: string;
  iconColor: string;
}

export interface PendingRequest {
  id: string;
  type: 'leave' | 'overtime';
  count: number;
  employees: string[];
  status: 'pending' | 'approved';
}

export interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
}
