import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, User, Search, MapPin, Heart, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { label: 'Newborn', slug: 'newborn' },
  { label: 'Baby', slug: 'baby' },
  { label: 'Kids', slug: 'kids' },
  { label: 'Mother & Child', slug: 'mother-child' },
  { label: 'Winter Wear', slug: 'winter' },
  { label: 'Traditionals', slug: 'traditionals' }
];

const Navbar = () => {
  const { cartCount, user, logout, setIsAuthModalOpen } = useStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-brand-cream/80 backdrop-blur-md border-b border-brand-tan/10">
      {/* Top Utility Bar (Desktop Only) */}
      <div className="hidden lg:flex justify-between items-center px-12 py-3 border-b border-brand-tan/10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">
        <div className="flex items-center gap-8">
          <Link to="/story" className="hover:text-brand-gold transition-colors">Our Heritage</Link>
          <span className="w-1 h-1 bg-brand-tan rounded-full"></span>
          <a href="#" className="hover:text-brand-gold transition-colors">Store Locator</a>
        </div>
        <p className="tracking-[0.5em]">Complimentary Artisanal Shipping on all orders</p>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-brand-gold transition-colors">Gift Cards</a>
          <span className="w-1 h-1 bg-brand-tan rounded-full"></span>
          <a href="#" className="hover:text-brand-gold transition-colors">Support</a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex justify-between items-center px-6 lg:px-12 py-6 lg:py-10">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:w-1/3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-brand-tan/10"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <button className="hidden lg:block p-3 hover:bg-brand-tan/10 transition-colors">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button className="hidden lg:block p-3 hover:bg-brand-tan/10 transition-colors">
            <MapPin size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="text-3xl lg:text-5xl font-serif text-brand-charcoal tracking-tighter lg:w-1/3 text-center">
          Mini<span className="text-brand-gold">KidZz</span>
        </Link>

        {/* User Actions */}
        <div className="flex items-center justify-end gap-4 lg:gap-6 lg:w-1/3">
          {user ? (
            <div className="flex items-center gap-2 lg:gap-6">
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                {user.email?.split('@')[0]}
              </span>
              <button onClick={logout} className="p-2 lg:p-3 hover:text-brand-pink transition-colors">
                <LogOut size={22} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className="p-2 lg:p-3 hover:bg-brand-tan/10">
              <User size={22} strokeWidth={1.5} />
            </button>
          )}
          
          <Link to="/cart" className="relative p-2 lg:p-3 hover:bg-brand-tan/10 transition-colors lg:border lg:border-brand-tan/20 flex items-center gap-3">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-brand-gold text-white text-[10px] font-bold w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Categories (Desktop Only) */}
      <div className="hidden lg:flex justify-center flex-wrap gap-x-12 px-12 py-5 bg-white/40">
        {CATEGORIES.map((cat) => (
          <Link 
            key={cat.slug} 
            to={`/category/${cat.slug}`}
            className={`text-xs font-bold uppercase tracking-[0.3em] transition-all relative group ${location.pathname === `/category/${cat.slug}` ? 'text-brand-gold' : 'text-brand-charcoal hover:text-brand-gold'}`}
          >
            {cat.label}
            <span className={`absolute -bottom-2 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full ${location.pathname === `/category/${cat.slug}` ? 'w-full' : ''}`}></span>
          </Link>
        ))}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-brand-cream z-[201] p-12 flex flex-col justify-between"
            >
              <div className="space-y-16">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-serif text-brand-charcoal">Menu</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={28} strokeWidth={1.5} /></button>
                </div>

                <div className="flex flex-col gap-10">
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat.slug} 
                      to={`/category/${cat.slug}`} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-serif italic text-brand-charcoal hover:text-brand-gold transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <div className="pt-8 border-t border-brand-tan/10 flex flex-col gap-8">
                     <Link to="/story" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/40">Our Heritage Story</Link>
                     <a href="#" className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/40">Store Locator</a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="p-8 bg-brand-tan/10 space-y-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Journal Support</p>
                    <p className="text-sm font-serif italic text-brand-charcoal">"How can our artisans help you today?"</p>
                 </div>
                 <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-brand-charcoal/20">© 2024 MINIKIDZZ</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
