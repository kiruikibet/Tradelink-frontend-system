import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiBell,
  FiBriefcase,
  FiGrid,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMessageCircle,
  FiPlusCircle,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function AccountNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/", label: "Home", icon: FiHome },
    { to: "/seller/dashboard", label: "Marketplace", icon: FiGrid },
    { to: "/user/messages", label: "Messages", icon: FiMessageCircle },
    { to: "/user/orders", label: "Orders", icon: FiShoppingBag },
    { to: "/user/saved", label: "Saved", icon: FiHeart },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-6 h-16 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
            TL
          </div>
          <span className="hidden sm:block text-lg font-bold text-gray-900">
            Marketplace
          </span>
        </Link>

        <form
          onSubmit={submitSearch}
          className="hidden md:flex h-10 w-full max-w-sm items-center gap-2 rounded-full bg-gray-100 px-4 text-gray-600 focus-within:ring-2 focus-within:ring-green-100"
        >
          <FiSearch size={18} />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search TradeLink"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </form>

        <nav className="hidden lg:flex flex-1 justify-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `h-11 px-4 rounded-lg flex items-center gap-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-green-700 bg-green-50"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/products/create"
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-full bg-green-700 px-4 text-sm font-semibold text-white hover:bg-green-600 transition"
          >
            <FiPlusCircle size={18} />
            Sell
          </Link>

          <Link
            to="/user/notifications"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
            aria-label="Notifications"
          >
            <FiBell size={19} />
          </Link>

          <Link
            to="/user/settings"
            className="hidden sm:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 items-center justify-center transition"
            aria-label="Settings"
          >
            <FiSettings size={19} />
          </Link>

          <Link
            to="/user/profile"
            className="w-10 h-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold overflow-hidden"
            aria-label="Profile"
          >
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              user?.username?.charAt(0).toUpperCase() || <FiUser size={18} />
            )}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden md:flex w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 items-center justify-center transition"
            aria-label="Log out"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>

      <div className="lg:hidden border-t border-gray-100">
        <nav className="max-w-7xl mx-auto px-3 h-13 flex items-center gap-2 overflow-x-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `shrink-0 h-9 px-3 rounded-full flex items-center gap-2 text-xs font-semibold transition ${
                  isActive
                    ? "text-green-700 bg-green-50"
                    : "text-gray-600 bg-gray-100"
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
          <Link
            to="/seller/listings"
            className="shrink-0 h-9 px-3 rounded-full flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100"
          >
            <FiBriefcase size={15} />
            Listings
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AccountNavbar;
