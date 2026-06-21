import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLock, FiBell, FiTrash2 } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

function AccountSettings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({ email: true, push: false });

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        <div className="space-y-4">
          {/* Password */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="text-green-700" />
              <h3 className="font-semibold">Change Password</h3>
            </div>
            <Button onClick={() => navigate("/forgot-password")} variant="outline" className="w-full">
              Reset Password via Email
            </Button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <FiBell className="text-green-700" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { key: "email", label: "Email Notifications" },
                { key: "push", label: "Push Notifications" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">{label}</span>
                  <div
                    onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      notifications[key] ? "bg-green-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        notifications[key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-2xl border border-red-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <FiTrash2 className="text-red-500" />
              <h3 className="font-semibold text-red-600">Danger Zone</h3>
            </div>
            <div className="space-y-3">
              <Button onClick={logout} variant="danger" className="w-full">
                Logout
              </Button>
              <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AccountSettings;
