import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiFileText } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function AgreementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: fetch agreement by id from API

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiFileText className="text-2xl text-green-700" />
            <h2 className="text-xl font-bold">Agreement Details</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Agreement ID</p>
                <p className="font-semibold text-gray-800 mt-1">#{id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-center py-10">
              Agreement data will appear here once connected to the API.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AgreementDetails;
