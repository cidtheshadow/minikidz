import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, User, Search, MapPin, Heart, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-brand-cream/80 backdrop-blur-md border-b border-brand-tan/10">
      {/* Top Utility Bar */}
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
      <div className="flex justify-between items-center px-6 lg:px-12 py-8 lg:py-10">
        <div className="flex items-center gap-6 lg:w-1/3">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-3 hover:bg-brand-tan/10 transition-colors">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button className="hidden lg:block p-3 hover:bg-brand-tan/10 transition-colors">
            <MapPin size={22} strokeWidth={1.5} />
          </button>
        </div>

        <Link to="/" className="text-4xl lg:text-5xl font-serif text-brand-charcoal tracking-tighter lg:w-1/3 text-center">
          Mini<span className="text-brand-gold">KidZz</span>
        </Link>

        <div className="flex items-center justify-end gap-6 lg:w-1/3">
          {user ? (
            <div className="flex items-center gap-6">
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-brand-gold">MEMBER: {user.email?.split('@')[0]}</span>
              <button onClick={logout} className="p-3 hover:text-brand-pink transition-colors" title="Log Out">
                <LogOut size={22} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className="p-3 hover:bg-brand-tan/10 transition-colors">
              <User size={22} strokeWidth={1.5} />
            </button>
          )}
          
          <Link to="/cart" className="relative p-3 hover:bg-brand-tan/10 transition-colors border border-brand-tan/20 flex items-center gap-3">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Categories */}
      <div className="flex justify-center flex-wrap gap-x-12 gap-y-4 px-12 py-5 bg-white/40">
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
    </nav>
  );
};

export default Navbar;
