import { useAnnouncements } from '../../hooks/api/useAnnouncements';
import { useMarkAnnouncementRead } from '../../hooks/api/useMarkAnnouncementRead';
import { useCreateAnnouncement } from '../../hooks/api/useCreateAnnouncement';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { toast } from 'react-hot-toast';
import { useCurrentUser } from '@/hooks/useAuth';

const AnnouncementList = () => {
  const { data: announcements, isLoading } = useAnnouncements();
  const markReadMutation = useMarkAnnouncementRead();
  const createAnnouncementMutation = useCreateAnnouncement();
  const { data: user } = useCurrentUser();
  const isHRAdmin = ['hr', 'admin'].includes(user?.current_tenant_role?.toLowerCase());

  const handleMarkRead = async (announcementId) => {
    try {
      await markReadMutation.mutateAsync(announcementId);
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark announcement as read');
    }
  };

  const handleCreateAnnouncement = async (data) => {
    try {
      await createAnnouncementMutation.mutateAsync(data);
      toast.success('Announcement created successfully');
    } catch (error) {
      toast.error('Failed to create announcement');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Create Announcement Button - Only for HR/Admin */}
      {isHRAdmin && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => {/* Open create announcement modal */}}
          >
            Create Announcement
          </Button>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements?.map((announcement) => (
          <Card key={announcement.id}>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {announcement.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Posted by {announcement.author} on{' '}
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </p>
                </div>
                {!announcement.read && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    New
                  </span>
                )}
              </div>

              <div className="prose max-w-none text-gray-500">
                {announcement.content}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {announcement.department && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {announcement.department}
                    </span>
                  )}
                  {announcement.priority === 'high' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      High Priority
                    </span>
                  )}
                </div>

                {!announcement.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkRead(announcement.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {announcements?.length === 0 && (
          <Card>
            <div className="p-6 text-center text-gray-500">
              No announcements to display
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
