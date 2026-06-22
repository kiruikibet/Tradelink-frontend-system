import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getPayments } from "../../services/marketplaceService";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPayments().then(setTransactions).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

        {loading ? (
          <Loader />
        ) : transactions.length === 0 ? (
          <EmptyState icon="🧾" title="No transactions yet" message="Your payment history will appear here." />
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-sm">{t.product_name} · {t.status}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(t.created_at).toLocaleString()} · {t.reference}
                  </p>
                </div>
                <span className={`font-bold text-sm ${t.status === "released" ? "text-green-600" : "text-red-500"}`}>
                  KSh {Number(t.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default TransactionHistory;
