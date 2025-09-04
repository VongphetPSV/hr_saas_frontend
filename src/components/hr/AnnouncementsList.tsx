// src/components/hr/AnnouncementsList.tsx
import React from "react";
import { t } from "@/lib/i18n";
import { AnnouncementItem } from "@/hooks/useAnnouncements";

type Props = {
  items: AnnouncementItem[];
  total: number;
  isLoading?: boolean;
  error?: Error | null;
};

export const AnnouncementsList: React.FC<Props> = ({
  items,
  total,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div
        role="alert"
        aria-label="Loading announcements"
        className="rounded-2xl shadow-sm p-4 md:p-6 bg-gray-100 animate-pulse"
      >
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        {[1, 2].map((_, index) => (
          <div key={index} className="mb-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        aria-label="Error loading announcements"
        className="rounded-2xl shadow-sm p-4 md:p-6 bg-red-50"
      >
        <p className="text-red-600">{t("Error loading announcements")}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        role="region"
        aria-label="No announcements"
        className="rounded-2xl shadow-sm p-4 md:p-6 bg-white text-center"
      >
        <p className="text-gray-500">{t("No announcements yet")}</p>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Announcements list"
      className="rounded-2xl shadow-sm p-4 md:p-6 bg-white"
    >
      <h2 className="text-lg font-semibold mb-4">{t("Announcements")}</h2>
      <div className="space-y-4">
        {items.map((announcement) => (
          <div key={announcement.id} className="border-b pb-3 last:border-b-0">
            <h3 className="font-medium">{announcement.title}</h3>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{announcement.author}</span>
              <span>
                {new Date(announcement.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {total > items.length && (
          <div className="text-center text-sm text-gray-500 mt-2">
            {t(`+${total - items.length} more announcement(s)`)}
          </div>
        )}
      </div>
    </div>
  );
};
