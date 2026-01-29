'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Loader2, User, Mail, Shield, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchClaims = async () => {
      try {
        const response = await api.get('/claims/my');
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClaims();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-sky-50/40" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Profile */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <User size={40} className="text-sky-50/40" />
            </div>
            <h2 className="text-2xl font-bold mb-1 text-gradient-blue">{user?.name}</h2>
            <p className="text-sky-50/65 text-sm mb-6">{user?.email}</p>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm">
                <Shield size={18} className={user?.isVerified ? "text-green-500" : "text-zinc-400"} />
                <span className="font-medium">{user?.isVerified ? "Verified Founder" : "Unverified Account"}</span>
              </div>
              {!user?.isVerified && (
                <p className="text-[10px] text-sky-50/55 leading-relaxed">
                  Verify your account to unlock premium SaaS benefits like AWS credits and HubSpot discounts.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-black tracking-tight mb-8 text-gradient-blue">Claimed Benefits</h1>
            
            {claims.length === 0 ? (
              <div className="p-12 rounded-3xl border border-dashed border-white/15 text-center bg-white/5 backdrop-blur">
                <Clock size={48} className="mx-auto mb-4 text-sky-50/25" />
                <h3 className="text-xl font-bold mb-2">No claims yet</h3>
                <p className="text-sky-50/60 mb-8">You haven't claimed any startup benefits yet. Start exploring now!</p>
                <Link 
                  href="/deals"
                  className="px-6 py-3 btn-gradient"
                >
                  Explore Deals
                </Link>
              </div>
            ) : (
              <div ref={ref} className="space-y-6">
                {claims.map((claim: any, index: number) => (
                  <motion.div
                    key={claim._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    whileHover={{ y: -2 }}
                    className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur flex flex-col md:flex-row items-center gap-6 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center p-3 shrink-0">
                      <img src={claim.deal.logoUrl} alt={claim.deal.partnerName} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-lg font-bold">{claim.deal.title}</h3>
                      <p className="text-sm text-sky-50/60">{claim.deal.partnerName}</p>
                    </div>

                    <div className="px-4 py-2 rounded-2xl bg-black/30 border border-white/10 text-center min-w-[120px]">
                      <span className="text-[10px] text-sky-50/55 uppercase font-bold block">Code</span>
                      <span className="text-sm font-black tracking-widest">{claim.claimCode}</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle size={16} />
                      <span className="text-xs font-bold uppercase">{claim.status}</span>
                    </div>

                    <Link 
                      href={`/deals/${claim.deal._id}`}
                      className="p-3 rounded-full bg-black/30 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
