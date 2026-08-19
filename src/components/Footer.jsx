import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import logo from '../assets/logo.svg';

const COMPANY_LINKS = [
  { label: 'About Us', to: '/' },
  { label: 'Careers', to: '/' },
  { label: 'Press', to: '/' },
  { label: 'Sustainability', to: '/' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', to: '/' },
  { label: 'Track Order', to: '/order-confirmation' },
  { label: 'Returns & Exchanges', to: '/' },
  { label: 'Shipping Policy', to: '/' },
  { label: 'Contact Us', to: '/' },
];

const SOCIALS = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Youtube, label: 'YouTube' },
];

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Shrihari logo" className="h-9 w-9" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Shrihari<span className="text-primary-400">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Modern essentials for fashion, electronics, shoes, watches and accessories — curated with care,
              delivered fast, and priced fairly.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-primary-400" /> support@shrihari.com
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-primary-400" /> +1 (800) 555-0199
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-primary-400" /> 100 Market Street, San Francisco, CA
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link to={`/shop?category=${encodeURIComponent(c)}`} className="transition hover:text-white">
                  {c}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" className="transition hover:text-white">
                All Products
              </Link>
            </li>
          </FooterCol>

          <FooterCol title="Company">
            {COMPANY_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Support">
            {SUPPORT_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} Shrihari. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-white/15 px-2 py-1 font-semibold">VISA</span>
            <span className="rounded-md border border-white/15 px-2 py-1 font-semibold">Mastercard</span>
            <span className="rounded-md border border-white/15 px-2 py-1 font-semibold">PayPal</span>
            <span className="rounded-md border border-white/15 px-2 py-1 font-semibold">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}