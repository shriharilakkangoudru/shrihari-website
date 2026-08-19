# Shrihari — Modern E-Commerce Store

A production-ready, fully responsive React shopping website built with **Vite**, **Tailwind CSS**, **React Router** and **Lucide React** icons. Uses local mock data only — no backend required.

## Features

**Pages**
- Home, Shop / Products, Product Details, Cart, Wishlist, Login / Signup, Checkout, Order Confirmation, 404

**Home**
- Sticky navbar with logo, search, category nav, wishlist & cart badges and user menu
- Hero banner, trust bar, featured categories, trending products, promo banner, best sellers, new arrivals, customer reviews, newsletter signup, footer

**Shop**
- Responsive product grid (2/3/4 columns)
- Search (from navbar), filter by category / brand / max price / rating, sort by price / popularity / newest / rating
- "Show more" pagination, mobile filter drawer, empty state

**Product Details**
- Image gallery with thumbnails, rating, price + discount, description, features, color & size selectors, quantity selector, Add to Cart, Buy Now, wishlist toggle, related products

**Cart & Checkout**
- Quantity controls, remove, coupon codes (`SHRIHARI10`, `SAVE20`, `FREESHIP`), subtotal/discount/shipping/total, free-shipping progress bar
- Checkout with contact + shipping form (validated), delivery method, payment method UI, order summary, order confirmation page

**State & persistence**
- Cart, wishlist, coupon and logged-in user persisted to `localStorage`
- Toast notifications on add-to-cart / wishlist / auth / coupon actions

## Getting started

```bash
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets            # brand logo
    ├── components        # Navbar, Footer, ProductCard, ProductGrid, Filters,
    │                     # CartItem, Button, Modal, RatingStars, QuantitySelector,
    │                     # SectionHeading, Newsletter, Toasts, ScrollToTop
    ├── context           # CartContext, WishlistContext, AuthContext, ToastContext
    ├── data              # products.js (22 products), coupons.js, reviews.js
    ├── pages             # Home, Shop, ProductDetails, Cart, Wishlist, Auth,
    │                     # Checkout, OrderConfirmation, NotFound
    └── utils             # helpers.js (formatters, colors, storage utils)
```

## Try these coupons

| Code        | Discount                     |
| ----------- | ---------------------------- |
| `SHRIHARI10` | 10% off your order          |
| `SAVE20`     | 20% off your order          |
| `FREESHIP`   | Free standard shipping      |

> Demo tip: product images load from `picsum.photos` (stable seeded placeholders). Sign-up/login is mocked and stored locally for demonstration purposes.
