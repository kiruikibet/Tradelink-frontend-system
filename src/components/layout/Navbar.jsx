import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiTruck,
  FiRefreshCw,
  FiPhone,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiMessageCircle,
  FiBell,
} from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[user, setUser] = useState(null);

  useEffect(() => {
    const getUser =async()=>{
      const token= localStorage.getItem('token');
      if(!token){
        setIsLoggedIn(false);
        setUser(null);
        return;
      }
      try{
        const response =await fetch('http://127.0.1:8000/api/user/profile/',{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type':'application/json'
          }
        });

        const data = await response.json();
        if(response.ok){
          setIsLoggedIn(true);
          setUser(data);
        }else{
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
        }
      }catch(error){
        console.error('Error fetching user profile:', error);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
      }
   };  getUser();
  },[]);


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
            <div className="flex flex-1 h-12 border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="flex-1 px-5 outline-none text-gray-700"
              />

              <button className="w-16 bg-green-800 text-white flex items-center justify-center text-xl">
                <FiSearch />
              </button>
            </div>
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

                  <span className="absolute -top-3 left-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>

                <Link to="/user/notifications" className="relative flex items-center gap-2 font-medium">
                  <FiBell className="text-2xl" />
                  <span className="absolute -top-3 left-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    5
                  </span>
                </Link>
              </>
            )}
            {isLoggedIn ? (
              <Link
                to="/user/profile"
                className="flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  {user.avatar}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-green-700 font-medium">
                    {user.trustPoints} Trust Points
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
          <a href="#">Deals</a>
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>
          <a href="#">Electronics</a>
          <a href="#">Phones</a>
          <a href="#">Home & Kitchen</a>
          <a href="#">Fashion</a>
          <a href="#">Beauty</a>
          <a href="#">Sports</a>
          <a href="#">Toys & Games</a>
          <a href="#">Automotive</a>
          <a href="#" className="flex items-center gap-1">
            More <FiChevronDown />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;