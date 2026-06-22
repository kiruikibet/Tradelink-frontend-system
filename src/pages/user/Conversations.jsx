import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getConversations } from "../../services/marketplaceService";

function Conversations() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations()
      .then(setConversations)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiMessageCircle /> Messages
        </h2>

        {loading ? (
          <Loader />
        ) : conversations.length === 0 ? (
          <EmptyState
            icon="💬"
            title="No conversations yet"
            message="Start chatting with sellers or buyers to see your messages here."
          />
        ) : (
          <div className="space-y-2">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/user/messages/${c.id}`)}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-green-200 transition text-left"
              >
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
                  {(c.seller || c.buyer)?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{c.product_name || `${c.buyer} and ${c.seller}`}</p>
                  <p className="text-xs text-gray-500 truncate">{c.last_message || "No messages yet"}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{new Date(c.updated_at).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default Conversations;
