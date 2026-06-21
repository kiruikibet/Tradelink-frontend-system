import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/passwordResetService";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!uid || !token) return setError("This password reset link is invalid.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    try {
      setLoading(true);
      const data = await resetPassword(uid, token, password);
      setMessage(data.message || "Password reset successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <Link to="/" className="text-2xl font-bold block mb-8">
          Trade<span className="text-green-700">Link</span>
        </Link>

        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Choose a strong password for your account.
        </p>

        {message && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            {message} Redirecting to login...
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              required
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !!message}
            className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold text-sm disabled:opacity-60 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          <Link to="/login" className="text-green-700 font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
