import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {ProfileProductGrid} from "../../components/products/ProductGrid";
import { products } from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate= useNavigate();

const { user, loading, logout } = useAuth();

if (loading) return <h2>Loading...</h2>;
if (!user) return <h2>Please login first.</h2>;
 function handlelogout(){
   logout();
   navigate("/");
 }

const profileUser = {
  name: user.username,
  username: `@${user.username}`,
  avatar: user.username?.charAt(0).toUpperCase(),
  coverPost: "🛋️ 🪴 💡",
  bio: "Welcome to my TradeLink account.",
  location: "Kenya",
  joined: "New member",
  posts: 0,
  followers: 0,
  following: 0,
  rating: 0,
  sold: 0,
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Profile post / cover image */}
          <div className="h-48 bg-gradient-to-r from-green-950 to-gray-900 relative flex items-center justify-end pr-16 text-7xl">
            <span className="opacity-70">{profileUser.coverPost}</span>

            <button className="absolute right-6 bottom-5 bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold">
              Edit Profile
            </button>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-5">
            <div className="flex flex-col md:flex-row md:justify-between gap-6 -mt-14">
              <div className="flex gap-5">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-green-100 border-4 border-white shadow flex items-center justify-center text-6xl">
                    {profileUser.avatar}
                  </div>

                  <button className="absolute bottom-1 right-1 bg-gray-900 text-white w-8 h-8 rounded-full text-xs">
                    📷
                  </button>
                </div>

                <div className="pt-16 md:pt-14">
                  <h1 className="text-3xl font-bold">
                    {profileUser.name} <span className="text-green-700 text-lg">●</span>
                  </h1>

                  <p className="text-sm text-gray-500">{profileUser.username}</p>
                  <p className="text-sm text-gray-700 mt-2 max-w-xl">{profileUser.bio}</p>

                  <div className="flex gap-4 text-sm text-gray-500 mt-3">
                    <span>📍 {profileUser.location}</span>
                    <span>📅 {profileUser.joined}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 border border-gray-200 rounded-xl bg-white h-fit mt-4 md:mt-20">
                <Stat number={profileUser.posts} label="Posts" />
                <Stat number={products.followers} label="Followers" />
                <Stat number={profileUser.following} label="Following" />
                <Stat number={profileUser.rating} label="Rating" />
                <Stat number={profileUser.sold} label="Products Sold" />
              </div>
               <button onClick={handlelogout}>Logout</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t px-6 flex gap-8 text-sm font-medium">
            <button className="py-4 border-b-2 border-green-700 text-green-700">
              My Listings
            </button>
            <button className="py-4 text-gray-600">Reviews</button>
            <button className="py-4 text-gray-600">Saved Items</button>
            <button className="py-4 text-gray-600">About</button>
          </div>
        </section>

        {/* Posted products */}
        <section className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-5">My Posted Products</h2>

          <ProfileProductGrid products={products.slice(0, 6)} />

          <div className="flex justify-center mt-6">
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold">
              View All Listings
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="px-5 py-4 text-center border-r last:border-r-0">
      <p className="font-bold">{number}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default Profile;