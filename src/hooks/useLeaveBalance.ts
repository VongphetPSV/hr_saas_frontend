// src/hooks/useLeaveBalance.ts
import { useQuery } from "@tanstack/react-query";

interface LeaveBalance {
  total: number;
  used: number;
  remaining: number;
}

export const useLeaveBalance = () => {
  return useQuery<LeaveBalance>({
    queryKey: ["hr", "leave", "balance"],
    queryFn: () => ({
      total: 12,
      used: 4,
      remaining: 8,
    }),
    staleTime: 60_000,
    retry: 1,
  });
};
