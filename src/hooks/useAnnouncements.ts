// src/hooks/useAnnouncements.ts
import { useQuery } from "@tanstack/react-query";

export interface AnnouncementItem {
  id: number;
  title: string;
  created_at: string;
  author?: string | null;
}

interface AnnouncementsResponse {
  items: AnnouncementItem[];
  total: number;
}

interface UseAnnouncementsParams {
  page?: number;
  pageSize?: number;
  q?: string;
}

export const useAnnouncements = ({
  page = 1,
  pageSize = 10,
  q = "",
}: UseAnnouncementsParams = {}) => {
  return useQuery<AnnouncementsResponse>({
    queryKey: ["hr", "announcements", { page, pageSize, q }],
    queryFn: () => ({
      items: [
        {
          id: 1,
          title: "New HR policy update",
          created_at: "2025-08-25T09:00:00Z",
          author: "HR Team",
        },
        {
          id: 2,
          title: "Office maintenance Saturday",
          created_at: "2025-08-28T14:30:00Z",
          author: "Admin",
        },
      ],
      total: 2,
    }),
    staleTime: 60_000,
    retry: 1,
  });
};
