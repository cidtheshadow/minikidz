import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-brand-cream overflow-hidden pt-32 lg:pt-20">
      {/* Editorial Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        
        {/* Storytelling Text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="order-2 lg:order-1 lg:col-span-5 z-10 space-y-10 lg:space-y-12"
        >
          <div className="space-y-4">
             <span className="text-brand-gold text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] block">Modern Heritage</span>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-brand-charcoal leading-[1.1] lg:leading-[0.95] tracking-tighter">
               Every child is <br />
               <i className="text-brand-forest italic">Little Star</i>.
             </h1>
          </div>
          
          <div className="space-y-10">
            <p className="text-lg lg:text-2xl text-brand-charcoal/60 leading-relaxed font-light font-serif italic max-w-sm lg:max-w-md">
              "Curating the magic of childhood through artisanal crafts and heritage stories."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-10">
              <Link to="/category/kids" className="btn-premium flex items-center justify-center gap-4 group text-center py-6">
                Shop The Collection
                <svg className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-3 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/story" className="text-brand-charcoal font-bold text-[11px] lg:text-sm uppercase tracking-[0.2em] self-center hover:text-brand-gold relative group transition-colors inline-block">
                Our Craft Story
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Cinematic Imagery */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="order-1 lg:order-2 lg:col-span-7 relative"
        >
          {/* Main Hero Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-none shadow-2xl-soft">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 5 }}
              src="https://res.cloudinary.com/dhlwdk8xd/image/upload/v1755794191/2210a_kunagb.jpg" 
              alt="Kids Heritage Fashion" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent"></div>
          </div>

          {/* Secondary Floating Image */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="absolute -bottom-10 lg:-bottom-20 -left-10 lg:-left-20 w-1/2 aspect-[3/4] overflow-hidden border-4 lg:border-8 border-brand-cream shadow-2xl z-20"
          >
            <img 
              src="https://res.cloudinary.com/dhlwdk8xd/image/upload/v1756037838/2612a_t9o7iq.jpg" 
              alt="Craft Detail" 
              className="w-full h-full object-cover grayscale-[0.3]"
            />
          </motion.div>

          {/* Label Tag */}
          <div className="absolute top-10 lg:top-20 -right-4 lg:-right-10 bg-brand-gold text-brand-charcoal px-6 lg:px-8 py-2 lg:py-3 font-serif italic text-sm lg:text-lg shadow-xl -rotate-12 z-10">
            Artisanal Ajrakh '24
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Text */}
      <div className="absolute bottom-5 lg:bottom-10 left-6 lg:left-12 text-[60px] md:text-[100px] lg:text-[140px] font-serif text-brand-charcoal/5 pointer-events-none select-none overflow-hidden whitespace-nowrap">
        HERITAGE CRAFT STORIES
      </div>
    </section>
  );
};

export default Hero;
