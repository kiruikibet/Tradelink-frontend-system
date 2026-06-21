import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function TransactionManagement() {
  // TODO: fetch from admin transactions API
  const transactions = [];

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Transaction Management</h2>

        {transactions.length === 0 ? (
          <EmptyState icon="💳" title="No transactions" message="Transactions will appear here." />
        ) : null}
      </div>
    </PageShell>
  );
}

export default TransactionManagement;
