import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, PackageOpen } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Modal from '../components/Modal';
import { MAX_PRODUCT_PRICE, products } from '../data/products';
import { cn } from '../utils/helpers';

const PAGE_SIZE = 8;

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const categoryParam = searchParams.get('category') ?? 'All';

  const [category, setCategory] = useState(categoryParam);
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRODUCT_PRICE);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('featured');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, brands, maxPrice, minRating, sort, q]);

  const filtered = useMemo(() => {
    let list = [...products];
    const term = q.toLowerCase().trim();
    if (term) {
      list = list.filter((p) =>
        `${p.name} ${p.brand} ${p.category} ${(p.tags || []).join(' ')}`.toLowerCase().includes(term)
      );
    }
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (brands.length) list = list.filter((p) => brands.includes(p.brand));
    list = list.filter((p) => p.price <= maxPrice);
    if (minRating) list = list.filter((p) => p.rating >= minRating);

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      case 'popular':
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [q, category, brands, maxPrice, minRating, sort]);

  const activeCount =
    (category !== 'All' ? 1 : 0) + brands.length + (maxPrice < MAX_PRODUCT_PRICE ? 1 : 0) + (minRating ? 1 : 0);

  const clearFilters = () => {
    setCategory('All');
    setBrands([]);
    setMaxPrice(MAX_PRODUCT_PRICE);
    setMinRating(0);
  };

  const toggleBrand = (b) => setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtersProps = {
    category,
    onCategory: setCategory,
    brands,
    onToggleBrand: toggleBrand,
    maxPrice,
    onMaxPrice: setMaxPrice,
    minRating,
    onMinRating: setMinRating,
    onClear: clearFilters,
    activeCount,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {q ? `Search: “${q}”` : category === 'All' ? 'Shop' : category}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Showing {Math.min(visible, filtered.length)} of {filtered.length} products
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600 lg:hidden"
        >
          <Filter size={16} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort" className="hidden text-sm text-slate-500 sm:block">
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-36 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <Filters {...filtersProps} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <EmptyState q={q} onClear={clearFilters} />
          ) : (
            <>
              <ProductGrid>
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </ProductGrid>
              {visible < filtered.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600"
                  >
                    Show more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filters" subtitle="Refine your search">
        <Filters {...filtersProps} />
        <button
          onClick={() => setFilterOpen(false)}
          className="mt-6 h-11 w-full rounded-xl bg-primary-600 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Show {filtered.length} results
        </button>
      </Modal>
    </div>
  );
}

function EmptyState({ q, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <PackageOpen size={28} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">No products found</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {q
          ? `We couldn't find anything matching “${q}”. Try a different keyword.`
          : 'No products match your current filters. Try adjusting or clearing them.'}
      </p>
      <button
        onClick={onClear}
        className="mt-6 h-11 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
      >
        Clear all filters
      </button>
    </div>
  );
}