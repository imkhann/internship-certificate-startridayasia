'use client';

import { useState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.log('Redirecting...', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-2xl font-bold mb-2">StartFriday<span className="font-light">Asia</span></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Start your professional journey with us.
          </h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            Access your internship certificates, track your progress, and showcase your achievements. 
            We are committed to empowering the next generation of talents.
          </p>
        </div>

        <div className="relative z-10 text-sm text-primary-200">
          © {new Date().getFullYear()} StartFriday Asia. All rights reserved.
        </div>

        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-500 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-700 opacity-50 blur-3xl"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden text-2xl font-bold text-primary-600 mb-8">StartFriday<span className="font-light">Asia</span></div>
            <h2 className="text-3xl font-bold text-dark-900 mb-2">Welcome Back</h2>
            <p className="text-dark-500">Please enter your details to sign in.</p>
          </div>

          <Card className="border-none shadow-none p-0 bg-transparent">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01"></path>
                </svg>
                {error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-field"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-dark-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  Remember me
                </label>
            
              </div>

              <Button 
                type="submit" 
                className="w-full py-3" 
                isLoading={loading}
              >
                Sign In
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-dark-400">
            <p>Powered by StartFriday Asia</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
