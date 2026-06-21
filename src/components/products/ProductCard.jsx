import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiMessageCircle } from "react-icons/fi";
import { BASE_URL } from "../../utils/constants";

function resolveImage(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
}

function ProductCard({ product }) {
  const id = product.product_id ?? product.id;
  const name = product.name;
  const price = product.price
    ? `KSh ${Number(product.price).toLocaleString()}`
    : "—";
  const seller = product.user ?? product.seller ?? "Seller";
  const category = product.category_name ?? product.category ?? "";
  const firstImage = resolveImage(product.images?.[0]?.image ?? null);
  const sellerImage = resolveImage(product.user_profile_image ?? null);
  const fallback = "🛍️";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <Link to={`/products/${id}`} className="block relative bg-gray-50">
        <button className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-red-500 z-10">
          <FiHeart />
        </button>

        <div className="h-40 flex items-center justify-center overflow-hidden">
          {firstImage ? (
            <img src={firstImage} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-6xl">{fallback}</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link to={`/products/${id}`}>
          <h3 className="text-sm font-medium text-gray-800 truncate hover:text-green-700">
            {name}
          </h3>
        </Link>

        <p className="text-green-700 font-bold text-lg mt-1">{price}</p>

        <div className="flex items-center gap-2 mt-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center overflow-hidden shrink-0 text-xs font-bold">
            {sellerImage ? (
              <img src={sellerImage} alt={seller} className="w-full h-full object-cover" />
            ) : (
              seller.charAt(0).toUpperCase()
            )}
          </div>
          <p className="text-xs text-gray-600 truncate">
            Seller: <span className="font-semibold">{seller}</span>
          </p>
        </div>

        {category && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <FiMapPin />
            <span>{category}</span>
          </div>
        )}

        <Link
          to={`/user/messages/${seller}`}
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
  const id = product.product_id ?? product.id;
  const firstImage = resolveImage(product.images?.[0]?.image ?? null);
  const fallback = "🛍️";
  const price = product.price
    ? `KSh ${Number(product.price).toLocaleString()}`
    : "—";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
      <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden">
        {firstImage ? (
          <img src={firstImage} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl">{fallback}</span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-xs font-medium text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm font-bold text-green-700 mt-1">{price}</p>
        <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
          Active
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
