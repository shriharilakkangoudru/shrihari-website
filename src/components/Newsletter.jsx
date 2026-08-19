import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      showToast('Please enter your email address', 'error');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed! Check your inbox for a welcome discount.', 'success');
    setEmail('');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-indigo-500 px-6 py-12 text-center text-white sm:px-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Get 10% off your first order</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-primary-100 sm:text-base">
          Join our newsletter for exclusive deals, new arrivals and style inspiration. No spam, ever.
        </p>
        <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="h-12 flex-1 rounded-xl border-0 bg-white px-4 text-sm text-slate-800 outline-none ring-4 ring-transparent transition focus:ring-primary-300/40"
          />
          <button
            type="submit"
            className="h-12 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}