'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import DealCard from '@/components/DealCard';
import DealCardSkeleton from '@/components/DealCardSkeleton';
import { Search, Filter, Loader2 } from 'lucide-react';

const CATEGORIES = ['All', 'Cloud', 'Marketing', 'Analytics', 'Productivity', 'Other'];
const ACCESS_LEVELS = ['All', 'unlocked', 'locked'];

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [accessLevel, setAccessLevel] = useState('All');

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const response = await api.get('/deals', {
          params: { category, search, accessLevel: accessLevel !== 'All' ? accessLevel : undefined }
        });
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDeals();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search, accessLevel]);

  return (
    <div className="container mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-gradient-blue">Explore Exclusive Deals</h1>
        <p className="text-sky-50/65 max-w-xl">
          Browse through our curated list of partnerships designed to help your startup scale without breaking the bank.
        </p>
      </motion.div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'btn-gradient'
                  : 'bg-white/5 text-sky-50/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-sky-50/70">Access:</span>
          {ACCESS_LEVELS.map((level) => (
            <motion.button
              key={level}
              onClick={() => setAccessLevel(level)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                accessLevel === level
                  ? 'btn-gradient'
                  : 'bg-white/5 text-sky-50/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {level === 'unlocked' ? 'Public' : level === 'locked' ? 'Verified Only' : level}
            </motion.button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-50/40" size={18} />
          <input
            type="text"
            placeholder="Search partners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-white/10 bg-black/30 text-sky-50 placeholder:text-sky-50/30 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[...Array(6)].map((_, i) => (
            <DealCardSkeleton key={i} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {deals.map((deal: any) => (
              <DealCard key={deal._id} deal={deal} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && deals.length === 0 && (
        <div className="text-center py-32">
          <p className="text-sky-50/60 text-lg">No deals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
