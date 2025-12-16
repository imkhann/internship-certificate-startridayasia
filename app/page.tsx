import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="mb-8 inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-4xl">🎓</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Portal Sertifikat Magang
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-primary-100 font-light">
          StartFridayAsia — Akses dan unduh sertifikat magang Anda dengan mudah, cepat, dan aman.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button 
              size="lg" 
              className="bg-white text-primary-700 hover:bg-gray-50 border-transparent text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Masuk ke Portal
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-primary-200 text-sm">
          &copy; {new Date().getFullYear()} StartFridayAsia. All rights reserved.
        </div>
      </div>
    </div>
  );
}
