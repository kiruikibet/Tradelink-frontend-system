import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiPackage, FiDollarSign, FiAlertTriangle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import api from "../../services/apiClient";

function AdminDashboard() {
  const [counts, setCounts] = useState({ users: "—", products: "—" });

  useEffect(() => {
    Promise.allSettled([
      api.get("/api/auth/users/"),
      api.get("/api/products/products/"),
    ]).then(([usersRes, productsRes]) => {
      setCounts({
        users: usersRes.status === "fulfilled" ? usersRes.value.data.length : "—",
        products: productsRes.status === "fulfilled" ? productsRes.value.data.length : "—",
      });
    });
  }, []);

  const stats = [
    { icon: <FiUsers />, label: "Total Users", value: counts.users, to: "/admin/users" },
    { icon: <FiPackage />, label: "Products", value: counts.products, to: "/admin/products" },
    { icon: <FiDollarSign />, label: "Transactions", value: "—", to: "/admin/transactions" },
    { icon: <FiAlertTriangle />, label: "Open Disputes", value: "—", to: "/admin/disputes" },
  ];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-green-200 transition"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 text-xl mb-3">
                {s.icon}
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "User Management", to: "/admin/users" },
            { label: "Product Moderation", to: "/admin/products" },
            { label: "Transaction Management", to: "/admin/transactions" },
            { label: "Dispute Management", to: "/admin/disputes" },
            { label: "Reports & Analytics", to: "/admin/reports" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-white rounded-2xl border border-gray-100 p-4 font-semibold text-sm hover:border-green-200 transition"
            >
              {item.label} →
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default AdminDashboard;
