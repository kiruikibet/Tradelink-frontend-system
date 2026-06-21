import { useNavigate } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function CompletedTransactions() {
  const navigate = useNavigate();
  // TODO: fetch from transactions API
  const transactions = [];

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Completed Transactions</h2>

        {transactions.length === 0 ? (
          <EmptyState
            icon="✅"
            title="No completed transactions"
            message="Your completed purchases and sales will appear here."
          />
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(`/user/orders/${t.orderId}`)}
                className="w-full bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:border-green-200 transition text-left"
              >
                <div>
                  <p className="font-semibold text-sm">{t.product}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role} · {t.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">KSh {Number(t.amount).toLocaleString()}</p>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                    Completed
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

export default CompletedTransactions;
