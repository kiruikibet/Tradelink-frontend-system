import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-extrabold text-green-700">404</p>
      <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
