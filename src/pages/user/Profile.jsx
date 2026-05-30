import Footer from "../../components/layout/Footer";
import { ProfileProductGrid } from "../../components/products/ProductGrid";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FiArrowLeft, FiMapPin, FiLogOut, FiPlus } from "react-icons/fi";
import { uploadToCloudinary } from "../../services/uploadService";
import { updateAvatar } from "../../services/authService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

function Profile() {
  const navigate = useNavigate();
  const { user, loading, logout, updateUser } = useAuth();
  const { products: allProducts, loading: productsLoading } = useProducts();
  const [activeTab, setActiveTab] = useState("listings");
  const [avatarUrl, setAvatarUrl] = useState(user?.profile_picture || null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setAvatarUrl(localUrl);
    setAvatarUploading(true);

    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file);

      // 2. Send URL to backend
      await updateAvatar(imageUrl);

      setAvatarUrl(imageUrl);
      updateUser({ profile_picture: imageUrl });
    } catch {
      // revert preview on failure
      setAvatarUrl(user?.profile_picture || null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    setAvatarUrl(user?.profile_picture || null);
  }, [user?.profile_picture]);

  if (loading) return <Loader fullScreen />;
  if (!user) {
    navigate("/login");
    return null;
  }

  // filter to only this user's products
  const myProducts = allProducts.filter((p) => p.user === user.username);

  const displayName = user.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user.username;

  const tabs = [
    { key: "listings", label: "Listings" },
    { key: "reviews", label: "Reviews" },
    { key: "saved", label: "Saved" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top profile banner ── */}
      <div className="w-full bg-gradient-to-br from-green-900 via-green-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg px-3 py-2 transition"
          >
            <FiArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row md:items-center gap-5">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl ring-4 ring-white/20 select-none overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                user.username?.charAt(0).toUpperCase()
              )}
            </div>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={avatarUploading}
              className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition disabled:opacity-60"
            >
              {avatarUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiPlus size={16} />
              )}
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{displayName}</h1>
            <p className="text-green-300 text-sm mt-0.5">@{user.username}</p>
            <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
              <FiMapPin size={11} />
              <span>Kenya</span>
            </div>
            <p className="text-gray-300 text-sm mt-2 max-w-lg leading-relaxed">
              Welcome to my TradeLink store. Browse my listings and feel free to message me.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              {[[myProducts.length, "Listings"], ["128", "Followers"], ["64", "Following"], ["0", "Sold"]].map(([n, l]) => (
                <div key={l} className="flex flex-col">
                  <span className="text-lg font-bold">{n}</span>
                  <span className="text-xs text-gray-400">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 shrink-0 self-start md:self-end">
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold px-5 py-2.5 rounded-xl transition">
              Edit Profile
            </button>
            <Link
              to="/products/create"
              className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >
              + Create Product
            </Link>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-red-500/30 text-red-300 flex items-center justify-center border border-white/10 transition"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-1 border-t border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === tab.key
                  ? "border-green-400 text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {activeTab === "listings" && (
          <>
            {productsLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : myProducts.length > 0 ? (
              <>
                <ProfileProductGrid products={myProducts} />
                <div className="flex justify-center mt-8">
                  <button className="text-sm text-green-700 font-semibold hover:underline">
                    View all listings
                  </button>
                </div>
              </>
            ) : (
              <EmptyState
                icon="🛍️"
                title="No listings yet"
                description="Create your first product to get started"
                action={
                  <Link to="/products/create" className="bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-green-500 transition">
                    + Create Product
                  </Link>
                }
              />
            )}
          </>
        )}

        {activeTab === "reviews" && (
          <EmptyState icon="⭐" title="No reviews yet" description="Reviews from buyers will appear here" />
        )}

        {activeTab === "saved" && (
          <EmptyState icon="🔖" title="Nothing saved yet" description="Items you save will show up here" />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
