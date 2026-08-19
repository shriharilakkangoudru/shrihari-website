import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { ids } = useWishlist();
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-500">
          <Heart size={36} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Your wishlist is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
        >
          Discover products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        My Wishlist{' '}
        <span className="text-base font-semibold text-slate-400">
          ({wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'})
        </span>
      </h1>
      <div className="mt-6">
        <ProductGrid>
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      </div>
    </div>
  );
}