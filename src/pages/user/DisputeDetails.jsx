import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function DisputeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: fetch dispute from API

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
          <p className="text-sm text-gray-400 mb-8">Dispute #{id}</p>
          <p className="text-center text-gray-400 py-10 text-sm">
            Dispute data will appear here once connected to the API.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

export default DisputeDetails;
