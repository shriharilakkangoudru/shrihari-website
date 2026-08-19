import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 10, size = 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${box} flex items-center justify-center text-slate-500 transition hover:text-primary-600 disabled:opacity-40`}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-slate-800">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${box} flex items-center justify-center text-slate-500 transition hover:text-primary-600 disabled:opacity-40`}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}