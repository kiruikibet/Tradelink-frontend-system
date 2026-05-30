import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Navbar from "../../components/layout/Navbar";
import { MAX_PRODUCT_IMAGES } from "../../utils/constants";
import { uploadToCloudinary } from "../../services/uploadService";
import { createProduct, saveProductImage, getCategories } from "../../services/productService";

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
    try {
      setUploadProgress("Creating product...");
      const product = await createProduct({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: parseInt(form.category),
      });

      for (let i = 0; i < selectedFiles.length; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${selectedFiles.length}...`);
        const imageUrl = await uploadToCloudinary(selectedFiles[i]);
        await saveProductImage(product.product_id, imageUrl);
      }

      navigate("/user/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-1">Create Product</h2>
        <p className="text-sm text-gray-400 mb-8">Fill in the details and your listing goes live instantly.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Product Images</label>
              <span className={`text-xs font-medium ${selectedFiles.length >= MAX_PRODUCT_IMAGES ? "text-red-500" : "text-gray-400"}`}>
                {selectedFiles.length} / {MAX_PRODUCT_IMAGES}
              </span>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="w-full aspect-square object-cover rounded-xl border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiX size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedFiles.length < MAX_PRODUCT_IMAGES && (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
              >
                <span className="text-3xl mb-1">🖼️</span>
                <p className="text-sm text-gray-500">
                  {previews.length === 0 ? "Click to add images" : "Add more images"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP — up to {MAX_PRODUCT_IMAGES} total</p>
              </label>
            )}

            <input id="image-upload" type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600 bg-white"
              placeholder="e.g. iPhone 14 Pro"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600 bg-white resize-none"
              placeholder="Describe your product..."
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSh)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600 bg-white"
                placeholder="e.g. 15000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600 bg-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-base disabled:opacity-60 transition"
          >
            {submitting ? uploadProgress || "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
