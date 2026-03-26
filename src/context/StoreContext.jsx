import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setIsAuthModalOpen(false);
      }
      setAuthLoading(false);
    });

    // 2. Auth State Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthModalOpen(false);
      } else {
        setUser(null);
      }
    });

    // 3. Cart Persistence Sync
    const savedCart = localStorage.getItem('minikidzz_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('minikidzz_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // PLACE ORDER IN SUPABASE
  const placeOrder = async (orderDetails) => {
    if (!user) throw new Error("Auth Required to record narration.");

    try {
      const { data, error } = await supabase.from('orders').insert({
        user_id: user.id,
        items: cart,
        total: cartTotal,
        payment_method: orderDetails.paymentMethod,
        status: 'completed'
      });
      if (error) throw error;
      clearCart();
      return data;
    } catch (err) {
      console.error("Order Record Error:", err);
      throw err;
    }
  };

  // SUPABASE LOGIN
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin || 'http://localhost:5173'
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Supabase OAuth Error:", err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      console.error("Signout Error:", err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      user, authLoading, loginWithGoogle, logout, placeOrder,
      isAuthModalOpen, setIsAuthModalOpen
    }}>
      {children}
    </StoreContext.Provider>
  );
};
