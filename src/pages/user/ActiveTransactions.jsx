import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getAgreements } from "../../services/marketplaceService";

function ActiveTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgreements()
      .then((items) =>
        setTransactions(
          items.filter((a) => !["completed", "rejected", "expired", "cancelled"].includes(a.status))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Active Transactions</h2>

        {loading ? (
          <Loader />
        ) : transactions.length === 0 ? (
          <EmptyState
            icon="🔄"
            title="No active transactions"
            message="Ongoing purchases and sales will appear here."
          />
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(`/user/escrow/${t.id}`)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:border-green-200 transition text-left"
              >
                <div>
                  <p className="font-semibold text-sm">{t.product_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t.agreement_type} · {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">KSh {Number(t.amount).toLocaleString()}</p>
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                    {t.status.replaceAll("_", " ")}
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

export default ActiveTransactions;
