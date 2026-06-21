import { FiX, FiCheckCircle } from "react-icons/fi";
import Button from "../common/Button";

function TransactionCompletionModal({ transaction, onConfirm, onClose }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-600 text-xl" />
            <h3 className="font-bold text-lg">Confirm Item Receipt</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Confirm that you have received <span className="font-semibold">{transaction.product}</span>{" "}
          and are satisfied with the condition. This will release the funds to the seller.
        </p>

        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-5 text-sm text-yellow-800">
          Once confirmed, this action cannot be undone.
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Not Yet
          </Button>
          <Button onClick={() => onConfirm(transaction)} className="flex-1">
            Yes, I Received It
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionCompletionModal;
