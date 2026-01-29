'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

interface DealCardProps {
  deal: {
    _id: string;
    title: string;
    partnerName: string;
    category: string;
    discountValue: string;
    isLocked: boolean;
    logoUrl: string;
  };
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white border border-zinc-200 rounded-3xl p-6 overflow-hidden dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center p-2 dark:bg-zinc-800">
          {deal.logoUrl ? (
            <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
          ) : (
            <span className="text-xl font-bold">{deal.partnerName[0]}</span>
          )}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          deal.isLocked 
            ? 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' 
            : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {deal.isLocked ? (
            <span className="flex items-center gap-1"><Lock size={10} /> Locked</span>
          ) : (
            <span className="flex items-center gap-1"><Unlock size={10} /> Public</span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <span className="text-zinc-500 text-xs font-medium mb-1 block dark:text-zinc-400">{deal.category}</span>
        <h3 className="text-xl font-bold mb-2 group-hover:text-zinc-600 transition-colors dark:group-hover:text-zinc-300">
          {deal.title}
        </h3>
        <p className="text-2xl font-black tracking-tight text-black dark:text-white">
          {deal.discountValue}
        </p>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link 
          href={`/deals/${deal._id}`}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-zinc-50 text-sm font-bold hover:bg-zinc-100 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          View Details
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default DealCard;
