import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiStar } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function SellerReviews() {
  const { username } = useParams();
  const navigate = useNavigate();
  // TODO: fetch seller reviews from API
  const reviews = [];

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <h2 className="text-xl font-bold mb-6">Reviews for @{username}</h2>

        {reviews.length === 0 ? (
          <EmptyState icon="⭐" title="No reviews yet" message="This seller has no reviews yet." />
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < r.rating ? "text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{r.user} · {r.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default SellerReviews;
