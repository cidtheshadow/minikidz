import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, ShoppingBag } from 'lucide-react';

const Category = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Clean up ID for display
  const categoryTitle = id ? id.replace('-', ' & ').toUpperCase() : 'COLLECTION';

  const filteredProducts = products.filter(p => {
    // Basic Category Filter (by URL)
    const categoryMatch = id === 'all' || p.category.toLowerCase().includes(id.toLowerCase()) || p.subCategory.toLowerCase().includes(id.toLowerCase());
    
    // Sub-Filter (by UI buttons)
    if (activeFilter === 'All') return categoryMatch;
    return categoryMatch && (p.category === activeFilter || p.subCategory === activeFilter);
  });

  return (
    <main className="max-w-7xl mx-auto px-12 py-40 space-y-32 min-h-screen pt-40">
      <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 border-b border-brand-tan/10 pb-20">
         <div className="space-y-6">
           <nav className="text-[10px] uppercase font-bold tracking-[0.4em] text-brand-charcoal/20 flex gap-4">
              <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-brand-gold">Narration</span>
           </nav>
           <h1 className="text-8xl lg:text-[140px] font-serif text-brand-charcoal leading-[0.85] tracking-tight">
             {categoryTitle} <br />
             <i className="text-brand-forest italic text-5xl mt-8 block lg:inline">— Heritage Curation</i>
           </h1>
         </div>
         
         <div className="flex flex-wrap gap-x-12 gap-y-6 text-[11px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/40">
            {['All', 'Traditionals', 'Boys', 'Newborn'].map(filter => (
               <button 
                key={filter}
                onClick={() => setActiveFilter(filter)} 
                className={`hover:text-brand-gold transition-all relative group py-2 ${activeFilter === filter ? 'text-brand-gold' : ''}`}
               >
                 {filter === 'All' ? 'Whole Narration' : filter}
                 <span className={`absolute bottom-0 left-0 h-px bg-brand-gold transition-all duration-500 ${activeFilter === filter ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
               </button>
            ))}
         </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center py-60 space-y-12 border border-brand-tan/10 bg-brand-tan/5">
            <ShoppingBag size={64} strokeWidth={0.5} className="text-brand-charcoal/10" />
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-serif italic text-brand-charcoal/40 tracking-tight">"A story yet to be written for {categoryTitle}."</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">The Artisans are still crafting this narrative</p>
            </div>
            <button onClick={() => setActiveFilter('All')} className="btn-premium">Return To Archive</button>
         </div>
      )}
    </main>
  );
};

export default Category;
