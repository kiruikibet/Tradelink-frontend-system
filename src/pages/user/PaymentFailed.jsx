import { Link, useNavigate } from "react-router-dom";
import { FiXCircle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <FiXCircle className="text-7xl text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold">Payment Failed</h2>
        <p className="text-gray-500 mt-3">
          Something went wrong with your payment. No money was charged.
        </p>
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="border border-gray-200 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

export default PaymentFailed;
