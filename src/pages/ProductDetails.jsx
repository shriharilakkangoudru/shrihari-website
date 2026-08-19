import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import QuantitySelector from '../components/QuantitySelector';
import SectionHeading from '../components/SectionHeading';
import { colorHex, discountPercent, formatPrice, getProduct, relatedProducts } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const PERKS = [
  { Icon: Truck, title: 'Free shipping', text: 'On orders over $99' },
  { Icon: RotateCcw, title: 'Easy returns', text: '30-day money back' },
  { Icon: ShieldCheck, title: 'Secure checkout', text: 'Protected payments' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;
    setActiveImage(0);
    setColor(product.colors[0] ?? null);
    setSize(product.sizes[0] ?? null);
    setQty(1);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Product not found</h1>
        <p className="mt-2 text-sm text-slate-500">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = discountPercent(product.price, product.originalPrice);
  const wished = isInWishlist(product.id);
  const related = relatedProducts(product, 4);

  const handleAddToCart = () => addToCart(product, { color, size, quantity: qty });
  const handleBuyNow = () => {
    addToCart(product, { color, size, quantity: qty, notify: false });
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link to="/" className="transition hover:text-primary-600">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="transition hover:text-primary-600">
          Shop
        </Link>
        <ChevronRight size={14} />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="transition hover:text-primary-600">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="line-clamp-1 font-medium text-slate-800">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
            <img
              key={product.images[activeImage]}
              src={product.images[activeImage]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImage === i ? 'border-primary-600' : 'border-transparent hover:border-slate-200'
                  }`}
                >
                  <img src={img} alt="" className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{product.brand}</p>
          <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RatingStars rating={product.rating} size={16} showValue count={product.ratingCount} />
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {product.stock > 10 ? 'In stock' : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="rounded-lg bg-rose-100 px-2 py-1 text-xs font-bold text-rose-600">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-slate-600">{product.description}</p>

          {product.features.length > 0 && (
            <ul className="mt-4 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={15} className="shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
          )}

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">
                Color: <span className="font-medium text-slate-500">{color || 'Select'}</span>
              </p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    title={c}
                    style={{ backgroundColor: colorHex(c) }}
                    className={`h-9 w-9 rounded-full border-2 transition ${
                      color === c
                        ? 'border-primary-600 ring-2 ring-primary-600/30'
                        : 'border-slate-200 hover:border-slate-400'
                    } ${c === 'White' ? 'border-slate-300' : ''}`}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">
                Size: <span className="font-medium text-slate-500">{size || 'Select'}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-[3.5rem] rounded-xl border px-3 text-sm font-semibold transition ${
                      size === s
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-primary-400 hover:text-primary-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                wished
                  ? 'border-rose-200 bg-rose-50 text-rose-500'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-rose-300 hover:text-rose-500'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} className={wished ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-primary-600 bg-white text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
            >
              <ShoppingBag size={17} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
            >
              <Zap size={17} /> Buy Now
            </button>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3">
            {PERKS.map(({ Icon, title, text }) => (
              <div key={title} className="flex items-center gap-2.5">
                <Icon size={18} className="shrink-0 text-primary-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{title}</p>
                  <p className="text-[11px] text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <BadgeCheck size={14} className="text-emerald-500" /> 100% authentic products from verified brands
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading title="You may also like" subtitle="Related products you might love" />
          <ProductGrid>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </section>
      )}
    </div>
  );
}