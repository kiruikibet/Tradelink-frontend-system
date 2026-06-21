import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function DisputeManagement() {
  // TODO: fetch from admin disputes API
  const disputes = [];

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Dispute Management</h2>

        {disputes.length === 0 ? (
          <EmptyState icon="⚖️" title="No disputes" message="Open disputes will appear here." />
        ) : null}
      </div>
    </PageShell>
  );
}

export default DisputeManagement;
