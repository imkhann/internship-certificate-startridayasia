import { getUsers } from '@/lib/data';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default async function AdminDashboardPage() {
  const users = getUsers();
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalCertificates = users.reduce((acc, user) => acc + (user.certificates?.length || 0), 0);
  const activeUsers = users.filter(u => u.status === 'Aktif' && u.role === 'user').length;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard 👋</h2>
          <p className="text-primary-100 text-lg max-w-2xl">
            Selamat datang di panel admin. Kelola user, pantau aktivitas, dan upload sertifikat magang dengan mudah dari sini.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total User</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalUsers}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">User Aktif</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeUsers}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Sertifikat</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalCertificates}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-2xl">
              📜
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Admin</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center text-2xl">
              🛡️
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">User Terbaru</h3>
                <p className="text-sm text-gray-500">Daftar user yang baru ditambahkan</p>
              </div>
              <Link href="/admin/users">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sertifikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.filter(u => u.role === 'user').slice(0, 5).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={user.status === 'Aktif' ? 'success' : 'warning'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600 font-medium">
                          {user.certificates?.length || 0} File
                        </span>
                      </td>
                    </tr>
                  ))}
                  {users.filter(u => u.role === 'user').length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500">
                        Belum ada data user.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Aksi Cepat</h3>
              <p className="text-sm text-gray-500">Menu yang sering digunakan</p>
            </div>
            <div className="p-6 space-y-4">
              <Link href="/admin/users" className="block">
                <div className="group p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-700">Kelola User</h4>
                    <p className="text-xs text-gray-500">Tambah, edit, atau hapus user</p>
                  </div>
                </div>
              </Link>

              <Link href="/admin/upload-certificate" className="block">
                <div className="group p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform">
                    📤
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Upload Sertifikat</h4>
                    <p className="text-xs text-gray-500">Upload file PDF sertifikat baru</p>
                  </div>
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
