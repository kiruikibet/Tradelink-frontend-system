import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/passwordResetService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await forgotPassword(email);
      setMessage(data.message || "Reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <Link to="/" className="text-2xl font-bold block mb-8">
          Trade<span className="text-green-700">Link</span>
        </Link>

        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Enter the email linked to your account and we'll send a reset link.
        </p>

        {message && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold text-sm disabled:opacity-60 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
