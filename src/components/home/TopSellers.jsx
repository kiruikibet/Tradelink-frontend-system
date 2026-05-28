import { FiUserCheck } from "react-icons/fi";
import { topSellers } from "../../data/sellers";

function TopSellers() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Top Sellers</h2>
        <button className="text-green-700 font-semibold text-sm">
          View all sellers →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {topSellers.map((seller, index) => (
          <button
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center text-3xl">
              {seller.icon}
            </div>
            <h3 className="mt-3 font-semibold text-sm">{seller.name}</h3>
            <p className="mt-1 text-xs text-green-700 flex justify-center items-center gap-1">
              <FiUserCheck />
              {seller.points} Trust Points
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TopSellers;
