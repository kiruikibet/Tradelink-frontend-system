import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { MAX_PRODUCT_IMAGES } from "../../utils/constants";
import { uploadImage } from "../../services/uploadService";
import { createProduct, deleteProduct, saveProductImage, getCategories } from "../../services/productService";

function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleFileChange = (e) => {
    const incoming = Array.from(e.target.files);
    const combined = [...selectedFiles, ...incoming].slice(0, MAX_PRODUCT_IMAGES);
    setSelectedFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removeImage = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setPreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.category) {
      setError("Name, price, and category are required.");
      return;
    }
    if (selectedFiles.length === 0) {
      setError("Please upload at least one product image.");
      return;
    }

    setSubmitting(true);
    let product = null;
    try {
      setUploadProgress("Creating product...");
      product = await createProduct({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: parseInt(form.category),
      });

      for (let i = 0; i < selectedFiles.length; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${selectedFiles.length}...`);
        const { url } = await uploadImage(selectedFiles[i]);
        await saveProductImage(product.product_id, url);
      }

      navigate("/user/profile");
    } catch (err) {
      // Roll back the product if it was created but images failed
      if (product?.product_id) {
        try {
          await deleteProduct(product.product_id);
        } catch {
          // rollback best-effort, ignore secondary error
        }
      }
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/user/profile")}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
          >
            <FiArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold text-gray-900">New Listing</h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-800">
                Photos <span className="text-red-500">*</span>
              </p>
              <span className={`text-xs font-medium ${selectedFiles.length >= MAX_PRODUCT_IMAGES ? "text-red-500" : "text-gray-400"}`}>
                {selectedFiles.length} / {MAX_PRODUCT_IMAGES}
              </span>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="w-full aspect-square object-cover rounded-xl border border-gray-100" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiX size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedFiles.length < MAX_PRODUCT_IMAGES && (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
              >
                <span className="text-2xl mb-1">🖼️</span>
                <p className="text-sm text-gray-500 font-medium">
                  {previews.length === 0 ? "Add photos" : "Add more"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP</p>
              </label>
            )}
            <input id="image-upload" type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <p className="text-sm font-semibold text-gray-800">Details</p>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
                placeholder="e.g. iPhone 14 Pro"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 resize-none"
                placeholder="Describe your product..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Price (KSh) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  placeholder="15000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 transition"
          >
            {submitting ? uploadProgress || "Creating..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
