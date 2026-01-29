'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2, User, Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', { name, email, password });
      login(response.data.token, response.data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-8 min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-md p-10 rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-gradient-blue">Join the Community</h1>
          <p className="text-sky-50/65 text-sm">Start scaling your startup with premium perks.</p>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-800 mb-6 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-black/30 text-sky-50 placeholder:text-sky-50/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-black/30 text-sky-50 placeholder:text-sky-50/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
                placeholder="founder@startup.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-black/30 text-sky-50 placeholder:text-sky-50/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-2xl btn-gradient flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-sky-50/65">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-gradient-blue hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
