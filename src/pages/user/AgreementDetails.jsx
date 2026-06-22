import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { confirmAgreement, getAgreement, rejectAgreement } from "../../services/marketplaceService";
import { useAuth } from "../../context/AuthContext";

function AgreementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgreement(id).then(setAgreement).finally(() => setLoading(false));
  }, [id]);

  const handleConfirm = async () => {
    const updated = await confirmAgreement(id);
    setAgreement(updated);
    if (updated.agreement_type === "booking") {
      navigate(`/user/payment/booking?agreement=${updated.id}&deposit=${updated.deposit_amount}`);
    } else {
      navigate(`/user/payment?agreement=${updated.id}&amount=${updated.amount}`);
    }
  };

  const handleReject = async () => {
    setAgreement(await rejectAgreement(id));
  };

  if (loading) return <PageShell><Loader fullScreen /></PageShell>;
  if (!agreement) return <PageShell><p className="text-center py-20 text-red-500">Agreement not found.</p></PageShell>;

  const canReview = user?.username === agreement.buyer && agreement.status === "pending_buyer_confirmation";

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
                <p className="font-semibold text-gray-800 mt-1">#{agreement.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {agreement.status.replaceAll("_", " ")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-semibold text-gray-800">Product:</span> {agreement.product_name}</p>
              <p><span className="font-semibold text-gray-800">Seller:</span> {agreement.seller}</p>
              <p><span className="font-semibold text-gray-800">Buyer:</span> {agreement.buyer}</p>
              <p><span className="font-semibold text-gray-800">Type:</span> {agreement.agreement_type}</p>
              <p><span className="font-semibold text-gray-800">Amount:</span> KSh {Number(agreement.amount).toLocaleString()}</p>
              {agreement.agreement_type === "booking" && (
                <p><span className="font-semibold text-gray-800">Deposit:</span> KSh {Number(agreement.deposit_amount).toLocaleString()}</p>
              )}
              <p><span className="font-semibold text-gray-800">Meetup:</span> {agreement.meetup_location}</p>
              <p><span className="font-semibold text-gray-800">Date:</span> {new Date(agreement.meetup_at).toLocaleString()}</p>
            </div>
            {canReview && (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button onClick={handleConfirm} className="flex-1">
                  {agreement.agreement_type === "booking" ? "Confirm & Pay Deposit" : "Confirm & Pay"}
                </Button>
                <Button onClick={handleReject} variant="outline" className="flex-1">Reject</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AgreementDetails;
