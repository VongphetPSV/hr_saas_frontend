import api from '@/api/axios';

// Since we've fixed the base URL handling in axios.ts,
// we can now use the simple path directly
const BASE_PATH = '/announcements';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_read?: boolean;
}

export async function listAnnouncements(params?: Record<string, any>): Promise<Announcement[]> {
  const res = await api.get(BASE_PATH, { params });
  return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
}

export async function createAnnouncement(payload: Partial<Announcement>): Promise<Announcement> {
  const res = await api.post(BASE_PATH, payload);
  return res.data;
}

export async function updateAnnouncement(id: string, payload: Partial<Announcement>): Promise<Announcement> {
  const res = await api.patch(`${BASE_PATH}/${id}`, payload);
  return res.data;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await api.delete(`${BASE_PATH}/${id}`);
}

export async function markAnnouncementRead(id: string): Promise<void> {
  await api.post(`${BASE_PATH}/${id}/read`);
}
