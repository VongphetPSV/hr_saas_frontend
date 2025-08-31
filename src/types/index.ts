export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenant_role?: string;
  platform_role?: string;
  company?: string;
}

export interface MetricCard {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  color: "blue" | "orange" | "green" | "purple";
}

export interface PendingApproval {
  id: string;
  employeeName: string;
  type: "leave" | "overtime";
  date: string;
  status: "pending" | "approved" | "rejected";
}
