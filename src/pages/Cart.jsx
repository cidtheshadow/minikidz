import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, CreditCard, ShieldCheck, X, CheckCircle2, Minus, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart, user, setIsAuthModalOpen, placeOrder } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paytm');
  const [loading, setLoading] = useState(false);

  const handleCheckoutInitiation = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleFinalCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Record the order in Supabase
      await placeOrder({ paymentMethod });
      
      // 2. Show simulation of gateway
      setTimeout(() => {
        setLoading(false);
        setIsCheckedOut(true);
      }, 2000);

    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Journal Entry Failed: " + err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0 && !isCheckedOut) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 py-40">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-brand-tan/10 w-40 h-40 rounded-none flex items-center justify-center border border-brand-tan/20">
          <ShoppingBag size={48} strokeWidth={1} className="text-brand-charcoal/20" />
        </motion.div>
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-serif text-brand-charcoal">Your bag is <i className="text-brand-gold italic text-6xl block">currently empty.</i></h2>
        </div>
        <Link to="/" className="btn-premium">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-12 py-40 grid lg:grid-cols-12 gap-24 items-start relative pt-40">
      <div className="lg:col-span-8 space-y-20">
        <div className="space-y-4">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.4em] block">Your Collection</span>
          <h1 className="text-6xl font-serif text-brand-charcoal leading-none tracking-tight">Shopping Bag <span className="text-brand-charcoal/20 text-4xl block mt-4 font-light italic">({cartCount} pieces curated)</span></h1>
        </div>
        <div className="space-y-12">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col md:row gap-12 items-center p-12 bg-white/40 border border-brand-tan/10 relative overflow-hidden group">
                <img src={item.image} alt={item.name} className="w-48 aspect-[3/4] object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 shadow-lg" />
                <div className="flex-grow space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif italic text-brand-charcoal">{item.name}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">{item.category}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-12">
                    <span className="text-2xl font-serif font-bold text-brand-forest">₹{item.price.toLocaleString()}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-brand-tan/30 bg-white/50 p-1">
                       <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all">
                          <Minus size={14} />
                       </button>
                       <span className="w-16 text-center font-serif text-xl font-bold">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-brand-charcoal hover:text-white transition-all">
                          <Plus size={14} />
                       </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="absolute top-6 right-6 text-brand-charcoal/20 hover:text-brand-pink transition-colors p-4">
                   <Trash2 size={24} strokeWidth={1.5} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <aside className="lg:col-span-4 sticky top-40 space-y-12">
        <div className="p-12 bg-brand-charcoal text-brand-tan space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="space-y-4">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] block">Summary</span>
            <h3 className="text-4xl font-serif text-brand-tan tracking-tighter">Order Narration</h3>
          </div>
          <div className="space-y-6 text-lg font-serif italic opacity-60">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between items-center text-brand-gold font-bold not-italic"><span>Crafted Shipping</span><span>FREE</span></div>
          </div>
          <div className="flex justify-between border-t border-brand-tan/10 pt-6 text-3xl font-bold not-italic text-brand-tan"><span>Total Price</span><span>₹{cartTotal.toLocaleString()}</span></div>
          <button onClick={handleCheckoutInitiation} className="w-full btn-premium !bg-brand-tan !text-brand-charcoal group flex items-center justify-center gap-6">
            Complete the Journal
            <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-3 transition-transform duration-500" />
          </button>
        </div>
      </aside>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-charcoal/90 backdrop-blur-md p-6">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-brand-cream w-full max-w-4xl border border-brand-tan/30 relative overflow-hidden">
              <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-10 right-10 z-10 text-brand-charcoal/30 hover:text-brand-charcoal transition-colors" disabled={isCheckedOut || loading}>
                 <X size={28} />
              </button>

              {isCheckedOut ? (
                <div className="text-center py-40 space-y-10 px-16 bg-white">
                   <div className="w-40 h-40 bg-brand-forest/10 rounded-full flex items-center justify-center mx-auto border-2 border-brand-forest/20">
                      <CheckCircle2 size={64} className="text-brand-forest" />
                   </div>
                   <h2 className="text-7xl font-serif text-brand-charcoal">Order <i className="text-brand-gold italic text-7xl block mt-4">Narrated.</i></h2>
                   <p className="text-2xl text-brand-charcoal/40 font-serif italic max-w-lg mx-auto">"Your artisanal selection is now being synchronised with our artisans."</p>
                   <Link to="/" onClick={() => setIsCheckedOut(false)} className="btn-premium inline-block">Return to Heritage Home</Link>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                  {/* Left Summary */}
                  <div className="lg:w-2/5 bg-brand-charcoal p-16 text-brand-tan flex flex-col justify-between">
                     <div className="space-y-12">
                         <h2 className="text-5xl font-serif tracking-tighter">Your Bag Selection.</h2>
                         <div className="space-y-6 opacity-40 font-serif italic text-lg leading-relaxed">
                          {cart.slice(0, 3).map(item => (
                            <div key={item.id} className="flex justify-between gap-4"><span>{item.name} x{item.quantity}</span><span>₹{(item.price * item.quantity).toLocaleString()}</span></div>
                          ))}
                          {cart.length > 3 && <div className="text-sm">+ {cart.length - 3} more stories</div>}
                        </div>
                     </div>
                     <div className="pt-10 border-t border-brand-tan/10 space-y-4">
                        <div className="flex justify-between items-center text-3xl font-bold"><span>Total Price</span><span className="text-brand-gold">₹{cartTotal.toLocaleString()}</span></div>
                     </div>
                  </div>

                  {/* Right Payment Options */}
                  <div className="lg:w-3/5 p-16 space-y-12 bg-white flex flex-col justify-center">
                     <div className="space-y-4"><h3 className="text-4xl font-serif text-brand-charcoal tracking-tight">Select <i className="text-brand-forest italic">Payment Signature</i>.</h3></div>
                     <div className="space-y-6">
                        <PaymentOption id="paytm" icon={<img src="https://asset.brandfetch.io/idfS-LzX9S/idYyqP-pIs.png" alt="Paytm" className="h-6" />} label="Paytm Gateway" subLabel="UPI, Wallets, Cards" isPreferred isActive={paymentMethod === 'paytm'} onClick={() => setPaymentMethod('paytm')} />
                        <PaymentOption id="card" icon={<CreditCard size={28} />} label="Direct Credit/Debit" subLabel="Visa, Mastercard, Amex" isActive={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
                     </div>
                     <form onSubmit={handleFinalCheckout} className="pt-10">
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full btn-premium flex items-center justify-center gap-6 group py-8 disabled:opacity-50"
                        >
                          {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                              Complete Purchase
                              <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform" />
                            </>
                          )}
                        </button>
                        <p className="text-center text-[9px] font-bold tracking-[0.4em] opacity-20 mt-12 uppercase">Securely stored via Supabase Channels</p>
                     </form>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PaymentOption = ({ isActive, onClick, icon, label, subLabel, isPreferred }) => (
  <div onClick={onClick} className={`p-8 border-2 cursor-pointer transition-all duration-500 relative group overflow-hidden ${isActive ? 'border-brand-gold bg-[#F9F7F2]' : 'border-brand-tan/20 hover:border-brand-gold'}`}>
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-6">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-brand-gold bg-brand-gold' : 'border-brand-tan/30'}`}>{isActive && <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
        <div className="space-y-1">{icon}<p className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">{subLabel}</p></div>
      </div>
      {isPreferred && <span className="text-[9px] bg-brand-gold/10 text-brand-gold font-bold px-3 py-1 uppercase tracking-widest rounded-full">PREFERRED</span>}
    </div>
  </div>
);

export default Cart;
