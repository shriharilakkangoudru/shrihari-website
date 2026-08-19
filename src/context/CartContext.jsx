import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useToast } from './ToastContext';
import { COUPONS } from '../data/coupons';
import { readStorage } from '../utils/helpers';

const CartContext = createContext(null);
const CART_KEY = 'shrihari.cart';
const COUPON_KEY = 'shrihari.coupon';

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));
  const [coupon, setCoupon] = useState(() => readStorage(COUPON_KEY, null));

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
  }, [coupon]);

  const itemKey = (product, color, size) => `${product.id}__${color || 'default'}__${size || 'default'}`;

  const addToCart = (product, { color, size, quantity = 1, notify = true } = {}) => {
    const key = itemKey(product, color, size);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.key === key);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: Math.min(next[idx].quantity + quantity, 10) };
        return next;
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          color: color || null,
          size: size || null,
          quantity,
        },
      ];
    });
    if (notify) showToast(`${product.name} added to cart`, 'success');
  };

  const updateQuantity = (key, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) } : i))
    );
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return subtotal * (coupon.value / 100);
    if (coupon.type === 'fixed') return coupon.value;
    return 0;
  }, [coupon, subtotal]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    if (coupon?.type === 'shipping') return 0;
    return subtotal - discountAmount >= 99 ? 0 : 9.99;
  }, [items, coupon, subtotal, discountAmount]);

  const total = subtotal - discountAmount + shipping;

  const applyCoupon = (code) => {
    const found = COUPONS.find((c) => c.code === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code', 'error');
      return false;
    }
    if (coupon?.code === found.code) {
      showToast('Coupon already applied', 'info');
      return false;
    }
    setCoupon(found);
    showToast(`Coupon ${found.code} applied — ${found.label.toLowerCase()}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    itemCount,
    discountAmount,
    shipping,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
