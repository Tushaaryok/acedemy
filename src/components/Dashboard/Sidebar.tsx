'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Video,
  HelpCircle,
  FileText,
  MessageSquare,
  Globe,
  User,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar({ role = 'student' }: { role?: 'student' | 'teacher' | 'admin' }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = {
    student: [
      { name: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
      { name: 'Digital Library', href: '/dashboard/student/material', icon: FileText },
      { name: 'Live Sessions', href: '/dashboard/student/live', icon: Video },
      { name: 'Attendance', href: '/dashboard/student/attendance', icon: Calendar },
      { name: 'Assessment Roll', href: '/dashboard/student/tests', icon: GraduationCap },
      { name: 'Doubt Desk', href: '/dashboard/student/doubts', icon: HelpCircle },
      { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
      { name: 'My Profile', href: '/dashboard/student/profile', icon: User },
    ],
    teacher: [
      { name: 'Faculty Hub', href: '/dashboard/teacher', icon: LayoutDashboard },
      { name: 'Live Studio', href: '/dashboard/teacher/live', icon: Video },
      { name: 'My Courses', href: '/dashboard/teacher/courses', icon: BookOpen },
      { name: 'Material Vault', href: '/dashboard/teacher/material', icon: FileText },
      { name: 'Homework Hub', href: '/dashboard/teacher/homework', icon: GraduationCap },
      { name: 'Test Center', href: '/dashboard/teacher/tests', icon: HelpCircle },
      { name: 'Mark Attendance', href: '/dashboard/teacher/attendance', icon: Calendar },
      { name: 'Response Desk', href: '/dashboard/teacher/doubts', icon: MessageSquare },
      { name: 'My Profile', href: '/dashboard/teacher/profile', icon: User },
    ],
    admin: [
      { name: 'System Analytics', href: '/dashboard/admin', icon: LayoutDashboard },
      { name: 'Admission Desk', href: '/dashboard/admin/enquiries', icon: GraduationCap },
      { name: 'Course Archive', href: '/dashboard/admin/courses', icon: BookOpen },
      { name: 'Faculty Registry', href: '/dashboard/admin/teachers', icon: User },
      { name: 'Communication', href: '/dashboard/admin/broadcast', icon: Bell },
      { name: 'Fee Terminal', href: '/dashboard/admin/fees', icon: CreditCard },
      { name: 'Global Settings', href: '/dashboard/admin/settings', icon: Settings },
    ],
  };

  const currentItems = navItems[role] || navItems.student;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[60] bg-slate-900 text-white p-3 rounded-2xl shadow-xl transition-all active:scale-95"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={cn(
        "flex flex-col h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 z-50 transition-all duration-500 ease-in-out border-r border-white/5",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Brand */}
        <div className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/20">KA</div>
            <div>
              <h2 className="font-black text-xl tracking-tighter leading-none">Krishna</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Academy Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto no-scrollbar">
          {currentItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 group relative",
                  isActive 
                    ? "bg-amber-600 text-white shadow-2xl shadow-amber-600/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-500 group-hover:text-amber-500 transition-colors")} />
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                {isActive && <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-4 px-6 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Globe size={18} className="group-hover:text-blue-400 transition-colors" />
            <span className="font-black text-[10px] uppercase tracking-widest">Academy Home</span>
          </Link>
          <Link 
            href={role === 'admin' ? '/dashboard/admin/settings' : `/dashboard/${role}/profile`}
            className="flex items-center gap-4 px-6 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Settings size={18} className="group-hover:text-emerald-400 transition-colors" />
            <span className="font-black text-[10px] uppercase tracking-widest">Portal Settings</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-[20px] text-rose-500 bg-rose-500/5 hover:bg-rose-500 hover:text-white transition-all group mt-4"
          >
            <LogOut size={18} />
            <span className="font-black text-[10px] uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-all duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
