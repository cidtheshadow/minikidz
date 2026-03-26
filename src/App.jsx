import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { StoreProvider } from './context/StoreContext';
import { AnimatePresence, motion } from 'framer-motion';

import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Story from './pages/Story';
import AuthModal from './components/auth/AuthModal';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-charcoal selection:bg-brand-gold selection:text-white">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AuthModal />

      <footer className="bg-brand-charcoal text-brand-tan py-40 px-12 relative overflow-hidden mt-40">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-24 text-center">
          <Link to="/" className="text-7xl lg:text-9xl font-serif text-brand-tan tracking-tighter hover:text-brand-gold transition-colors">MiniKidZz</Link>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 text-xs font-bold uppercase tracking-[0.4em] opacity-40">
            <Link to="/story" className="hover:opacity-100 hover:text-brand-gold transition-all">Heritage Story</Link>
            <Link to="/category/kids" className="hover:opacity-100 hover:text-brand-gold transition-all">Collections</Link>
            <Link to="/cart" className="hover:opacity-100 hover:text-brand-gold transition-all">Shopping Bag</Link>
            <a href="#" className="hover:opacity-100 hover:text-brand-gold transition-all">Support Journal</a>
          </div>
          <p className="text-xs opacity-20 tracking-widest text-[#E8DCC4]">© 2024 MiniKidZz. Modern Heritage Kids Fashion.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/story" element={<Story />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
