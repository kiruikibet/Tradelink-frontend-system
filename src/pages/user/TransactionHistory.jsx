import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function TransactionHistory() {
  // TODO: fetch from payments API
  const transactions = [];

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

        {transactions.length === 0 ? (
          <EmptyState icon="🧾" title="No transactions yet" message="Your payment history will appear here." />
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-sm">{t.description}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
                <span
                  className={`font-bold text-sm ${
                    t.type === "credit" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.type === "credit" ? "+" : "-"}KSh {Number(t.amount).toLocaleString()}
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
