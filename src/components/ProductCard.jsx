import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import RatingStars from './RatingStars';
import { discountPercent, formatPrice } from '../utils/helpers';

const TAG_LABELS = { trending: 'Trending', bestSeller: 'Best Seller', new: 'New' };

const TAG_COLORS = {
  trending: 'bg-amber-500',
  bestSeller: 'bg-primary-600',
  new: 'bg-emerald-500',
};

export default function ProductCard({ product, showQuickAdd = true }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const wished = isInWishlist(product.id);
  const discount = discountPercent(product.price, product.originalPrice);
  const primaryTag = (product.tags || []).find((t) => TAG_LABELS[t]);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative aspect-[4/5] cursor-pointer overflow-hidden bg-slate-100"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-rose-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
            -{discount}%
          </span>
        )}
        {primaryTag && (
          <span
            className={`absolute left-3 ${
              discount > 0 ? 'top-12' : 'top-3'
            } rounded-lg px-2 py-1 text-xs font-bold text-white shadow-sm ${TAG_COLORS[primaryTag]}`}
          >
            {TAG_LABELS[primaryTag]}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${
            wished ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
          }`}
        >
          <Heart size={18} className={wished ? 'fill-current' : ''} />
        </button>
        {showQuickAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, {});
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-center gap-2 rounded-xl bg-slate-900/90 py-2.5 text-sm font-semibold text-white opacity-100 backdrop-blur transition-all duration-300 hover:bg-primary-600 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link to={`/product/${product.id}`} className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {product.brand}
        </Link>
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800 transition hover:text-primary-600"
        >
          {product.name}
        </Link>
        <RatingStars rating={product.rating} size={14} />
        <div className="mt-auto flex items-end justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {!showQuickAdd && (
            <button
              onClick={() => addToCart(product, {})}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white transition hover:bg-primary-700"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}