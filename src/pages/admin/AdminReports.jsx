import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import api from "../../services/apiClient";

function AdminReports() {
  const [stats, setStats] = useState({ users: "—", products: "—" });

  useEffect(() => {
    Promise.allSettled([
      api.get("/api/auth/users/"),
      api.get("/api/products/products/"),
    ]).then(([u, p]) => {
      setStats({
        users: u.status === "fulfilled" ? u.value.data.length : "—",
        products: p.status === "fulfilled" ? p.value.data.length : "—",
      });
    });
  }, []);

  const metrics = [
    { label: "Total Users", value: stats.users },
    { label: "Total Listings", value: stats.products },
    { label: "Transactions (30d)", value: "—" },
    { label: "Dispute Rate", value: "—" },
  ];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs text-gray-400 uppercase font-semibold">{label}</p>
              <p className="text-3xl font-extrabold mt-2">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Platform Activity</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            Charts will appear here once transaction APIs are connected.
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AdminReports;
