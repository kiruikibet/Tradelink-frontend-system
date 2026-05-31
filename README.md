# TradeLink Frontend

## Overview

TradeLink Frontend is the client-side application for the TradeLink marketplace platform.  
It allows users to browse products, communicate with sellers, manage orders, and interact with the marketplace through a modern responsive interface.

The frontend is built using React, Vite, Tailwind CSS, and React Router.

---

# Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

---

# Features

## Public Features

- Homepage
- Marketplace browsing
- Product details
- Search products
- Categories
- User registration
- User login
- Google authentication
- Seller profiles

---

## User Features

- User dashboard
- Wishlist
- Cart
- Checkout
- Order tracking
- Messaging system
- Followers and following
- Account settings

---

## Seller Features

- Seller dashboard
- Add product
- Manage products
- Manage orders
- Seller analytics

---

## Admin Features

- User management
- Seller management
- Product management
- Orders management
- Coupons
- Banners
- Reviews
- Transactions
- Disputes
- Settings
- Integrations
- Backup & Restore

---

# Project Structure

```bash
tradelink-frontend/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── UserSidebar.jsx
│   │   │   ├── SellerSidebar.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── PromoBanner.jsx
│   │   │   ├── CategoryStrip.jsx
│   │   │   ├── DealsSection.jsx
│   │   │   └── FeaturedProducts.jsx
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductImageGallery.jsx
│   │   │   └── ProductReviews.jsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatList.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   └── MessageBubble.jsx
│   │   │
│   │   └── admin/
│   │       ├── StatsCard.jsx
│   │       ├── AdminTable.jsx
│   │       ├── ChartCard.jsx
│   │       └── AdminHeader.jsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Followers.jsx
│   │   │   ├── Following.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── seller/
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── MyProducts.jsx
│   │   │   ├── SellerOrders.jsx
│   │   │   └── SellerProfile.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── Users.jsx
│   │       ├── Sellers.jsx
│   │       ├── Products.jsx
│   │       ├── Orders.jsx
│   │       ├── Transactions.jsx
│   │       ├── Reviews.jsx
│   │       ├── Disputes.jsx
│   │       ├── Coupons.jsx
│   │       ├── Banners.jsx
│   │       ├── Announcements.jsx
│   │       ├── EmailCampaigns.jsx
│   │       ├── Categories.jsx
│   │       ├── Attributes.jsx
│   │       ├── Brands.jsx
│   │       ├── Shipping.jsx
│   │       ├── PaymentMethods.jsx
│   │       ├── Taxes.jsx
│   │       ├── AdminSettings.jsx
│   │       ├── StoreSettings.jsx
│   │       ├── EmailSettings.jsx
│   │       ├── PaymentSettings.jsx
│   │       ├── ShippingSettings.jsx
│   │       ├── TaxSettings.jsx
│   │       ├── RolesPermissions.jsx
│   │       ├── SecuritySettings.jsx
│   │       ├── NotificationSettings.jsx
│   │       ├── Integrations.jsx
│   │       └── BackupRestore.jsx
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── UserLayout.jsx
│   │   ├── SellerLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PublicRoutes.jsx
│   │   ├── ProtectedRoutes.jsx
│   │   └── AdminRoutes.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── chatService.js
│   │   └── adminService.js
│   │
│   ├── data/
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── banners.js
│   │   └── dashboardData.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useFetch.js
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── helpers.js
│   │   └── constants.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/tradelink-frontend.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

# Future Improvements

- Real-time chat
- Notifications
- AI recommendations
- Mobile app version
- Advanced analytics

---

# Author

Kirui