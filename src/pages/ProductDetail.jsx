import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingBag, ShieldCheck, Truck, RotateCcw, Minus, Plus, Heart, Share2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsAuthModalOpen, user } = useStore();
  const [selectedSize, setSelectedSize] = useState('6-12M');
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div className="min-h-screen pt-56 text-center text-4xl font-serif">Product narration not found.</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedSize, quantity });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 lg:pt-56 pb-40 px-6 lg:px-12 selection:bg-brand-gold selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb - Mobile Optimized */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-12 lg:mb-20 text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.34em] text-brand-charcoal/40">
           <Link to="/" className="hover:text-brand-gold transition-colors">Heritage Home</Link>
           <ChevronRight size={14} strokeWidth={1} />
           <Link to={`/category/${product.category}`} className="hover:text-brand-gold transition-colors">{product.category}</Link>
           <ChevronRight size={14} strokeWidth={1} />
           <span className="text-brand-gold italic">{product.name} narration</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-32 items-start relative">
          {/* Main Visual Imagery */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative aspect-[3/4] overflow-hidden group">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute top-10 right-10 flex flex-col gap-6 scale-75 lg:scale-100 origin-top-right">
                  <button className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-charcoal/40 hover:text-brand-pink transition-colors shadow-2xl-soft"><Heart size={24} /></button>
                  <button className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-charcoal/40 hover:text-brand-gold transition-colors shadow-2xl-soft"><Share2 size={24} /></button>
               </div>
            </motion.div>
            
            {/* Gallery Simulation - Mobile Scrollable */}
            <div className="flex gap-4 lg:grid lg:grid-cols-3 lg:gap-12 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="min-w-[200px] lg:min-w-0 aspect-[3/4] bg-white opacity-40 hover:opacity-100 transition-opacity cursor-pointer border border-brand-tan/10 overflow-hidden">
                    <img src={product.image} alt="Gallery view" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
            </div>
          </div>

          {/* Editorial Content Sidebar */}
          <aside className="lg:col-span-5 lg:sticky lg:top-56 space-y-12 lg:space-y-16">
            <div className="space-y-6 lg:space-y-8">
               <div className="space-y-2 lg:space-y-4">
                  <span className="text-brand-gold text-[10px] lg:text-sm font-bold uppercase tracking-[0.4em] block">Handcrafted Artisanal Piece</span>
                  <h1 className="text-5xl lg:text-8xl font-serif text-brand-charcoal leading-[1.1] tracking-tighter">{product.name}</h1>
                  <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] opacity-40">Style ID: MK-H24-{product.id}-ART</p>
               </div>
               
               <div className="flex items-end gap-6 border-b border-brand-tan/10 pb-8 lg:pb-10">
                  <span className="text-4xl lg:text-6xl font-serif font-bold text-brand-forest">₹{product.price.toLocaleString()}</span>
                  <span className="text-lg lg:text-xl font-serif italic text-brand-charcoal/20 line-through">₹{(product.price * 1.4).toLocaleString()}</span>
               </div>
            </div>

            <div className="space-y-12">
               {/* Size Selection */}
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Select Growth Stage</span>
                     <button className="text-[9px] font-bold uppercase text-brand-gold border-b border-brand-gold/20 tracking-widest pb-1">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                     {['0-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y'].map(size => (
                       <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-8 py-4 text-[11px] font-bold tracking-widest border transition-all duration-500 uppercase ${selectedSize === size ? 'bg-brand-charcoal text-brand-tan border-brand-charcoal' : 'bg-transparent text-brand-charcoal/40 border-brand-tan/20 hover:border-brand-gold'}`}
                       >
                        {size}
                       </button>
                     ))}
                  </div>
               </div>

               {/* Quantity Selector - Mobile Friendly */}
               <div className="space-y-6 pt-4 border-t border-brand-tan/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Quantity Curated</span>
                  <div className="flex items-center gap-12 w-fit bg-brand-cream border border-brand-tan/20 p-2">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-white hover:text-brand-pink transition-colors"><Minus size={18} /></button>
                     <span className="text-3xl font-serif italic font-bold w-12 text-center">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-brand-charcoal hover:text-white transition-colors"><Plus size={18} /></button>
                  </div>
               </div>

               {/* CTA Section */}
               <div className="flex flex-col gap-6 pt-10 border-t border-brand-tan/10">
                  <button onClick={handleAddToCart} className="btn-premium w-full py-8 text-lg flex items-center justify-center gap-6 group relative overflow-hidden">
                     <AnimatePresence mode="wait">
                       {isAdded ? (
                         <motion.div key="added" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-4 text-brand-forest">
                            <ShieldCheck size={28} /> Added to Journal
                         </motion.div>
                       ) : (
                         <motion.div key="idle" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-4">
                            Add to Shopping Bag <ChevronRight className="group-hover:translate-x-4 transition-transform duration-500" />
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </button>
                  <button onClick={handleBuyNow} className="w-full bg-brand-charcoal text-brand-tan flex items-center justify-center py-8 text-sm font-bold uppercase tracking-[0.4em] hover:bg-brand-gold transition-colors duration-700">Instant Checkout</button>
               </div>

               {/* Assurances - Responsive Icons */}
               <div className="grid grid-cols-2 lg:grid-cols-1 gap-10 pt-10 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal opacity-40">
                  <div className="flex items-center gap-6 group"><div className="w-14 h-14 rounded-full border border-brand-tan/20 flex items-center justify-center group-hover:border-brand-gold transition-colors"><Truck size={24} strokeWidth={1} /></div><span>Complimentary Global Delivery</span></div>
                  <div className="flex items-center gap-6 group"><div className="w-14 h-14 rounded-full border border-brand-tan/20 flex items-center justify-center group-hover:border-brand-gold transition-colors"><RotateCcw size={24} strokeWidth={1} /></div><span>30-Day Heritage Return Policy</span></div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
