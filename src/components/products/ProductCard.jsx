import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiMessageCircle } from "react-icons/fi";

function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative bg-gray-50">
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        )}

        <button className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-red-500">
          <FiHeart />
        </button>

        <div className="h-40 flex items-center justify-center text-6xl">
          {product.image}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 truncate hover:text-green-700">
            {product.name}
          </h3>
        </Link>

        <p className="text-green-700 font-bold text-lg mt-1">
          {product.price}
        </p>

        {product.oldPrice && (
          <p className="text-gray-400 text-xs line-through">
            {product.oldPrice}
          </p>
        )}

        <div className="flex items-center gap-1 text-xs mt-1">
          <span className="text-yellow-500">★</span>
          <span>{product.rating}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        <p className="text-xs text-gray-600 mt-1 truncate">
          Seller: <span className="font-semibold">{product.seller}</span>
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <FiMapPin />
          <span>{product.location}</span>
        </div>

        <Link
          to={`/messages?seller=${product.sellerId || product.id}&product=${product.id}`}
          className="mt-3 w-full bg-green-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-800"
        >
          <FiMessageCircle />
          Message Seller
        </Link>
      </div>
    </div>
  );
}

 export function ProfileProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
      <div className="h-32 bg-gray-50 flex items-center justify-center text-6xl">
        {product.image}
      </div>

      <div className="p-3">
        <h3 className="text-xs font-medium text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-sm font-bold text-green-700 mt-1">
          {product.price}
        </p>

        <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
          Active
        </span>

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
          <span>👁 {product.views || 125}</span>
          <span>♡ {product.likes || 12}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;