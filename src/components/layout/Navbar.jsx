import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiTruck,
  FiRefreshCw,
  FiPhone,
  FiSearch,
  FiHeart,
  FiUser,
  FiMessageCircle,
  FiBell,
} from "react-icons/fi";
import {useAuth} from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white">
      {/* Top Green Bar */}
      <div className="bg-green-800 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <FiTruck /> Free Delivery on orders over KSh 5,000
            </span>

            <span className="hidden md:flex items-center gap-2">
              <FiRefreshCw /> Easy Returns within 30 days
            </span>

            <span className="hidden lg:flex items-center gap-2">
              <FiPhone /> Need Help? +254 700 123 456
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#">Track Order</a>
            <span>|</span>
            <a href="#">Help & Support</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-green-700 rounded-xl flex items-center justify-center text-green-700 font-bold">
              TL
            </div>

            <h1 className="text-3xl font-bold">
              Trade<span className="text-green-700">Link</span>
            </h1>
          </Link>

          {/* Category + Search */}
          <div className="flex-1 hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex flex-1 h-12 border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="flex-1 px-5 outline-none text-gray-700"
              />
              <button type="submit" className="w-16 bg-green-800 text-white flex items-center justify-center text-xl">
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {isLoggedIn && (
              <>
                <Link
                  to="/user/messages"
                  className="relative flex items-center gap-2 font-medium"
                >
                  <FiMessageCircle className="text-2xl" />
                  <span>Chat</span>
                </Link>

                <Link to="/user/notifications" className="relative flex items-center gap-2 font-medium">
                  <FiBell className="text-2xl" />
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <Link
                to="/user/profile"
                state={{ from: location.pathname }}
                className="flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-xs text-green-700 font-medium">
                    Account
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-green-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
              >
                <FiUser /> Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Search Icon */}
          <button className="lg:hidden ml-auto text-2xl">
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Bottom Nav Links */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-10 overflow-x-auto text-sm font-semibold">
          <Link to="/" className="hover:text-green-700 transition whitespace-nowrap">Deals</Link>
          <Link to="/search?q=new" className="hover:text-green-700 transition whitespace-nowrap">New Arrivals</Link>
          <Link to="/search?q=best" className="hover:text-green-700 transition whitespace-nowrap">Best Sellers</Link>
          <Link to="/category/Electronics" className="hover:text-green-700 transition whitespace-nowrap">Electronics</Link>
          <Link to="/category/Phones" className="hover:text-green-700 transition whitespace-nowrap">Phones</Link>
          <Link to="/category/Home & Kitchen" className="hover:text-green-700 transition whitespace-nowrap">Home & Kitchen</Link>
          <Link to="/category/Fashion" className="hover:text-green-700 transition whitespace-nowrap">Fashion</Link>
          <Link to="/category/Beauty" className="hover:text-green-700 transition whitespace-nowrap">Beauty</Link>
          <Link to="/category/Sports" className="hover:text-green-700 transition whitespace-nowrap">Sports</Link>
          <Link to="/user/saved" className="hover:text-green-700 transition whitespace-nowrap flex items-center gap-1">
            <FiHeart size={14} /> Saved
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;