import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

const STEPS = ["Payment Received", "In Escrow", "Item Delivered", "Funds Released"];

function EscrowStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentStep = 1; // TODO: derive from API data

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="text-2xl text-green-700" />
            <h2 className="text-xl font-bold">Escrow Status</h2>
          </div>

          <p className="text-sm text-gray-400 mb-8">Transaction #{id}</p>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    i <= currentStep
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <p
                  className={`text-sm font-medium ${
                    i <= currentStep ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default EscrowStatus;
