import { useState } from "react";
import { FiX, FiStar } from "react-icons/fi";
import Button from "../common/Button";

function LeaveReviewModal({ target, onSubmit, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!target) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Leave a Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Rate your experience with <span className="font-semibold text-gray-800">{target}</span>
        </p>

        {/* Star rating */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="text-3xl transition"
            >
              <FiStar
                className={`${star <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} transition`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Share your experience..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 resize-none mb-4"
        />

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            onClick={() => onSubmit({ rating, comment })}
            disabled={!rating}
            className="flex-1"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LeaveReviewModal;
