import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <Hero />

      {/* Curation Highlight */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="flex flex-col lg:flex-row items-baseline justify-between mb-20 lg:mb-32 gap-12"
        >
          <div className="space-y-6 text-left">
            <span className="text-brand-gold text-[10px] lg:text-xs font-bold uppercase tracking-[0.4em] block translate-y-2">Curated With Love</span>
            <h2 className="text-5xl lg:text-9xl font-serif text-brand-charcoal leading-none tracking-tight">
              Crafted <br />
              <i className="text-brand-forest italic">By Heritage</i>.
            </h2>
          </div>
          
          <div className="space-y-12 max-w-sm text-left lg:text-right">
            <p className="text-xl lg:text-2xl text-brand-charcoal/50 font-serif italic leading-relaxed">
              "Our collections are more than just clothing; they are stories woven into fabrics."
            </p>
            <div className="flex gap-8 border-t border-brand-tan/30 pt-8 justify-start lg:justify-end">
               <Link to="/category/newborn" className="text-brand-charcoal font-bold text-[10px] lg:text-xs uppercase tracking-[0.2em] relative group hover:text-brand-gold transition-colors">
                  New Arrivals
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
               </Link>
               <Link to="/category/winter" className="text-brand-charcoal font-bold text-[10px] lg:text-xs uppercase tracking-[0.2em] relative group hover:text-brand-gold transition-colors">
                  Winter '24
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
               </Link>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-24">
          {products.slice(0, 8).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-brand-charcoal py-24 lg:py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 lg:space-y-16 order-2 lg:order-1"
          >
             <div className="space-y-6">
               <span className="text-brand-gold text-[10px] lg:text-xs font-bold uppercase tracking-[0.5em] block">Our Origins</span>
               <h2 className="text-5xl lg:text-9xl font-serif text-brand-tan leading-none">
                 Woven in <br />
                 <i className="text-brand-gold italic text-5xl lg:text-9xl block mt-4">History</i>.
               </h2>
             </div>
             <p className="text-lg lg:text-xl text-brand-tan/60 font-serif font-light leading-relaxed max-w-lg">
                MiniKidZz stems from a deep-rooted love for traditional Indian textiles and the contemporary needs of a modern childhood.
             </p>
             <Link to="/story" className="btn-premium !bg-brand-tan !text-brand-charcoal inline-block text-center w-full sm:w-auto">
                Read Our Story
             </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
             <img 
               src="https://res.cloudinary.com/dhlwdk8xd/image/upload/v1755932209/2820_rzpv4w.jpg" 
               alt="Story" 
               className="w-full h-[400px] lg:h-[600px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 border-4 border-brand-tan/10"
             />
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
