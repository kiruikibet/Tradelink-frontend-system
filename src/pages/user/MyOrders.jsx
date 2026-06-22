import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getAgreements } from "../../services/marketplaceService";

const STATUS_COLORS = {
  in_escrow: "bg-blue-100 text-blue-700",
  reserved: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  pending_buyer_confirmation: "bg-yellow-100 text-yellow-700",
  awaiting_payment: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-600",
  disputed: "bg-red-100 text-red-600",
};

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgreements().then(setOrders).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <EmptyState icon="📦" title="No orders yet" message="Your orders will appear here once you make a purchase." />
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => navigate(`/user/orders/${o.id}`)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:border-green-200 transition text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {o.product_image && <img src={o.product_image} className="w-full h-full object-cover" alt="" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{o.product_name}</p>
                  <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-bold text-sm">KSh {Number(o.amount).toLocaleString()}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-600"}`}>
                    {o.status.replaceAll("_", " ")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default MyOrders;
