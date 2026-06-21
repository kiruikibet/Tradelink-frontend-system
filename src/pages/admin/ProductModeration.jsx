import { useEffect, useState } from "react";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import api from "../../services/apiClient";

function ProductModeration() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/products/products/").then(({ data }) => setProducts(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Product Moderation</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Product", "Seller", "Category", "Price", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.product_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium truncate max-w-xs">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.user}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category_name}</td>
                    <td className="px-4 py-3">KSh {Number(p.price).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-red-500 hover:underline mr-3">Remove</button>
                      <button className="text-xs text-gray-500 hover:underline">Flag</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default ProductModeration;
