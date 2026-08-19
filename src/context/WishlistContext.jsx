import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { readStorage } from '../utils/helpers';

const WishlistContext = createContext(null);
const KEY = 'shrihari.wishlist';

export function WishlistProvider({ children }) {
  const { showToast } = useToast();
  const [ids, setIds] = useState(() => readStorage(KEY, []));

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const isInWishlist = (id) => ids.includes(id);

  const toggleWishlist = (product) => {
    const has = ids.includes(product.id);
    setIds((prev) => (has ? prev.filter((i) => i !== product.id) : [...prev, product.id]));
    showToast(
      has ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      has ? 'info' : 'success'
    );
  };

  const addToWishlist = (product) => {
    if (!ids.includes(product.id)) {
      setIds((prev) => [...prev, product.id]);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (id) => {
    setIds((prev) => prev.filter((i) => i !== id));
    showToast('Removed from wishlist', 'info');
  };

  return (
    <WishlistContext.Provider value={{ ids, isInWishlist, toggleWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
