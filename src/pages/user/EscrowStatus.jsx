import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { completeAgreement, getAgreement, openDispute } from "../../services/marketplaceService";
import { useAuth } from "../../context/AuthContext";

const STEPS = ["Payment Received", "In Escrow", "Item Delivered", "Funds Released"];

function EscrowStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgreement(id).then(setAgreement).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageShell><Loader fullScreen /></PageShell>;
  if (!agreement) return <PageShell><p className="text-center py-20 text-red-500">Transaction not found.</p></PageShell>;

  const currentStep = agreement.status === "completed" ? 3 : agreement.paid_at ? 1 : 0;
  const canAct = user?.username === agreement.buyer && ["in_escrow", "reserved"].includes(agreement.status);

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

          <p className="text-sm text-gray-400 mb-2">Transaction #{id}</p>
          <p className="font-semibold text-gray-800">{agreement.product_name}</p>
          <p className="text-sm text-gray-500 mb-8">
            KSh {Number(agreement.amount).toLocaleString()} · {agreement.status.replaceAll("_", " ")}
          </p>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    i <= currentStep ? "bg-green-700 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <p className={`text-sm font-medium ${i <= currentStep ? "text-gray-800" : "text-gray-400"}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          {canAct && (
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
              <Button onClick={async () => setAgreement(await completeAgreement(id))} className="flex-1">
                Item Received
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  const reason = window.prompt("Describe the issue");
                  if (!reason) return;
                  const dispute = await openDispute(id, { reason });
                  navigate(`/user/disputes/${dispute.id}`);
                }}
                className="flex-1"
              >
                Report Issue
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

export default EscrowStatus;
