'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <Link href="/" className="text-xl font-bold tracking-tighter text-gradient-blue">
        STARTUP<span className="opacity-80">BENEFITS</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/deals" className="text-sm font-medium text-sky-50/80 hover:text-sky-50 transition-colors">
          Browse Deals
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className="text-sm font-medium text-sky-50/80 hover:text-sky-50 transition-colors">
              Dashboard
            </Link>
            <button 
              onClick={logout}
              className="px-4 py-2 text-sm btn-ghost"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-sky-50/80 hover:text-sky-50 transition-colors">
              Login
            </Link>
            <Link 
              href="/register"
              className="px-4 py-2 text-sm btn-gradient"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
