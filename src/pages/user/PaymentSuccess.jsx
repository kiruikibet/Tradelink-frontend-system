import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function PaymentSuccess() {
  return (
    <PageShell>
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <FiCheckCircle className="text-7xl text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold">Payment Successful</h2>
        <p className="text-gray-500 mt-3">
          Your payment has been processed and is held securely in escrow.
        </p>
        <div className="flex flex-col gap-3 mt-8">
          <Link
            to="/user/orders"
            className="bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
          >
            View Orders
          </Link>
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

export default PaymentSuccess;
