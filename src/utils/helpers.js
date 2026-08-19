import { products } from '../data/products';

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

export const discountPercent = (price, originalPrice) =>
  originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const getProduct = (id) => products.find((p) => String(p.id) === String(id));

export const relatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

export const COLOR_HEX = {
  Black: '#1f2937',
  White: '#ffffff',
  Silver: '#cbd5e1',
  Gold: '#eab308',
  Rose: '#f43f5e',
  'Midnight Blue': '#1e3a8a',
  Teal: '#0d9488',
  Coral: '#fb7185',
  Graphite: '#374151',
  'Light Blue': '#93c5fd',
  'Dark Indigo': '#312e81',
  'Heather Grey': '#94a3b8',
  Charcoal: '#334155',
  Navy: '#1e293b',
  Sage: '#a3b18a',
  Sand: '#d6c3a5',
  'Sky Blue': '#7dd3fc',
  Tan: '#d2a679',
  Brown: '#8b5e3c',
  Grey: '#6b7280',
  Olive: '#6b7f3e',
  Blue: '#2563eb',
  Green: '#16a34a',
  Pink: '#ec4899',
  'Rose Gold': '#b76e79',
  Tortoise: '#a9713c',
  Steel: '#64748b',
};

export const colorHex = (name) => COLOR_HEX[name] || '#94a3b8';

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
