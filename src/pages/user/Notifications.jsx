import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function Notifications() {
  // TODO: fetch from notifications API
  const notifications = [];

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>

        {notifications.length === 0 ? (
          <EmptyState icon="🔔" title="No notifications" message="You're all caught up." />
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white rounded-2xl border p-4 text-sm ${
                  n.unread ? "border-green-200 bg-green-50" : "border-gray-100"
                }`}
              >
                <p className="font-medium text-gray-800">{n.title}</p>
                <p className="text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default Notifications;
