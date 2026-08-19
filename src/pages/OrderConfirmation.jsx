import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Package, Truck } from 'lucide-react';
import { addDays, formatDate, formatPrice, readStorage } from '../utils/helpers';

export default function OrderConfirmation() {
  const stateOrder = readStorage('shrihari.lastOrder', null);
  const order = stateOrder;

  if (!order) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
          <Package size={36} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">No order found</h1>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          We couldn&apos;t find a recent order. Visit the shop to start a new one.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const deliveryDate = addDays(order.delivery?.method === 'express' ? 3 : 7);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Thank you, {order.customer.firstName}!
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Your order has been placed successfully. A confirmation email has been sent to{' '}
          <span className="font-semibold text-slate-700">{order.customer.email}</span>.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
          <Package size={15} className="text-primary-600" /> Order #{order.id}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <InfoCard Icon={Truck} title="Estimated delivery" text={`${order.delivery?.label ?? 'Delivery'} — ${formatDate(deliveryDate.toISOString())}`} />
        <InfoCard Icon={MapPin} title="Shipping to" text={`${order.address?.line}, ${order.address?.city}`} />
        <InfoCard Icon={Package} title="Payment" text={order.payment === 'card' ? 'Credit / Debit Card' : order.payment === 'paypal' ? 'PayPal' : 'Cash on Delivery'} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <h2 className="text-base font-bold text-slate-900">Order summary</h2>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-slate-800">{item.name}</p>
                {(item.color || item.size) && (
                  <p className="text-xs text-slate-400">{[item.color, item.size].filter(Boolean).join(' · ')}</p>
                )}
              </div>
              <span className="text-sm font-semibold text-slate-700">× {item.quantity}</span>
              <span className="w-20 text-right text-sm font-semibold text-slate-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <dl className="mt-5 space-y-2.5 border-t border-dashed border-slate-200 pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Subtotal</dt>
            <dd className="font-semibold text-slate-900">{formatPrice(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <dt>Coupon discount</dt>
              <dd className="font-semibold">-{formatPrice(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-slate-500">Delivery</dt>
            <dd className="font-semibold text-slate-900">
              {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
            <dt className="font-bold text-slate-900">Total paid</dt>
            <dd className="font-extrabold text-slate-900">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/shop"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:bg-primary-700"
        >
          Continue shopping
        </Link>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-600"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ Icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800">{text}</p>
      </div>
    </div>
  );
}