import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, size = 15, showValue = false, count = 0, className = '' }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const stars = [...Array(5)].map((_, i) => <Star key={i} size={size} className="shrink-0 fill-current" />);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="relative inline-flex shrink-0">
        <div className="flex gap-0.5 text-slate-200">{stars}</div>
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
          <div className="flex w-max gap-0.5 text-amber-400">{stars}</div>
        </div>
      </div>
      {showValue && <span className="text-sm font-semibold text-slate-700">{rating}</span>}
      {count > 0 && <span className="text-xs text-slate-400">({count})</span>}
    </div>
  );
}