import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Phone, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      // Supabase OAuth handles redirect, so we don't need to close manually here
    } catch (err) {
      console.error("Auth Error:", err);
      setError('Google Authentication Failed. Please check your Supabase dashboard settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center bg-brand-charcoal/95 backdrop-blur-xl p-4 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 40 }} 
          className="bg-brand-cream w-full max-w-5xl h-full lg:max-h-[700px] overflow-hidden relative border border-brand-tan/30 rounded-none shadow-5xl flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={() => { setIsAuthModalOpen(false); setError(''); }} 
            className="absolute top-8 right-8 text-brand-charcoal/20 hover:text-brand-charcoal transition-all z-50 p-2"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Left Side: Editorial Storyboard */}
          <div className="hidden lg:flex lg:w-[42%] bg-[#F9F7F2] p-24 flex-col justify-between relative overflow-hidden border-r border-brand-tan/10">
             <div className="space-y-12 relative z-10">
               <div className="space-y-6">
                 <span className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.5em] block">Journal Entry</span>
                 <h2 className="text-7xl lg:text-8xl font-serif text-brand-charcoal leading-[0.9] tracking-tighter">Your <br /><i className="text-brand-forest italic">Luxe Path</i>.</h2>
               </div>
               
               <p className="text-xl text-brand-charcoal/50 font-serif italic leading-relaxed max-w-sm">
                 "Joining the MiniKidZz circle ensures that your story is narrated with heritage values."
               </p>

               <div className="pt-16 space-y-10">
                  <BenefitItem icon="📦" title="Track Stories" desc="Monitor your artisanal order narrations." />
                  <BenefitItem icon="🎟️" title="Exclusive Access" desc="Invite-only vintage collections." />
               </div>
             </div>

             <div className="relative z-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-tan">
                <ShieldCheck size={14} /> SECURE SUPABASE CHANNEL
             </div>
             
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          </div>

          {/* Right Side: Authentication Grid */}
          <div className="flex-grow lg:w-[58%] p-16 lg:p-24 flex flex-col justify-center space-y-14 bg-white relative">
            <div className="space-y-4">
              <h3 className="text-4xl lg:text-5xl font-serif text-brand-charcoal tracking-tight">Login <i className="text-brand-gold italic">To Proceed</i>.</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/20 shrink-0">POWERED BY SUPABASE AUTH</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-brand-pink/5 text-brand-pink p-6 border-l-2 border-brand-pink flex items-center gap-6">
                <AlertCircle size={20} />
                <span className="font-bold text-[10px] uppercase tracking-widest">{error}</span>
              </motion.div>
            )}

            <div className="space-y-10">
              {/* Google Journal Login */}
              <p className="text-sm font-serif italic text-brand-charcoal/40 mb-8 px-2">
                Sign in with your Google account to manage your heritage collections and checkout seamlessly.
              </p>

              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-between gap-6 p-10 border-2 border-brand-tan/20 hover:border-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden disabled:opacity-50"
              >
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-12 h-12 bg-white flex items-center justify-center border border-brand-tan/10 shadow-sm rounded-none">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-[0.4em] text-brand-charcoal group-hover:text-brand-gold transition-colors">Narration via Google</span>
                </div>
                <ArrowRight size={24} className="text-brand-tan group-hover:text-brand-gold group-hover:translate-x-3 transition-all relative z-10" />
              </button>

              <div className="pt-10 flex items-center gap-8 opacity-20"><div className="h-px flex-grow bg-brand-charcoal"></div><span className="text-[9px] font-bold uppercase tracking-[1em] text-brand-charcoal">END OF PATH</span><div className="h-px flex-grow bg-brand-charcoal"></div></div>
              
              <p className="text-center text-[9px] font-bold tracking-[0.3em] text-brand-charcoal/20 uppercase max-w-xs mx-auto">
                By signing in, you agree to the journals of privacy and service.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const BenefitItem = ({ icon, title, desc }) => (
  <div className="flex gap-8 group">
    <div className="w-16 h-16 shrink-0 rounded-none bg-white flex items-center justify-center shadow-sm group-hover:bg-brand-gold transition-all duration-500 border border-brand-tan/10 text-2xl">
       {icon}
    </div>
    <div className="space-y-1">
       <div className="font-bold text-[10px] uppercase tracking-[0.3em] text-brand-charcoal">{title}</div>
       <p className="text-xs text-brand-charcoal/40 font-serif italic leading-snug">{desc}</p>
    </div>
  </div>
);

export default AuthModal;
