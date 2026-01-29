'use client';

import { motion } from 'framer-motion';

export default function DealCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-zinc-200 rounded-3xl p-6 overflow-hidden dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 animate-pulse dark:bg-zinc-800" />
        <div className="w-20 h-6 rounded-full bg-zinc-100 animate-pulse dark:bg-zinc-800" />
      </div>
      
      <div className="mb-8 space-y-3">
        <div className="w-16 h-4 rounded bg-zinc-100 animate-pulse dark:bg-zinc-800" />
        <div className="w-full h-6 rounded bg-zinc-100 animate-pulse dark:bg-zinc-800" />
        <div className="w-3/4 h-6 rounded bg-zinc-100 animate-pulse dark:bg-zinc-800" />
        <div className="w-32 h-8 rounded bg-zinc-100 animate-pulse dark:bg-zinc-800" />
      </div>
      
      <div className="w-full h-12 rounded-2xl bg-zinc-100 animate-pulse dark:bg-zinc-800" />
    </motion.div>
  );
}
