import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Banknote, CreditCard, Lock, MapPin, Truck, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn, formatPrice } from '../utils/helpers';

const DELIVERY_METHODS = [
  { value: 'standard', label: 'Standard delivery', eta: '5–7 business days', price: 9.99 },
  { value: 'express', label: 'Express delivery', eta: '2–3 business days', extra: 10 },
];

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit / Debit Card', Icon: CreditCard },
  { value: 'paypal', label: 'PayPal', Icon: Banknote },
  { value: 'cod', label: 'Cash on Delivery', Icon: Banknote },
];

const inputBase =
  'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10';

const INITIAL_FORM = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  delivery: 'standard',
  payment: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

export default function Checkout() {
  const { items, subtotal, discountAmount, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...INITIAL_FORM, email: user?.email || '' });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const delivery = DELIVERY_METHODS.find((d) => d.value === form.delivery);
  const checkoutShipping = useMemo(() => {
    const base = form.delivery === 'express' ? delivery.extra : 0;
    return base;
  }, [form.delivery, delivery]);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 text-primary-600">
          <Lock size={32} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">Add some products before checking out.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = subtotal - discountAmount + checkoutShipping;

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number';
    if (!form.address.trim()) next.address = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.state.trim()) next.state = 'Required';
    if (!form.zip.trim()) next.zip = 'Required';
    if (form.payment === 'card') {
      if (!form.cardName.trim()) next.cardName = 'Name on card is required';
      if (!form.cardNumber.replace(/\s/g, '').match(/^\d{13,19}$/)) next.cardNumber = 'Enter a valid card number';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = 'Use MM/YY';
      if (!/^\d{3,4}$/.test(form.cvv)) next.cvv = 'Invalid CVV';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setPlacing(true);
    const order = {
      id: `SH-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      items,
      subtotal,
      discount: discountAmount,
      shipping: checkoutShipping,
      total,
      coupon,
      customer: {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      },
      address: {
        line: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      delivery: { method: form.delivery, label: delivery.label, eta: delivery.eta },
      payment: form.payment,
    };

    window.localStorage.setItem('shrihari.lastOrder', JSON.stringify(order));

    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-6 grid gap-8 lg:grid-cols-3" noValidate>
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <SectionTitle Icon={User} title="Contact information" />
            <div className="mt-4 grid gap-4">
              <Field label="Email address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="you@example.com"
                  className={inputBase}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" error={errors.firstName}>
                  <input value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} placeholder="John" className={inputBase} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} placeholder="Doe" className={inputBase} />
                </Field>
              </div>
              <Field label="Phone" error={errors.phone}>
                <input value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="+1 555 000 0000" className={inputBase} />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <SectionTitle Icon={MapPin} title="Shipping address" />
            <div className="mt-4 grid gap-4">
              <Field label="Street address" error={errors.address}>
                <input value={form.address} onChange={(e) => setField('address', e.target.value)} placeholder="123 Market Street, Apt 4B" className={inputBase} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" error={errors.city}>
                  <input value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="San Francisco" className={inputBase} />
                </Field>
                <Field label="State / Province" error={errors.state}>
                  <input value={form.state} onChange={(e) => setField('state', e.target.value)} placeholder="CA" className={inputBase} />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="ZIP / Postal code" error={errors.zip}>
                  <input value={form.zip} onChange={(e) => setField('zip', e.target.value)} placeholder="94103" className={inputBase} />
                </Field>
                <Field label="Country">
                  <select value={form.country} onChange={(e) => setField('country', e.target.value)} className={inputBase}>
                    {['United States', 'United Kingdom', 'India', 'Australia', 'Canada', 'Germany', 'Other'].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <SectionTitle Icon={Truck} title="Delivery method" />
            <div className="mt-4 space-y-3">
              {DELIVERY_METHODS.map((d) => {
                const selected = form.delivery === d.value;
                const isExpress = d.value === 'express';
                const displayPrice = isExpress
                  ? checkoutShipping > 0
                    ? `+${formatPrice(d.extra)}`
                    : 'Free'
                  : subtotal - discountAmount >= 99
                  ? 'Free'
                  : formatPrice(d.price);
                return (
                  <button
                    type="button"
                    key={d.value}
                    onClick={() => setField('delivery', d.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition',
                      selected ? 'border-primary-600 bg-primary-50' : 'border-slate-200 bg-white hover:border-primary-300'
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{d.label}</p>
                      <p className="text-xs text-slate-500">Estimated delivery: {d.eta}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{displayPrice}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <SectionTitle Icon={CreditCard} title="Payment method" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map(({ value, label, Icon }) => {
                const selected = form.payment === value;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setField('payment', value)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 text-sm font-semibold transition',
                      selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-600 hover:border-primary-300'
                    )}
                  >
                    <Icon size={22} />
                    {label}
                  </button>
                );
              })}
            </div>

            {form.payment === 'card' && (
              <div className="mt-4 grid gap-4">
                <Field label="Name on card" error={errors.cardName}>
                  <input value={form.cardName} onChange={(e) => setField('cardName', e.target.value)} placeholder="John Doe" className={inputBase} />
                </Field>
                <Field label="Card number" error={errors.cardNumber}>
                  <input
                    value={form.cardNumber}
                    onChange={(e) => setField('cardNumber', e.target.value.replace(/[^\d\s]/g, '').slice(0, 19))}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    className={inputBase}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Expiry (MM/YY)" error={errors.expiry}>
                    <input
                      value={form.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
                        if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                        setField('expiry', v);
                      }}
                      placeholder="12/28"
                      className={inputBase}
                    />
                  </Field>
                  <Field label="CVV" error={errors.cvv}>
                    <input
                      type="password"
                      value={form.cvv}
                      onChange={(e) => setField('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      inputMode="numeric"
                      className={inputBase}
                    />
                  </Field>
                </div>
              </div>
            )}

            {form.payment === 'paypal' && (
              <p className="mt-4 rounded-xl bg-sky-50 p-4 text-sm text-sky-700">
                You&apos;ll be redirected to PayPal to complete your payment securely after placing the order.
              </p>
            )}
            {form.payment === 'cod' && (
              <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                Pay in cash when your order is delivered. A small handling note is included with your parcel.
              </p>
            )}
          </section>
        </div>

        <div className="h-fit lg:sticky lg:top-36">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
            <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-900 px-1 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-semibold text-slate-800">{item.name}</p>
                    {(item.color || item.size) && (
                      <p className="text-[11px] text-slate-400">
                        {[item.color, item.size].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-dashed border-slate-200 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Subtotal</dt>
                <dd className="font-semibold text-slate-900">{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>Coupon {coupon?.code}</dt>
                  <dd className="font-semibold">-{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-slate-500">Delivery</dt>
                <dd className="font-semibold text-slate-900">
                  {checkoutShipping === 0 ? 'Free' : formatPrice(checkoutShipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
                <dt className="font-bold text-slate-900">Total</dt>
                <dd className="font-extrabold text-slate-900">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={placing}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700 disabled:opacity-60"
            >
              {placing ? 'Placing order…' : `Place Order · ${formatPrice(total)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Lock size={13} /> Your payment details are encrypted and secure
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function SectionTitle({ Icon, title }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
        <Icon size={16} />
      </span>
      {title}
    </h2>
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