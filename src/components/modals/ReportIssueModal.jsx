import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import Button from "../common/Button";

const REASONS = [
  "Item not as described",
  "Seller didn't show up",
  "Item not received",
  "Counterfeit item",
  "Other",
];

function ReportIssueModal({ orderId, onSubmit, onClose }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-red-500 text-xl" />
            <h3 className="font-bold text-lg">Report an Issue</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">Order #{orderId}</p>

        <div className="space-y-2 mb-4">
          {REASONS.map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
                className="accent-green-700"
              />
              <span className="text-sm">{r}</span>
            </label>
          ))}
        </div>

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          placeholder="Describe the issue in detail..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 resize-none mb-4"
        />

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            variant="danger"
            onClick={() => onSubmit({ reason, details })}
            disabled={!reason}
            className="flex-1"
          >
            Submit Dispute
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportIssueModal;
