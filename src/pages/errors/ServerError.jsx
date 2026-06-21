import { useNavigate } from "react-router-dom";

function ServerError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-extrabold text-red-400">500</p>
      <h2 className="text-2xl font-bold mt-4">Something Went Wrong</h2>
      <p className="text-gray-500 mt-2">An unexpected error occurred. Please try again later.</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
      >
        Go Back
      </button>
    </div>
  );
}

export default ServerError;
