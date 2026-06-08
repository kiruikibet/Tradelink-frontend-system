import api from "./apiClient";

export async function getProducts() {
  const { data } = await api.get("/api/products/products/");
  return data;
}

export async function createProduct(productData) {
  const { data } = await api.post("/api/products/products/", productData);
  return data;
}

export async function deleteProduct(productId) {
  await api.delete(`/api/products/products/${productId}/`);
}

// Saves a Cloudinary image URL to the product
export async function saveProductImage(productId, imageUrl) {
  const { data } = await api.post("/api/products/upload-image/", {
    product: productId,
    image: imageUrl,
  });
  return data;
}

export async function getCategories() {
  const { data } = await api.get("/api/products/categories/");
  return data;
}
