import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function DisputeResolution() {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: fetch resolution from API

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
          <FiCheckCircle className="text-5xl text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Dispute Resolved</h2>
          <p className="text-sm text-gray-400 mb-8">Dispute #{id}</p>
          <p className="text-gray-400 text-sm">
            Resolution outcome will appear here once connected to the API.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

export default DisputeResolution;
