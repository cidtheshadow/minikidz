import React from 'react';
import { motion } from 'framer-motion';

const Story = () => {
  return (
    <main className="max-w-7xl mx-auto px-12 py-40 space-y-40 bg-brand-cream h-min-screen">
      <div className="text-center space-y-12">
         <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] block">Our Journey</span>
         <h1 className="text-8xl lg:text-[180px] font-serif text-brand-charcoal leading-none tracking-tighter">
           Our <br />
           <i className="text-brand-forest italic">Spirit</i>.
         </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-40 items-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="relative aspect-[4/5] overflow-hidden"
         >
           <img 
             src="https://res.cloudinary.com/dhlwdk8xd/image/upload/v1755932209/2820_rzpv4w.jpg" 
             alt="The Spirit" 
             className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 origin-center"
           />
           <div className="absolute inset-0 border-[32px] border-brand-charcoal/30 pointer-events-none"></div>
         </motion.div>

         <div className="space-y-16 max-w-xl">
           <h2 className="text-5xl font-serif text-brand-charcoal leading-tight">
             "Where tradition meets <br /><i className="text-brand-gold italic">modern play</i>."
           </h2>
           <div className="space-y-10 text-xl font-serif font-light text-brand-charcoal/60 leading-relaxed italic border-l-2 border-brand-tan/10 pl-12">
             <p>
               MiniKidZz was born out of a desire to see children wrapped in the soul of India. We believe every garment is a journal entry in a child's story.
             </p>
             <p>
               From the hand-carved blocks used for our Ajrakh prints to the organic cotton sourced from sustainable soils, we ensure quality that lasts for generations to come.
             </p>
           </div>
           
           <div className="pt-10 flex gap-12 border-t border-brand-tan/10">
              <div className="text-center space-y-2">
                 <span className="text-brand-gold font-bold text-4xl font-serif">500+</span>
                 <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">ARTISANS ENROLLED</p>
              </div>
              <div className="text-center space-y-2">
                 <span className="text-brand-gold font-bold text-4xl font-serif">100%</span>
                 <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">ORGANIC FIBERS</p>
              </div>
           </div>
         </div>
      </div>
    </main>
  );
};

export default Story;
