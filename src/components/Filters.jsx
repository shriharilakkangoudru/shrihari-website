import { Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { BRANDS, CATEGORIES, MAX_PRODUCT_PRICE } from '../data/products';
import { cn } from '../utils/helpers';

const RATINGS = [
  { value: 0, label: 'Any rating' },
  { value: 4, label: '4★ & up' },
  { value: 3, label: '3★ & up' },
];

export default function Filters({
  category,
  onCategory,
  brands,
  onToggleBrand,
  maxPrice,
  onMaxPrice,
  minRating,
  onMinRating,
  onClear,
  activeCount,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900">
          <SlidersHorizontal size={15} className="text-primary-600" /> Filters
        </h3>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
          >
            <RotateCcw size={13} /> Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="space-y-1">
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition',
                category === c
                  ? 'bg-primary-50 font-semibold text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <span>{c === 'All' ? 'All Categories' : c}</span>
              {category === c && <Check size={15} />}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-1">
          {BRANDS.map((b) => (
            <label
              key={b}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm text-slate-600 transition hover:text-slate-900"
            >
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => onToggleBrand(b)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 accent-primary-600"
              />
              {b}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title={`Max price — $${Math.round(maxPrice)}`}>
        <input
          type="range"
          min={10}
          max={MAX_PRODUCT_PRICE}
          step={5}
          value={maxPrice}
          onChange={(e) => onMaxPrice(Number(e.target.value))}
          className="w-full accent-primary-600"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>$10</span>
          <span>${Math.round(MAX_PRODUCT_PRICE)}</span>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button
              key={r.value}
              onClick={() => onMinRating(r.value)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                minRating === r.value
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-slate-200 text-slate-600 hover:border-primary-400 hover:text-primary-600'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <h4 className="mb-2.5 text-sm font-semibold text-slate-800">{title}</h4>
      {children}
    </div>
  );
}