import { type IconType } from 'react-icons';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineCash,
  HiOutlineFolder,
  HiOutlineUser,
  HiOutlineCreditCard
} from 'react-icons/hi';

interface NavItem {
  label: string;
  to: string;
  icon: IconType;
  badge?: number;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

export const staffNav: NavSection[] = [
  {
    section: 'Overview',
    items: [
      {
        label: 'Dashboard',
        to: '/dashboard',
        icon: HiOutlineHome
      }
    ]
  },
  {
    section: 'Time Management',
    items: [
      {
        label: 'Leave',
        to: '/leave',
        icon: HiOutlineCalendar
      },
      {
        label: 'OT',
        to: '/ot',
        icon: HiOutlineClock
      },
      {
        label: 'Timesheet',
        to: '/timesheet',
        icon: HiOutlineDocumentText
      }
    ]
  },
  {
    section: 'Organization',
    items: [
      {
        label: 'Directory',
        to: '/directory',
        icon: HiOutlineUserGroup
      },
      {
        label: 'Documents',
        to: '/documents',
        icon: HiOutlineFolder
      }
    ]
  },
  {
    section: 'Profile',
    items: [
      {
        label: 'My Profile',
        to: '/profile',
        icon: HiOutlineUser
      }
    ]
  }
];

export const adminNav: NavSection[] = [
  {
    section: 'Overview',
    items: [
      {
        label: 'Dashboard',
        to: '/dashboard',
        icon: HiOutlineHome
      }
    ]
  },
  {
    section: 'Time Management',
    items: [
      {
        label: 'Leave',
        to: '/leave',
        icon: HiOutlineCalendar,
        badge: 5 // Example pending count
      },
      {
        label: 'OT',
        to: '/overtime',
        icon: HiOutlineClock,
        badge: 3 // Example pending count
      },
      {
        label: 'Timesheet',
        to: '/timesheet',
        icon: HiOutlineDocumentText
      }
    ]
  },
  {
    section: 'Organization',
    items: [
      {
        label: 'Staff',
        to: '/staff',
        icon: HiOutlineUserGroup
      },
      {
        label: 'Documents',
        to: '/documents',
        icon: HiOutlineFolder
      }
    ]
  },
  {
    section: 'Subscription',
    items: [
      {
        label: 'Billing',
        to: '/billing',
        icon: HiOutlineCreditCard
      }
    ]
  },
  {
    section: 'Settings',
    items: [
      {
        label: 'Settings',
        to: '/settings',
        icon: HiOutlineCog
      }
    ]
  }
];

export const platformNav: NavSection[] = [
  {
    section: 'Overview',
    items: [
      {
        label: 'Dashboard',
        to: '/platform-dashboard',
        icon: HiOutlineHome
      }
    ]
  },
  {
    section: 'Management',
    items: [
      {
        label: 'Tenants',
        to: '/tenants',
        icon: HiOutlineUserGroup
      },
      {
        label: 'Subscriptions',
        to: '/subscriptions',
        icon: HiOutlineCash
      }
    ]
  },
  {
    section: 'System',
    items: [
      {
        label: 'Settings',
        to: '/platform-settings',
        icon: HiOutlineCog
      }
    ]
  }
];