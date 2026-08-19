import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-7xl font-extrabold tracking-tight text-primary-600">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
      >
        <Home size={16} /> Back to home
      </Link>
    </div>
  );
}