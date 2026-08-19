import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function Auth({ mode }) {
  const isLogin = mode === 'login';
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setForm({ name: '', email: '', password: '' });
    setErrors({});
  }, [mode]);

  useEffect(() => {
    if (user) navigate(redirect, { replace: true });
  }, [user, redirect, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '', general: '' }));
  };

  const validate = () => {
    const next = {};
    if (!isLogin && !form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email';
    if (!form.password) next.password = 'Please enter your password';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = isLogin
      ? login(form.email.trim(), form.password)
      : signup(form.name.trim(), form.email.trim(), form.password);
    if (ok) navigate(redirect, { replace: true });
  };

  const inputBase =
    'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10';

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-600/30">
        <img src={logo} alt="Shrihari" className="h-10 w-10" />
      </div>
      <h1 className="mt-5 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {isLogin ? 'Welcome back' : 'Create your account'}
      </h1>
      <p className="mt-1.5 text-center text-sm text-slate-500">
        {isLogin ? 'Sign in to continue shopping with us.' : 'Join Shrihari and get 10% off your first order.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        {!isLogin && (
          <Field label="Full name" error={errors.name}>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputBase}
              />
            </div>
          </Field>
        )}

        <Field label="Email address" error={errors.email}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputBase}
            />
          </div>
        </Field>

        <Field label="Password" error={errors.password}>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
              className={inputBase}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition hover:text-slate-600"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {isLogin ? (
          <>
            New to Shrihari?{' '}
            <Link to={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-semibold text-primary-600 hover:text-primary-700">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}