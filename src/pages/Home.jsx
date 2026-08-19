import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgePercent,
  Check,
  Flame,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  Quote,
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import Newsletter from '../components/Newsletter';
import RatingStars from '../components/RatingStars';
import { CATEGORY_META, products } from '../data/products';
import { customerReviews } from '../data/reviews';

const HERO_IMAGE = 'https://picsum.photos/seed/shrihari-hero/1200/1000';
const PROMO_IMAGE = 'https://picsum.photos/seed/shrihari-promo/1200/600';

const TRUST_ITEMS = [
  { Icon: Truck, title: 'Free Shipping', text: 'On all orders over $99' },
  { Icon: RotateCcw, title: 'Easy Returns', text: '30-day money back' },
  { Icon: ShieldCheck, title: 'Secure Payment', text: 'Encrypted checkout' },
  { Icon: Headphones, title: '24/7 Support', text: 'We are here to help' },
];

export default function Home() {
  const trending = products.filter((p) => p.tags.includes('trending')).slice(0, 8);
  const bestSellers = products.filter((p) => p.tags.includes('bestSeller')).slice(0, 8);
  const newArrivals = products
    .filter((p) => p.tags.includes('new'))
    .concat(products.filter((p) => !p.tags.includes('new')).slice(0, 4))
    .slice(0, 4);

  return (
    <div>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <TrendingSection products={trending} />
      <PromoBanner />
      <BestSellersSection products={bestSellers} />
      <NewArrivalsSection products={newArrivals} />
      <ReviewsSection />
      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-slate-50">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20 lg:px-8">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            <Sparkles size={14} /> New season collection 2026
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Upgrade your <span className="text-primary-600">style</span>, every single day.
          </h1>
          <p className="mt-4 max-w-md text-base text-slate-600 sm:text-lg">
            Discover hand-picked fashion, electronics and lifestyle essentials at prices you&apos;ll love — with fast,
            free delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop?category=Electronics"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600"
            >
              Explore Deals
            </Link>
          </div>
          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">20k+</p>
              <p className="text-sm text-slate-500">Happy customers</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9</p>
              <p className="text-sm text-slate-500">Average rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">250+</p>
              <p className="text-sm text-slate-500">Brands curated</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in-up">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img src={HERO_IMAGE} alt="Featured products" className="aspect-[5/4] w-full object-cover" />
          </div>
          <div className="absolute -left-6 top-8 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Free Delivery</p>
              <p className="text-xs text-slate-500">On orders over $99</p>
            </div>
          </div>
          <div className="absolute -right-4 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <BadgePercent size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Up to 50% Off</p>
              <p className="text-xs text-slate-500">Weekly deals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="text-xs text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Shop by category"
        subtitle="Everything you need, neatly organised"
        action={
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all <ArrowRight size={15} />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {CATEGORY_META.map((cat) => (
          <Link
            key={cat.name}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className={`aspect-[4/5] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 ${cat.color}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-base font-bold text-white">{cat.name}</p>
              <p className="mt-0.5 text-xs text-slate-200 opacity-0 transition duration-300 group-hover:opacity-100">
                {cat.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrendingSection({ products: items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <SectionHeading
        title={
          <span className="flex items-center gap-2">
            <Flame className="text-amber-500" /> Trending now
          </span>
        }
        subtitle="The products everyone is talking about"
        action={
          <Link to="/shop?q=trending" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all <ArrowRight size={15} />
          </Link>
        }
      />
      <ProductGrid>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ProductGrid>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <img
          src={PROMO_IMAGE}
          alt="Promotion"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative z-10 flex flex-col items-start gap-4 px-6 py-12 sm:px-12 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
            <BadgePercent size={14} /> Limited time
          </span>
          <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Electronics week — up to <span className="text-amber-400">50% off</span>
          </h2>
          <p className="max-w-md text-sm text-slate-300 sm:text-base">
            Headphones, smartwatches, speakers and more. Grab the deals before they&apos;re gone.
          </p>
          <Link
            to="/shop?category=Electronics"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
          >
            Shop Electronics <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BestSellersSection({ products: items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Best sellers"
        subtitle="Loved by thousands of customers"
        action={
          <Link to="/shop?q=best-sellers" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all <ArrowRight size={15} />
          </Link>
        }
      />
      <ProductGrid>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ProductGrid>
    </section>
  );
}

function NewArrivalsSection({ products: items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="New arrivals"
        subtitle="Fresh drops just landed"
        action={
          <Link to="/shop?sort=newest" className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all <ArrowRight size={15} />
          </Link>
        }
      />
      <ProductGrid>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ProductGrid>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What our customers say" subtitle="Real reviews from real shoppers" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {customerReviews.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="h-6 w-6 text-primary-200" />
              <RatingStars rating={r.rating} size={14} className="mt-3" />
              <p className="mt-3 text-sm font-semibold text-slate-900">{r.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">“{r.text}”</p>
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {r.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.location}</p>
                </div>
                <Check className="ml-auto h-4 w-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}