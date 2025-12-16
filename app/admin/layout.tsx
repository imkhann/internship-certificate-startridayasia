import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getUserById } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== 'admin') {
    redirect('/login');
  }

  const user = getUserById(session.id);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} />
      <div className="ml-64 min-h-screen">
        <header className="bg-white shadow-sm border-b border-dark-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-dark-900">Admin Dashboard</h2>
          <div className="text-sm text-dark-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>
        <main className="p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
