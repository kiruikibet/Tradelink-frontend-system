import { FiX, FiFileText } from "react-icons/fi";
import Button from "../common/Button";

function PurchaseAgreementModal({ agreement, onConfirm, onClose }) {
  if (!agreement) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiFileText className="text-green-700 text-xl" />
            <h3 className="font-bold text-lg">Purchase Agreement</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Product</span>
            <span className="font-medium">{agreement.product}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-green-700">KSh {Number(agreement.amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500">Seller</span>
            <span className="font-medium">{agreement.seller}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Meetup</span>
            <span className="font-medium">{agreement.meetup || "To be arranged"}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          By confirming, funds will be held in escrow until you confirm receipt.
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => onConfirm(agreement)} className="flex-1">Confirm & Pay</Button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseAgreementModal;
