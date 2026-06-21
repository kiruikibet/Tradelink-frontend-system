import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import api from "../../services/apiClient";
import { deleteProduct } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";

function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/products/products/")
      .then(({ data }) => {
        setProducts(data.filter((p) => p.user === user?.username));
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.product_id !== id));
  };

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Listings</h2>
          <Link
            to="/products/create"
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition"
          >
            <FiPlus /> New Listing
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <EmptyState icon="📦" title="No listings yet" message="Create your first listing." />
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.product_id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {p.images?.[0] && (
                    <img src={p.images[0].image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category_name}</p>
                  <p className="font-bold text-green-700 text-sm mt-1">
                    KSh {Number(p.price).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/products/edit/${p.product_id}`)}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default MyListings;
