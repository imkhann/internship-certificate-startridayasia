'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { uploadCertificateAction } from '@/app/actions/admin';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface UploadFormClientProps {
  users: User[];
}

export default function UploadFormClient({ users }: UploadFormClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  async function handleSubmit(formData: FormData) {
    setUploading(true);
    try {
      const result = await uploadCertificateAction(formData);
      if (result.error) {
        showMessage('error', result.error);
      } else {
        showMessage('success', result.message || 'Sertifikat berhasil diupload');
        const form = document.getElementById('upload-form') as HTMLFormElement;
        form?.reset();
        setSelectedFiles([]);
        router.refresh();
      }
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('error', 'Terjadi kesalahan saat upload');
    } finally {
      setUploading(false);
    }
  }

  const regularUsers = users.filter(u => u.role === 'user');
  const filteredUsers = regularUsers.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return true;
    return `${u.name} ${u.email}`.toLowerCase().includes(q);
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Sertifikat</h1>
        <p className="text-gray-500">Upload dan assign sertifikat ke user</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📤</span> Form Upload
              </h3>
            </div>
            <div className="p-6">
              <form id="upload-form" action={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih User</label>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm mb-2"
                    placeholder="Cari nama atau email..."
                  />
                  <select name="userId" required className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm">
                    <option value="">-- Pilih User --</option>
                    {filteredUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Sertifikat</label>
                  <input 
                    type="text" 
                    name="title" 
                    required 
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                    placeholder="Contoh: Sertifikat Magang Backend"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File PDF</label>
                  <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                    selectedFiles.length > 0
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-500'
                  }`}>
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>{selectedFiles.length > 0 ? 'Ganti file' : 'Upload file'}</span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            accept=".pdf"
                            multiple
                            required
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF hingga 10MB</p>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-3 rounded-lg border border-gray-200 bg-white p-3">
                      <div className="text-sm font-medium text-gray-900 mb-2">File dipilih</div>
                      <div className="space-y-2">
                        {selectedFiles.map((f) => (
                          <div key={`${f.name}-${f.lastModified}`} className="flex items-center justify-between gap-2 text-sm">
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">{f.name}</p>
                              <p className="text-xs text-gray-500">{Math.ceil(f.size / 1024)} KB</p>
                            </div>
                            <span className="text-xs font-semibold text-gray-600">PDF</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? '⏳ Mengupload...' : '📤 Upload Sertifikat'}
                </Button>
              </form>
            </div>
          </Card>

          <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4">
            <div className="flex items-start space-x-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Informasi Upload</h4>
                <ul className="text-blue-700 text-xs mt-2 space-y-1 list-disc list-inside">
                  <li>File akan disimpan di folder <code className="bg-blue-100 px-1 rounded">/public/certificates/</code></li>
                  <li>Nama file akan otomatis di-generate dengan format unik</li>
                  <li>User dapat langsung download setelah sertifikat diupload</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📋</span> Daftar Sertifikat User
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {regularUsers.map((user) => {
                const certCount = user.certificates?.length || 0;
                return (
                  <details key={user.id} className="group rounded-xl border border-gray-100 bg-white">
                    <summary className="cursor-pointer select-none p-4 flex items-center justify-between gap-4 hover:bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Badge variant={user.status === 'Aktif' ? 'success' : 'secondary'}>
                          {user.status}
                        </Badge>
                        <span className="text-sm text-gray-600 font-medium">{certCount}</span>
                      </div>
                    </summary>

                    <div className="px-4 pb-4">
                      {certCount === 0 ? (
                        <div className="text-sm text-gray-500">Belum ada sertifikat.</div>
                      ) : (
                        <div className="space-y-2">
                          {user.certificates!.map((cert) => (
                            <div key={cert.id} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-white p-3">
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate" title={cert.title}>{cert.title}</p>
                                <p className="text-xs text-gray-500 truncate">{cert.file}</p>
                              </div>
                              <a
                                href={`/certificates/${cert.file}`}
                                target="_blank"
                                className="text-xs font-medium text-primary-600 hover:text-primary-700"
                              >
                                Lihat
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                );
              })}

              {regularUsers.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <p>Belum ada user terdaftar</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
