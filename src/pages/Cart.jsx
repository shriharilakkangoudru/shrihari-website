import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/helpers';

const FREE_SHIPPING_THRESHOLD = 99;

export default function Cart() {
  const { items, subtotal, discountAmount, shipping, total, coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');

  const apply = (e) => {
    e.preventDefault();
    if (applyCoupon(code)) setCode('');
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-600">
          <ShoppingBag size={36} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Looks like you haven&apos;t added anything yet. Explore our collection and find something you love.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
        >
          Start shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Shopping Cart{' '}
        <span className="text-base font-semibold text-slate-400">
          ({items.length} {items.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.key} item={item} />
          ))}
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition hover:text-primary-700">
            <ArrowRight size={15} className="rotate-180" /> Continue shopping
          </Link>
        </div>

        <div className="h-fit space-y-4 lg:sticky lg:top-36">
          {remaining > 0 ? (
            <div className="rounded-2xl bg-primary-50 p-4">
              <p className="text-sm font-medium text-primary-700">
                You&apos;re <span className="font-bold">{formatPrice(remaining)}</span> away from free shipping!
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-100">
                <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
              You&apos;ve unlocked free shipping!
            </div>
          )}

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <form onSubmit={apply} className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon code (try SHRIHARI10)"
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
              />
              <button
                type="submit"
                className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Apply
              </button>
            </form>
            {coupon && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Tag size={14} /> {coupon.code} applied
                </span>
                <button onClick={removeCoupon} className="text-emerald-700 transition hover:text-rose-600" aria-label="Remove coupon">
                  <X size={14} />
                </button>
              </div>
            )}

            <dl className="mt-5 space-y-3 border-t border-dashed border-slate-200 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Subtotal</dt>
                <dd className="font-semibold text-slate-900">{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <dt>Coupon discount</dt>
                  <dd className="font-semibold">-{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-slate-500">Shipping</dt>
                <dd className="font-semibold text-slate-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
                <dt className="font-bold text-slate-900">Total</dt>
                <dd className="font-extrabold text-slate-900">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Link
              to="/checkout"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400">Taxes calculated at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}