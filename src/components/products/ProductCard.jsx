import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiMessageCircle, FiUserCheck } from "react-icons/fi";

function ProductCard({ product }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      {product.discount && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {product.discount}
        </span>
      )}

      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
        <FiHeart />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="h-36 flex items-center justify-center bg-gray-50 rounded-lg text-6xl">
          {product.image}
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-800 line-clamp-2 hover:text-green-700">
          {product.name}
        </h3>
      </Link>

      <p className="mt-2 text-green-700 font-bold text-lg">{product.price}</p>

      {product.oldPrice && (
        <p className="text-gray-400 text-sm line-through">{product.oldPrice}</p>
      )}

      <div className="mt-3 text-sm">
        <span className="text-yellow-500">★</span>
        <span className="font-medium ml-1">{product.rating}</span>
        <span className="text-gray-500 ml-1">({product.reviews})</span>
      </div>

      <Link
        to={`/seller/${product.sellerId || product.id}`}
        className="mt-3 flex items-center justify-between border-t pt-3"
      >
        <div>
          <p className="text-xs text-gray-500">Seller</p>
          <p className="text-sm font-semibold text-gray-800 hover:text-green-700">
            {product.seller}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-green-700 font-semibold">
          <FiUserCheck />
          {product.trustPoints}
        </div>
      </Link>

      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
        <FiMapPin />
        <span>{product.location}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/messages?seller=${product.sellerId || product.id}&product=${product.id}`}
          className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
        >
          <FiMessageCircle />
          Message Seller
        </Link>

        <button className="w-11 border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center justify-center">
          <FiHeart />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;