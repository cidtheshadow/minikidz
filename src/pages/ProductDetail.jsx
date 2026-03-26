import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Share2, Heart, Scale, ArrowRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const [selectedSize, setSelectedSize] = useState('6-12M');
  const [added, setAdded] = useState(false);

  const sizes = ['0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y'];

  const handleAddToBag = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <main className="max-w-7xl mx-auto px-12 py-40 grid lg:grid-cols-2 gap-40 items-start overflow-hidden pt-40">
      {/* Product Gallery */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-12 gap-10 sticky top-40"
      >
        <div className="col-span-2 space-y-10">
          <GalleryThumb src={product.image} isActive />
          <GalleryThumb />
          <GalleryThumb />
        </div>
        <div className="col-span-10 relative overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[800px] object-cover grayscale-[0.2] transition-all duration-1000 origin-center group-hover:scale-105 border border-brand-tan/10"
          />
          <div className="absolute top-10 right-10 bg-brand-gold text-brand-charcoal px-8 py-3 font-serif italic text-lg shadow-2xl -rotate-12">
            Heritage Piece
          </div>
        </div>
      </motion.div>

      {/* Product Info */}
      <div className="space-y-16">
        <nav className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.4em] text-brand-charcoal/20">
          <Link to="/" className="hover:text-brand-gold transition-colors">Heritage</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-brand-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-brand-charcoal/60">{product.name}</span>
        </nav>

        <div className="space-y-6">
           <div className="flex justify-between items-baseline mb-4">
             <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] block">{product.category} Journey</span>
             <div className="flex text-brand-gold gap-1">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
             </div>
           </div>
           
           <h1 className="text-6xl lg:text-8xl font-serif text-brand-charcoal leading-none tracking-tight">
             {product.name} <br />
             <i className="text-brand-forest italic text-4xl mt-6 block">— Premium Spun Selection</i>
           </h1>

           <div className="flex items-center gap-10 pt-4">
              <span className="text-5xl font-serif font-bold text-brand-charcoal">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <div className="flex items-center gap-4 text-brand-charcoal/30">
                  <span className="text-2xl line-through font-light italic">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-brand-gold/10 text-brand-gold text-[10px] font-bold px-3 py-1 uppercase tracking-widest text-[#C5A059]">SALE</span>
                </div>
              )}
           </div>
        </div>

        <p className="text-xl text-brand-charcoal/60 leading-relaxed font-serif font-light italic border-l-2 border-brand-tan/10 pl-10 max-w-md">
          "{product.description || 'Artisanally curated for the little stories of tomorrow. Woven with history and modern love.'}"
        </p>

        {/* Size Selection */}
        <div className="space-y-10">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.4em] text-brand-charcoal/40">
             <span>Narrative Size</span>
             <button className="text-brand-gold font-bold underline decoration-offset-4 flex items-center gap-2">
               <Scale size={14} /> Size Guide
             </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {sizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-10 py-5 font-serif italic text-2xl border transition-all duration-300 ${selectedSize === size ? 'bg-brand-charcoal text-white border-brand-charcoal -translate-y-2' : 'border-brand-tan/20 text-brand-charcoal hover:border-brand-gold hover:text-brand-gold hover:-translate-y-1'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions - UPDATED TO WORK */}
        <div className="flex flex-col sm:flex-row gap-8 pt-10">
          <button 
            onClick={handleAddToBag}
            className={`flex-grow btn-premium group flex items-center justify-center gap-6 transition-all duration-500 ${added ? '!bg-brand-forest !border-brand-forest' : '!bg-brand-charcoal'}`}
          >
            {added ? 'Added to Story' : 'Add To Bag'}
            <ShoppingBag size={24} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-grow btn-premium !bg-brand-gold !text-brand-charcoal hover:!bg-brand-charcoal hover:!text-white group flex items-center justify-center gap-6"
          >
            Instant Checkout
            <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </div>

        {/* Heritage Story Details */}
        <div className="pt-24 border-t border-brand-tan/10 grid grid-cols-2 gap-x-20 gap-y-16">
           <DetailIcon icon="✨" title="Hand-Finished" desc="Artisanal touch on every thread." />
           <DetailIcon icon="🌱" title="100% Organic" desc="Safe for sensitive skin." />
        </div>
      </div>
    </main>
  );
};

const GalleryThumb = ({ src, isActive }) => (
  <div className={`aspect-square overflow-hidden cursor-pointer transition-all duration-500 border-2 ${isActive ? 'border-brand-gold grayscale-0 shadow-lg' : 'border-brand-tan/10 opacity-40 hover:opacity-100 hover:scale-105'}`}>
    <img src={src || "https://res.cloudinary.com/dhlwdk8xd/image/upload/v1755793749/1004_bjhurz.jpg"} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0" />
  </div>
);

const DetailIcon = ({ icon, title, desc }) => (
  <div className="space-y-3">
    <div className="text-3xl">{icon}</div>
    <h4 className="font-serif italic text-xl text-brand-charcoal">{title}</h4>
    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-charcoal/30 leading-relaxed">{desc}</p>
  </div>
);

export default ProductDetail;
