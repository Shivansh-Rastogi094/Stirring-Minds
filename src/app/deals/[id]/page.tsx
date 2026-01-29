'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function DealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await api.get(`/deals/${id}`);
        setDeal(response.data);
      } catch (error) {
        console.error('Error fetching deal:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleClaim = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setClaiming(true);
    setError('');
    try {
      await api.post('/claims', { dealId: id });
      setClaimed(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to claim deal');
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-zinc-400" size={48} />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="container mx-auto px-8 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Deal not found</h2>
        <Link href="/deals" className="text-zinc-500 hover:underline">Back to all deals</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12 max-w-5xl">
      <Link 
        href="/deals" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors mb-12 dark:hover:text-white"
      >
        <ArrowLeft size={20} />
        Back to Deals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-zinc-50 flex items-center justify-center p-4 mb-8 dark:bg-zinc-900">
              {deal.logoUrl ? (
                <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold">{deal.partnerName[0]}</span>
              )}
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-4">{deal.title}</h1>
            <p className="text-2xl font-bold text-zinc-500 mb-8 dark:text-zinc-400">{deal.partnerName}</p>
            
            <div className="prose prose-zinc dark:prose-invert max-w-none mb-12">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {deal.description}
              </p>
            </div>

            <div ref={ref} className="space-y-6">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold"
              >
                Eligibility Conditions
              </motion.h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deal.eligibilityConditions.map((condition: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900"
                  >
                    <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                    <span className="text-sm font-medium">{condition}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticky top-32 p-8 rounded-3xl border border-zinc-200 bg-white shadow-xl dark:bg-zinc-900 dark:border-zinc-800"
          >
            <div className="mb-8">
              <span className="text-zinc-500 text-sm font-medium block mb-2 dark:text-zinc-400">Benefit</span>
              <p className="text-4xl font-black tracking-tight">{deal.discountValue}</p>
            </div>

            {deal.isLocked && !user?.isVerified && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 text-amber-800 mb-8 dark:bg-amber-900/20 dark:text-amber-400">
                <Lock size={20} className="shrink-0" />
                <p className="text-xs font-medium"> This exclusive deal requires a verified startup profile. </p>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 text-red-800 mb-8 dark:bg-red-900/20 dark:text-red-400">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-xs font-medium">{error}</p>
              </div>
            )}

            {claimed ? (
              <div className="text-center p-8 rounded-2xl bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle size={48} className="mx-auto mb-4" />
                <h4 className="font-bold mb-2">Claimed Successfully!</h4>
                <p className="text-xs">Check your dashboard for the claim code and next steps.</p>
                <Link href="/dashboard" className="mt-6 block text-sm font-bold underline">Go to Dashboard</Link>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: claiming ? 1 : 1.02 }}
                whileTap={{ scale: claiming ? 1 : 0.98 }}
                disabled={claiming || (deal.isLocked && !user?.isVerified && user)}
                onClick={handleClaim}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  claiming 
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800'
                    : deal.isLocked && !user?.isVerified && user
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800'
                      : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                }`}
              >
                {claiming ? 'Processing...' : user ? 'Claim Deal' : 'Login to Claim'}
              </motion.button>
            )}

            <p className="text-[10px] text-zinc-500 text-center mt-6 dark:text-zinc-400">
              By claiming this deal, you agree to our Terms of Service and the partner's eligibility requirements.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
