'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero3D from '@/components/Hero3D';
import { ArrowRight, Zap, Shield, BarChart3, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero3D />
      
      {/* Hero Section */}
      <section className="container mx-auto px-8 pt-20 pb-32 min-h-[80vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 text-sky-50/80 text-xs font-bold uppercase tracking-wider mb-6 border border-white/10"
          >
            Exclusive for Founders & Indie Hackers
          </motion.span>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-8 text-gradient-blue">
            Scale faster with <br />
            <span className="opacity-90">exclusive SaaS deals.</span>
          </h1>
          <p className="text-xl text-sky-50/70 mb-10 max-w-lg">
            Stop overpaying for tools. Get premium access to cloud, marketing, and analytics platforms at a fraction of the cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/deals"
              className="px-8 py-4 btn-gradient group"
            >
              Explore All Deals
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link 
              href="/register"
              className="px-8 py-4 btn-ghost"
            >
              Join the Community
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-black/40 py-24">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Zap, title: "Instant Access", desc: "Claim deals immediately after verification." },
              { icon: Shield, title: "Verified Perks", desc: "Hand-picked offers from top-tier SaaS partners." },
              { icon: BarChart3, title: "Analytics", desc: "Track your savings and tool usage in one place." },
              { icon: Rocket, title: "Growth Boost", desc: "Tools designed to help you scale your startup." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <feature.icon size={24} className="text-sky-50" />
                </div>
                <h3 className="font-bold text-lg text-sky-50">{feature.title}</h3>
                <p className="text-sky-50/65 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-gradient-blue">Trusted by 10,000+ Founders</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-200">
            <span className="text-2xl font-black">STRIPE</span>
            <span className="text-2xl font-black">AWS</span>
            <span className="text-2xl font-black">HUBSPOT</span>
            <span className="text-2xl font-black">NOTION</span>
            <span className="text-2xl font-black">INTERCOM</span>
          </div>
        </div>
      </section>
    </div>
  );
}
