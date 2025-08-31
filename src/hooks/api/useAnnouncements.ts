import { useQuery } from '@tanstack/react-query';
import { listAnnouncements, type Announcement } from '@/api/announcementsClient';

import { UseAnnouncementsReturn } from '@/types/hooks';

export const useAnnouncements = (): UseAnnouncementsReturn => {
  return useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: () => listAnnouncements(),
    // Refresh announcements more frequently as they're important
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};
