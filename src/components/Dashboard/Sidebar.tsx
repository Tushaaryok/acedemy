'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar({ role = 'student' }: { role?: 'student' | 'teacher' | 'admin' }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = {
    student: [
      { name: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
      { name: 'My Courses', href: '/dashboard/student/courses', icon: BookOpen },
      { name: 'Attendance', href: '/dashboard/student/attendance', icon: Calendar },
      { name: 'Tests & Quiz', href: '/dashboard/student/tests', icon: GraduationCap },
      { name: 'Payments', href: '/dashboard/student/payments', icon: CreditCard },
    ],
    teacher: [
      { name: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard },
      { name: 'My Classes', href: '/dashboard/teacher/classes', icon: BookOpen },
      { name: 'Mark Attendance', href: '/dashboard/teacher/attendance', icon: Calendar },
    ],
    admin: [
      { name: 'Analytics', href: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Students', href: '/dashboard/admin/students', icon: User },
      { name: 'Fees', href: '/dashboard/admin/fees', icon: CreditCard },
    ],
  };

  const currentItems = navItems[role] || navItems.student;

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 z-50 transition-all duration-300">
      {/* Brand */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-xl">KA</div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Krishna</h2>
            <p className="text-xs text-slate-400 font-medium">Academy Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {currentItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-amber-400")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:text-white hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
