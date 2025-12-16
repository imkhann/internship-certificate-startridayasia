import { getSession } from '@/lib/auth';
import { getUserById } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getSession();
  const user = session ? getUserById(session.id) : null;

  if (!user) {
    return <div>Loading...</div>;
  }

  const certificateCount = user.certificates?.length || 0;
  const lastUpdate = user.certificates && user.certificates.length > 0 
    ? user.certificates[user.certificates.length - 1].issuedAt 
    : 'N/A';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-dark-900">Welcome back, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-dark-500 mt-2">Access your internship certificates and track your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between h-full">
          <div className="text-dark-500 text-sm font-medium mb-2">Total Certificates</div>
          <div className="text-4xl font-bold text-primary-600">{certificateCount}</div>
        </Card>
        
        <Card className="flex flex-col justify-between h-full">
          <div className="text-dark-500 text-sm font-medium mb-2">Internship Status</div>
          <div>
            <Badge variant={user.status === 'Aktif' ? 'success' : 'neutral'} className="text-sm px-3 py-1">
              {user.status}
            </Badge>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <div className="text-dark-500 text-sm font-medium mb-2">Last Update</div>
          <div className="text-xl font-semibold text-dark-900">{lastUpdate}</div>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark-900">Recent Certificates</h2>
          <Link href="/dashboard/certificates" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All &rarr;
          </Link>
        </div>

        {certificateCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.certificates.slice(0, 3).map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <Badge variant="neutral">{cert.issuedAt}</Badge>
                </div>
                <h3 className="font-bold text-dark-900 mb-1 line-clamp-1">{cert.title}</h3>
                <p className="text-sm text-dark-500 mb-4">PDF Document</p>
                <a href={`/certificates/${cert.file}`} download className="block">
                  <Button variant="primary" className="w-full">Download</Button>
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 border-dashed border-2 border-dark-200 shadow-none">
            <div className="mx-auto w-16 h-16 bg-dark-50 rounded-full flex items-center justify-center mb-4 text-dark-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-dark-900 mb-1">No certificates yet</h3>
            <p className="text-dark-500">Your certificates will appear here once approved by the StartFriday team.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
