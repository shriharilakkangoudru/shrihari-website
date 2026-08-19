import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import { formatPrice } from '../utils/helpers';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
      <Link
        to={`/product/${item.productId}`}
        className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100"
      >
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${item.productId}`}
              className="line-clamp-2 text-sm font-semibold text-slate-800 transition hover:text-primary-600"
            >
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-slate-400">{item.brand}</p>
            {(item.color || item.size) && (
              <p className="mt-1 text-xs text-slate-500">
                {item.color && <span>Color: {item.color}</span>}
                {item.color && item.size && ' · '}
                {item.size && <span>Size: {item.size}</span>}
              </p>
            )}
          </div>
          <button
            onClick={() => removeFromCart(item.key)}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantitySelector value={item.quantity} onChange={(v) => updateQuantity(item.key, v)} size="sm" />
          <div className="text-right">
            <p className="text-base font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
            <p className="text-xs text-slate-400">{formatPrice(item.price)} each</p>
          </div>
        </div>
      </div>
    </div>
  );
}