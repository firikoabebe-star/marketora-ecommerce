'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', formData);
      localStorage.setItem('accessToken', data.data.accessToken);
      setUser(data.data.user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow">
          {error && (
            <div className="bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border p-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
