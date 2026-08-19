import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, LogOut, LogIn, Menu, Search, ShoppingBag, User, UserPlus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/products';
import logo from '../assets/logo.svg';
import { cn } from '../utils/helpers';

const CATEGORY_NAV = ['All', ...CATEGORIES];

export default function Navbar() {
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setUserOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
    setQuery('');
    setSearchOpen(false);
  };

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category') || 'All';

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-md' : 'border-b border-slate-100'
      }`}
    >
      <div className="bg-primary-600 px-4 py-1.5 text-center text-xs font-medium text-white">
        Free standard shipping on orders over $99 — use code <span className="font-bold">SHRIHARI10</span> for 10%
        off
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src={logo} alt="Shrihari logo" className="h-9 w-9" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Shrihari<span className="text-primary-600">.</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="relative mx-auto hidden max-w-xl flex-1 lg:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands and more…"
              className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
            />
          </form>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Wishlist">
              <Heart className="h-6 w-6" />
              {ids.length > 0 && <Badge value={ids.length} />}
            </Link>
            <Link to="/cart" className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100" aria-label="Cart">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && <Badge value={itemCount} />}
            </Link>
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserOpen((v) => !v)}
                className="flex items-center rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                aria-label="Account"
              >
                <User className="h-6 w-6" />
              </button>
              {userOpen && (
                <div className="animate-fade-in absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
                  {user ? (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                      </div>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-rose-600"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <LogIn size={16} /> Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <UserPlus size={16} /> Create account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-1 pb-2 lg:flex">
          {CATEGORY_NAV.map((c) => {
            const to = c === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(c)}`;
            const active = location.pathname === '/shop' && c === currentCategory;
            return (
              <NavLink
                key={c}
                to={to}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition',
                  active ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                {c}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </form>
        </div>
      )}

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        onLogout={() => {
          logout();
          setMobileOpen(false);
        }}
      />
    </header>
  );
}

function Badge({ value }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
      {value > 99 ? '99+' : value}
    </span>
  );
}

function MobileDrawer({ open, onClose, user, onLogout }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="animate-fade-in absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="text-lg font-extrabold text-slate-900">
              Shrihari<span className="text-primary-600">.</span>
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        {user ? (
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Hi, {user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        ) : (
          <div className="flex gap-2 border-b border-slate-100 p-4">
            <Link
              to="/login"
              className="flex-1 rounded-xl bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600"
            >
              Register
            </Link>
          </div>
        )}

        <nav className="flex-1 space-y-1 p-4">
          <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-slate-400">Shop by category</p>
          {CATEGORY_NAV.map((c) => (
            <NavLink
              key={c}
              to={c === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(c)}`}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                )
              }
            >
              {c}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          {user && (
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-rose-600"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
          <p className="mt-3 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Shrihari. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}