import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { getDisputes, resolveDispute } from "../../services/marketplaceService";

function DisputeManagement() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisputes().then(setDisputes).finally(() => setLoading(false));
  }, []);

  const handleResolve = async (id, decision) => {
    const resolution = window.prompt("Resolution note") || "";
    const updated = await resolveDispute(id, { decision, resolution });
    setDisputes((current) => current.map((d) => (d.id === id ? updated : d)));
  };

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Dispute Management</h2>

        {loading ? (
          <Loader />
        ) : disputes.length === 0 ? (
          <EmptyState icon="⚖️" title="No disputes" message="Open disputes will appear here." />
        ) : (
          <div className="space-y-3">
            {disputes.map((d) => (
              <div key={d.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{d.product_name}</p>
                    <p className="text-sm text-gray-500">{d.reason}</p>
                    <p className="text-xs text-gray-400 mt-1">{d.status.replaceAll("_", " ")}</p>
                  </div>
                  {["open", "under_review"].includes(d.status) && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleResolve(d.id, "refund_buyer")} variant="outline">
                        Refund Buyer
                      </Button>
                      <Button onClick={() => handleResolve(d.id, "release_seller")}>
                        Release Seller
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default DisputeManagement;
