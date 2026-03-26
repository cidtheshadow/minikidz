import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';

const Category = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const categoryProducts = products.filter(p => p.category.toLowerCase() === id.toLowerCase() || id === 'all');
  const filteredProducts = filter === 'all' 
    ? categoryProducts 
    : categoryProducts.filter(p => (p.subcategory || '').toLowerCase() === filter.toLowerCase());

  const subcategories = [...new Set(categoryProducts.map(p => p.subcategory).filter(Boolean))];

  return (
    <div className="min-h-screen bg-brand-cream pt-40 lg:pt-56 pb-40 px-6 lg:px-12">
      {/* Category Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 lg:space-y-8">
           <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.34em] text-brand-charcoal/40">
             <Link to="/" className="hover:text-brand-gold transition-colors">Heritage Home</Link>
             <ChevronRight size={14} strokeWidth={1} className="opacity-40" />
             <span className="text-brand-gold italic">{id} curated collection</span>
           </div>
           
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-0">
             <div className="space-y-4 lg:space-y-6">
                <h1 className="text-5xl lg:text-9xl font-serif text-brand-charcoal tracking-tighter capitalize leading-none">{id} <i className="text-brand-gold italic block lg:inline text-4xl lg:text-[100px] mt-2 lg:mt-0">Stories.</i></h1>
                <p className="text-lg lg:text-2xl text-brand-charcoal/40 font-serif italic max-w-lg leading-relaxed">"Discover the artisanal charm of our hand-picked selection for little souls."</p>
             </div>
             
             {/* Filter Stats */}
             <div className="flex items-center gap-6 lg:gap-8 pb-4 border-b border-brand-tan/20">
                <div className="text-right">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30 block">Current Narrations</span>
                   <span className="text-3xl lg:text-4xl font-serif italic text-brand-charcoal">{filteredProducts.length}</span>
                </div>
                <ShoppingBag size={32} strokeWidth={0.5} className="text-brand-gold opacity-30" />
             </div>
           </div>
        </motion.div>

        {/* Dynamic Filters Bar */}
        <div className="sticky top-24 lg:top-36 z-40 py-6 lg:py-8 bg-brand-cream/80 backdrop-blur-md border-y border-brand-tan/10 overflow-x-auto">
          <div className="flex items-center gap-8 lg:gap-12 min-w-max">
            <button 
              onClick={() => setFilter('all')}
              className={`text-[10px] lg:text-xs font-bold uppercase tracking-[0.24em] transition-all relative group ${filter === 'all' ? 'text-brand-charcoal' : 'text-brand-charcoal/40 hover:text-brand-charcoal'}`}
            >
              The Full Story
              <span className={`absolute -bottom-2 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full ${filter === 'all' ? 'w-full' : ''}`}></span>
            </button>
            
            {subcategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setFilter(sub)}
                className={`text-[10px] lg:text-xs font-bold uppercase tracking-[0.24em] transition-all relative group ${filter === sub ? 'text-brand-charcoal' : 'text-brand-charcoal/40 hover:text-brand-charcoal'}`}
              >
                {sub}
                <span className={`absolute -bottom-2 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full ${filter === sub ? 'w-full' : ''}`}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24 mt-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, index) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'circOut' }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center space-y-8">
             <Loader2 className="animate-spin text-brand-gold mx-auto" size={48} strokeWidth={1} />
             <p className="text-2xl font-serif italic text-brand-charcoal/40">Searching for new artisanal narrations...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
