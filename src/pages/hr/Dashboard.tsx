// src/pages/hr/Dashboard.tsx
import React from "react";
import { t } from "@/lib/i18n";
import { LeaveBalanceCard } from "@/components/hr/LeaveBalanceCard";
import { AnnouncementsList } from "@/components/hr/AnnouncementsList";
import { useLeaveBalance } from "@/hooks/useLeaveBalance";
import { useAnnouncements } from "@/hooks/useAnnouncements";

export const HRDashboard: React.FC = () => {
  const {
    data: leaveBalance,
    isLoading: isLeaveBalanceLoading,
    error: leaveBalanceError,
  } = useLeaveBalance();

  const {
    data: announcements,
    isLoading: isAnnouncementsLoading,
    error: announcementsError,
  } = useAnnouncements({});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("HR Dashboard")}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <LeaveBalanceCard
          total={leaveBalance?.total ?? 0}
          used={leaveBalance?.used ?? 0}
          remaining={leaveBalance?.remaining ?? 0}
          isLoading={isLeaveBalanceLoading}
          error={leaveBalanceError}
        />
        <AnnouncementsList
          items={announcements?.items ?? []}
          total={announcements?.total ?? 0}
          isLoading={isAnnouncementsLoading}
          error={announcementsError}
        />
      </div>
    </div>
  );
};
