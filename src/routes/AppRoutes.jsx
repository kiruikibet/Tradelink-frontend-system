import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Auth / Public
import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";

// Marketplace
import Home from "../pages/public/Home";
import SearchResults from "../pages/public/SearchResults";
import ProductDetails from "../pages/public/ProductDetails";
import CategoryPage from "../pages/public/CategoryPage";

// User — saved / profile / settings
import SavedProducts from "../pages/user/SavedProducts";
import Profile from "../pages/user/Profile";
import EditProfile from "../pages/user/EditProfile";
import AccountSettings from "../pages/user/AccountSettings";
import Notifications from "../pages/user/Notifications";

// Messaging
import Conversations from "../pages/user/Conversations";
import Chat from "../pages/user/Chat";

// Agreements
import AgreementDetails from "../pages/user/AgreementDetails";

// Payments
import PaymentPage from "../pages/user/PaymentPage";
import BookingPayment from "../pages/user/BookingPayment";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentFailed from "../pages/user/PaymentFailed";
import TransactionHistory from "../pages/user/TransactionHistory";

// Orders
import MyOrders from "../pages/user/MyOrders";
import OrderDetails from "../pages/user/OrderDetails";
import ActiveTransactions from "../pages/user/ActiveTransactions";
import CompletedTransactions from "../pages/user/CompletedTransactions";

// Escrow & Delivery
import EscrowStatus from "../pages/user/EscrowStatus";
import MeetupDetails from "../pages/user/MeetupDetails";

// Disputes
import DisputeDetails from "../pages/user/DisputeDetails";
import DisputeResolution from "../pages/user/DisputeResolution";

// Reviews
import ProductReviews from "../pages/user/ProductReviews";
import SellerReviews from "../pages/user/SellerReviews";

// Seller
import SellerDashboard from "../pages/seller/SellerDashboard";
import MyListings from "../pages/seller/MyListings";
import CreateProduct from "../pages/user/CreateProduct";
import EditProduct from "../pages/seller/EditProduct";
import SellerAnalytics from "../pages/seller/SellerAnalytics";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import ProductModeration from "../pages/admin/ProductModeration";
import TransactionManagement from "../pages/admin/TransactionManagement";
import DisputeManagement from "../pages/admin/DisputeManagement";
import AdminReports from "../pages/admin/AdminReports";

// Errors
import NotFound from "../pages/errors/NotFound";
import AccessDenied from "../pages/errors/AccessDenied";
import Maintenance from "../pages/errors/Maintenance";
import ServerError from "../pages/errors/ServerError";

function AppRoutes() {
  return (
    <Routes>
      {/* ── Auth ── */}
      <Route path="/welcome" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      {/* ── Marketplace (public) ── */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />

      {/* ── User profile ── */}
      <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/user/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/user/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
      <Route path="/user/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/user/saved" element={<ProtectedRoute><SavedProducts /></ProtectedRoute>} />

      {/* ── Messaging ── */}
      <Route path="/user/messages" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
      <Route path="/user/messages/:username" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

      {/* ── Agreements ── */}
      <Route path="/user/agreements/:id" element={<ProtectedRoute><AgreementDetails /></ProtectedRoute>} />

      {/* ── Payments ── */}
      <Route path="/user/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      <Route path="/user/payment/booking" element={<ProtectedRoute><BookingPayment /></ProtectedRoute>} />
      <Route path="/user/payment/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
      <Route path="/user/payment/failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
      <Route path="/user/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />

      {/* ── Orders ── */}
      <Route path="/user/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/user/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
      <Route path="/user/transactions/active" element={<ProtectedRoute><ActiveTransactions /></ProtectedRoute>} />
      <Route path="/user/transactions/completed" element={<ProtectedRoute><CompletedTransactions /></ProtectedRoute>} />

      {/* ── Escrow & Delivery ── */}
      <Route path="/user/escrow/:id" element={<ProtectedRoute><EscrowStatus /></ProtectedRoute>} />
      <Route path="/user/meetup/:id" element={<ProtectedRoute><MeetupDetails /></ProtectedRoute>} />

      {/* ── Disputes ── */}
      <Route path="/user/disputes/:id" element={<ProtectedRoute><DisputeDetails /></ProtectedRoute>} />
      <Route path="/user/disputes/:id/resolution" element={<ProtectedRoute><DisputeResolution /></ProtectedRoute>} />

      {/* ── Reviews ── */}
      <Route path="/products/:id/reviews" element={<ProductReviews />} />
      <Route path="/seller/:username/reviews" element={<SellerReviews />} />

      {/* ── Seller ── */}
      <Route path="/seller/dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
      <Route path="/seller/listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
      <Route path="/products/create" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
      <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
      <Route path="/seller/analytics" element={<ProtectedRoute><SellerAnalytics /></ProtectedRoute>} />

      {/* ── Admin ── */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ProductModeration /></AdminRoute>} />
      <Route path="/admin/transactions" element={<AdminRoute><TransactionManagement /></AdminRoute>} />
      <Route path="/admin/disputes" element={<AdminRoute><DisputeManagement /></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />

      {/* ── Errors ── */}
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
