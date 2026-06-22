import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getNotifications } from "../../services/marketplaceService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications().then(setNotifications).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>

        {loading ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <EmptyState icon="🔔" title="No notifications" message="You're all caught up." />
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <Link
                key={n.id}
                to={n.link || "#"}
                className={`bg-white rounded-2xl border p-4 text-sm ${
                  n.unread ? "border-green-200 bg-green-50" : "border-gray-100"
                }`}
              >
                <p className="font-medium text-gray-800">{n.title}</p>
                <p className="text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default Notifications;
