import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiDollarSign, FiEye, FiStar, FiPlus } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiClient";

function SellerDashboard() {
  const { user } = useAuth();
  const [listingCount, setListingCount] = useState("—");

  useEffect(() => {
    if (!user) return;
    api.get("/api/products/products/")
      .then(({ data }) => {
        const mine = data.filter((p) => p.user === user.username);
        setListingCount(mine.length);
      })
      .catch(() => {});
  }, [user]);

  const stats = [
    { icon: <FiPackage />, label: "Active Listings", value: listingCount },
    { icon: <FiDollarSign />, label: "Total Sales", value: "—" },
    { icon: <FiEye />, label: "Profile Views", value: "—" },
    { icon: <FiStar />, label: "Rating", value: "—" },
  ];

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Seller Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.username}</p>
          </div>
          <Link
            to="/products/create"
            className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition"
          >
            <FiPlus /> New Listing
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 text-xl mb-3">
                {s.icon}
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "My Listings", to: "/seller/listings", desc: "View and manage your products" },
            { label: "Analytics", to: "/seller/analytics", desc: "Sales and performance data" },
            { label: "Orders", to: "/user/orders", desc: "Track your active orders" },
            { label: "Messages", to: "/user/messages", desc: "Buyer conversations" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-green-200 transition"
            >
              <p className="font-semibold">{item.label}</p>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default SellerDashboard;
