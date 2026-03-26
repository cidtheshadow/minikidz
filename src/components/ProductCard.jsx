import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useStore();
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="group bg-brand-cream overflow-hidden border border-brand-tan/10"
    >
      <div className="aspect-[3/4] overflow-hidden relative mb-8 border-b border-brand-tan/10 rounded-none cursor-pointer"
           onClick={() => navigate(`/product/${product.id}`)}>
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.1] group-hover:grayscale-0 shadow-sm"
        />
        
        {/* Editorial-style Labels */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
           <span className="bg-brand-charcoal text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-none">
            {product.category}
          </span>
          <span className="bg-brand-gold text-brand-charcoal text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-none shadow-lx">
            {product.subCategory}
          </span>
        </div>

        {/* Action Bar */}
        <div className="absolute inset-x-0 bottom-0 p-8 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-brand-cream/95 to-transparent backdrop-blur-sm z-10"
             onClick={(e) => e.stopPropagation()}>
           <button 
             onClick={() => addToCart(product)}
             className="w-12 h-12 bg-brand-charcoal text-white flex items-center justify-center hover:bg-brand-gold transition-colors duration-300"
           >
             <ShoppingBag size={20} strokeWidth={1.5} />
           </button>
           <button 
             onClick={() => navigate(`/product/${product.id}`)}
             className="w-12 h-12 bg-white text-brand-charcoal flex items-center justify-center border border-brand-tan/30 hover:bg-brand-charcoal hover:text-white transition-all duration-300"
           >
             <Eye size={20} strokeWidth={1.5} />
           </button>
           <button className="w-12 h-12 bg-white text-brand-charcoal flex items-center justify-center border border-brand-tan/30 hover:text-brand-pink transition-all duration-300">
             <Heart size={20} strokeWidth={1.5} />
           </button>
        </div>
      </div>

      <div className="px-2 text-center pb-8 space-y-3">
        <Link to={`/product/${product.id}`} className="font-serif italic text-2xl text-brand-charcoal hover:text-brand-gold transition-colors duration-500 block">
          {product.name}
        </Link>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
             <span className="text-brand-forest font-bold text-xl tracking-tight">₹{product.price.toLocaleString()}</span>
             {product.originalPrice > product.price && (
               <span className="text-sm text-brand-charcoal/30 line-through font-light tracking-tight">₹{product.originalPrice.toLocaleString()}</span>
             )}
          </div>
          <span className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.25em] block">Journal Selection</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
