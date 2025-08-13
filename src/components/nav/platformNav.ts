import { LucideIcon, LayoutDashboard, Building2, Users2, Wallet, FileText, ReceiptText, Headset, Scroll, Megaphone, Settings, Activity, ShieldCheck } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  badge?: number;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const platformNav: NavSection[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/super-admin-dashboard" }
    ]
  },
  {
    section: "Management",
    items: [
      { label: "Tenants", icon: Building2, to: "/tenants" },
      { label: "Users", icon: Users2, to: "/platform-users" },
      { label: "Plans & Pricing", icon: Wallet, to: "/plans" },
      { label: "Billing", icon: FileText, to: "/billing" },
      { label: "Invoices", icon: ReceiptText, to: "/invoices" }
    ]
  },
  {
    section: "Operations",
    items: [
      { label: "Support Tickets", icon: Headset, to: "/support" },
      { label: "System Logs", icon: Scroll, to: "/logs" },
      { label: "Announcements", icon: Megaphone, to: "/platform-announcements" }
    ]
  },
  {
    section: "Admin",
    items: [
      { label: "Settings", icon: Settings, to: "/platform-settings" },
      { label: "System Health", icon: Activity, to: "/system-health" },
      { label: "Compliance", icon: ShieldCheck, to: "/compliance" }
    ]
  }
];
