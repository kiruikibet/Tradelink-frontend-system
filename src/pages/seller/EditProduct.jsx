import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import api from "../../services/apiClient";
import { getCategories } from "../../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });

  useEffect(() => {
    Promise.all([
      api.get(`/api/products/products/${id}/`),
      getCategories(),
    ])
      .then(([{ data: product }, cats]) => {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
        });
        setCategories(cats);
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.patch(`/api/products/products/${id}/`, {
        ...form,
        price: parseFloat(form.price),
        category: parseInt(form.category),
      });
      navigate("/seller/listings");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageShell><Loader fullScreen /></PageShell>;

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <h2 className="text-xl font-bold mb-6">Edit Listing</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl border border-gray-100 p-6">
          {[
            { label: "Product Name", key: "name", type: "text" },
            { label: "Price (KSh)", key: "price", type: "number" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 bg-gray-50"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 bg-gray-50 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 bg-gray-50"
              required
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </PageShell>
  );
}

export default EditProduct;
