// src/components/hr/LeaveBalanceCard.tsx
import React from "react";
import { t } from "@/lib/i18n";

type Props = {
  total: number;
  used: number;
  remaining: number;
  isLoading?: boolean;
  error?: Error | null;
};

export const LeaveBalanceCard: React.FC<Props> = ({
  total,
  used,
  remaining,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div
        data-testid="leave-balance-skeleton"
        className="rounded-2xl shadow-sm p-4 md:p-6 bg-gray-100 animate-pulse"
      >
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl shadow-sm p-4 md:p-6 bg-red-50">
        <p className="text-red-600">{t("Error loading leave balance")}</p>
      </div>
    );
  }

  return (
    <div
      data-testid="leave-balance-card"
      className="rounded-2xl shadow-sm p-4 md:p-6 bg-white"
    >
      <h2 className="text-lg font-semibold mb-4">{t("Leave Balance")}</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{t("Total Leave")}</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("Used Leave")}</span>
          <span className="font-medium">{used}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("Remaining Leave")}</span>
          <span className="font-medium text-green-600">{remaining}</span>
        </div>
      </div>
    </div>
  );
};
