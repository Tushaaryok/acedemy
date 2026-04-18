import DashboardSidebar from "@/src/components/Dashboard/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Get user role
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const role = profile?.role as 'student' | 'teacher' | 'admin' || 'student';

  return (
    <div className="flex bg-slate-50 min-h-screen relative overflow-x-hidden">
      <DashboardSidebar role={role} />
      <div className="flex-1 lg:ml-64 p-4 md:p-8 w-full">
        {children}
      </div>
    </div>
  );
}
