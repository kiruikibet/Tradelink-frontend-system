import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import api from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    api
      .get(`/api/products/products/${id}/`)
      .then(({ data }) => setProduct(data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageShell><Loader fullScreen /></PageShell>;
  if (error) return <PageShell><p className="text-center py-20 text-red-500">{error}</p></PageShell>;

  const images = product.images?.length ? product.images : [];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              {images[activeImage] ? (
                <img
                  src={images[activeImage].image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-5xl">📦</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={img.image_id}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      i === activeImage ? "border-green-600" : "border-transparent"
                    }`}
                  >
                    <img src={img.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                {product.category_name}
              </span>
              <h1 className="text-2xl font-bold mt-3">{product.name}</h1>
              <p className="text-3xl font-extrabold text-green-700 mt-2">
                KSh {Number(product.price).toLocaleString()}
              </p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
                {product.user?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{product.user}</p>
                <p className="text-xs text-gray-500">Seller</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {user && user.username !== product.user ? (
                <Button
                  onClick={() => navigate(`/user/messages/${product.user}`)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FiMessageCircle /> Chat with Seller
                </Button>
              ) : !user ? (
                <Button onClick={() => navigate("/login")} className="w-full">
                  Login to Contact Seller
                </Button>
              ) : null}
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50 transition">
                  <FiHeart /> Save
                </button>
                <button className="flex-1 border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50 transition">
                  <FiShare2 /> Share
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400">Listed on {product.created_at}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default ProductDetails;
