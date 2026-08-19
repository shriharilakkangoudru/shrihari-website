import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/helpers';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants = {
  primary: 'bg-primary-600 text-white shadow-sm shadow-primary-600/30 hover:bg-primary-700 active:bg-primary-800',
  dark: 'bg-slate-900 text-white hover:bg-slate-800',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:border-primary-500 hover:text-primary-600',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}