// src/app/[locale]/dashboard/components/Sidebar.tsx
'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { Home, Users, BookUser, BookCopy, CalendarClock, UserCog, ShieldAlert, Settings, School } from 'lucide-react';
import { useTranslations } from 'next-intl';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { section: 'academicManagement', items: [
    { href: '/dashboard/students', icon: Users, label: 'students' },
    { href: '/dashboard/grades', icon: BookCopy, label: 'grades' },
    { href: '/dashboard/subjects', icon: BookCopy, label: 'subjects' },
    { href: '/dashboard/schedules', icon: CalendarClock, label: 'schedules' },
  ]},
  { section: 'communityManagement', items: [
    { href: '/dashboard/staff', icon: UserCog, label: 'staff' },
    { href: '/dashboard/tutors', icon: BookUser, label: 'tutors' },
  ]},
  { section: 'studentTracking', items: [
    { href: '/dashboard/conduct', icon: ShieldAlert, label: 'conductReports' },
  ]},
  { section: 'systemConfiguration', items: [
    { href: '/dashboard/school-years', icon: School, label: 'schoolYears' },
    { href: '/dashboard/settings', icon: Settings, label: 'settings' },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('Dashboard.sidebar');

  return (
    <aside className="w-64 flex-shrink-0 bg-[#bc955b] text-white flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-red-800">
        Admin Panel
      </div>
      <nav className="flex-grow p-4 space-y-4">
        {navItems.map((item, index) => (
          item.href ? (
            <Link key={index} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href ? 'bg-[#621333]' : 'hover:bg-red-800'}`}>
              <item.icon className="h-5 w-5" />
              <span>{t(item.label)}</span>
            </Link>
          ) : (
            <div key={index}>
              <h3 className="px-3 text-xs font-semibold text-red-950 uppercase tracking-wider">{t(item.section)}</h3>
              <div className="mt-2 space-y-1">
                {item.items.map((subItem, subIndex) => (
                  <Link key={subIndex} href={subItem.href} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === subItem.href ? 'bg-[#621333]' : 'hover:bg-red-800'}`}>
                    <subItem.icon className="h-5 w-5" />
                    <span>{t(subItem.label)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
      </nav>
    </aside>
  );
}