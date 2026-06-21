import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

function AccessDenied() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <FiLock className="text-6xl text-red-400 mb-4" />
      <h2 className="text-2xl font-bold">Access Denied</h2>
      <p className="text-gray-500 mt-2">You don't have permission to view this page.</p>
      <Link
        to="/"
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default AccessDenied;
