'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('aspire_admin_auth', JSON.stringify({ username, loggedIn: true }));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <i className="fa fa-lock text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#2a2a2a' }}>
              Admin Login
            </h1>
            <p className="text-sm mt-1" style={{ color: '#8b7355' }}>
              Aspire Furniture UK Dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-center" style={{ color: '#ef3f35' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#5e3a1c' }}>
                Username
              </label>
              <div className="relative">
                <i className="fa fa-user absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8b7355' }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#5e3a1c' }}>
                Password
              </label>
              <div className="relative">
                <i className="fa fa-key absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8b7355' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                  style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {loading ? (
                <span>
                  <i className="fa fa-spinner fa-spin mr-2" />
                  Logging in...
                </span>
              ) : (
                <span>
                  <i className="fa fa-sign-in mr-2" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm hover:underline" style={{ color: '#8b7355' }}>
              <i className="fa fa-arrow-left mr-1" />
              Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
