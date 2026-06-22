import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import { getDispute } from "../../services/marketplaceService";

function DisputeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dispute, setDispute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDispute(id).then(setDispute).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageShell><Loader fullScreen /></PageShell>;

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiAlertTriangle className="text-2xl text-yellow-500" />
            <h2 className="text-xl font-bold">Dispute Details</h2>
          </div>
          <p className="text-sm text-gray-400 mb-6">Dispute #{id}</p>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Product:</span> {dispute.product_name}</p>
            <p><span className="font-semibold">Opened by:</span> {dispute.opened_by}</p>
            <p><span className="font-semibold">Status:</span> {dispute.status.replaceAll("_", " ")}</p>
            <p><span className="font-semibold">Reason:</span> {dispute.reason}</p>
            {dispute.evidence && <p><span className="font-semibold">Evidence:</span> {dispute.evidence}</p>}
            {dispute.resolution && <p><span className="font-semibold">Resolution:</span> {dispute.resolution}</p>}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default DisputeDetails;
