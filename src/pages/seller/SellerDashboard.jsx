import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiEye,
  FiPackage,
  FiPlus,
  FiSend,
  FiShield,
  FiStar,
} from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/apiClient";
import {
  submitSellerVerification,
  VERIFICATION_COPY,
} from "../../services/marketplaceService";

const VERIFICATION_STYLES = {
  not_submitted: "bg-gray-100 text-gray-700",
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function SellerDashboard() {
  const { user, updateUser } = useAuth();
  const [listingCount, setListingCount] = useState("-");
  const [verificationForm, setVerificationForm] = useState({
    government_id: "",
    selfie: "",
  });
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [submittingVerification, setSubmittingVerification] = useState(false);

  useEffect(() => {
    if (!user) return;
    api
      .get("/api/products/products/")
      .then(({ data }) => {
        const mine = data.filter((p) => p.user === user.username);
        setListingCount(mine.length);
      })
      .catch(() => {});
  }, [user]);

  const verificationStatus = user?.verification_status || "not_submitted";
  const verificationCopy =
    VERIFICATION_COPY[verificationStatus] || VERIFICATION_COPY.not_submitted;
  const isVerified = verificationStatus === "verified";
  const canSubmitVerification = ["not_submitted", "rejected"].includes(
    verificationStatus
  );

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setVerificationError("");
    setVerificationMessage("");

    if (!verificationForm.government_id || !verificationForm.selfie) {
      setVerificationError("Government ID and selfie links are required.");
      return;
    }

    setSubmittingVerification(true);
    try {
      const result = await submitSellerVerification(verificationForm);
      updateUser({
        account_type: "seller",
        verification_status: result.verification_status,
      });
      setVerificationForm({ government_id: "", selfie: "" });
      setVerificationMessage(result.message || "Verification submitted.");
    } catch (err) {
      setVerificationError(err.message || "Verification could not be submitted.");
    } finally {
      setSubmittingVerification(false);
    }
  };

  const stats = [
    { icon: <FiPackage />, label: "Active Listings", value: listingCount },
    { icon: <FiDollarSign />, label: "Total Sales", value: "-" },
    { icon: <FiEye />, label: "Profile Views", value: "-" },
    { icon: <FiStar />, label: "Rating", value: "-" },
  ];

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Seller Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back, {user?.username}
            </p>
          </div>
          {isVerified ? (
            <Link
              to="/products/create"
              className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition"
            >
              <FiPlus /> New Listing
            </Link>
          ) : (
            <span className="flex items-center gap-2 bg-gray-100 text-gray-400 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed">
              <FiPlus /> New Listing
            </span>
          )}
        </div>

        <section className="bg-white border border-gray-100 rounded-2xl p-5 mb-8">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-xl shrink-0">
              <FiShield />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-gray-900">Seller verification</h3>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    VERIFICATION_STYLES[verificationStatus] ||
                    VERIFICATION_STYLES.not_submitted
                  }`}
                >
                  {verificationCopy.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {verificationCopy.description}
              </p>
            </div>
          </div>

          {verificationMessage && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              {verificationMessage}
            </div>
          )}
          {verificationError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {verificationError}
            </div>
          )}

          {canSubmitVerification && (
            <form
              onSubmit={handleVerificationSubmit}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 mt-5"
            >
              <input
                type="url"
                value={verificationForm.government_id}
                onChange={(e) =>
                  setVerificationForm({
                    ...verificationForm,
                    government_id: e.target.value,
                  })
                }
                placeholder="Government ID image URL"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
              />
              <input
                type="url"
                value={verificationForm.selfie}
                onChange={(e) =>
                  setVerificationForm({
                    ...verificationForm,
                    selfie: e.target.value,
                  })
                }
                placeholder="Selfie image URL"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
              />
              <button
                type="submit"
                disabled={submittingVerification}
                className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition disabled:opacity-60"
              >
                <FiSend />
                {submittingVerification ? "Submitting" : "Submit"}
              </button>
            </form>
          )}
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 text-xl mb-3">
                {s.icon}
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "My Listings",
              to: "/seller/listings",
              desc: "View and manage your products",
            },
            {
              label: "Analytics",
              to: "/seller/analytics",
              desc: "Sales and performance data",
            },
            { label: "Orders", to: "/user/orders", desc: "Track your active orders" },
            { label: "Messages", to: "/user/messages", desc: "Buyer conversations" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-green-200 transition"
            >
              <p className="font-semibold">{item.label}</p>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default SellerDashboard;
