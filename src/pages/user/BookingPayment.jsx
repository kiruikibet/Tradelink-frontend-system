import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Button from "../../components/common/Button";

function BookingPayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const agreementId = searchParams.get("agreement");
  const deposit = searchParams.get("deposit") || "0";
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: call booking deposit payment API
    setTimeout(() => navigate("/user/payment/success"), 1500);
  };

  return (
    <PageShell>
      <div className="max-w-md mx-auto px-4 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-1">Booking Deposit</h2>
          <p className="text-sm text-gray-500 mb-6">Agreement #{agreementId}</p>

          <div className="bg-yellow-50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-sm text-gray-600">Deposit Amount</span>
            <span className="text-2xl font-extrabold text-yellow-700">
              KSh {Number(deposit).toLocaleString()}
            </span>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2">
              <FiLock size={14} />
              {submitting ? "Processing..." : "Pay Deposit"}
            </Button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

export default BookingPayment;
