import { apiRequest, buildApiUrl, getAccessToken } from "./apiClient";

export async function getProducts() {
  return apiRequest("/api/products/products/", {
    errorMessage: "Failed to fetch products",
  });
}

export async function createProduct(productData) {
  return apiRequest("/api/products/products/", {
    method: "POST",
    auth: true,
    body: productData,
    errorMessage: "Failed to create product",
  });
}

// Sends the actual image file as multipart/form-data
export async function saveProductImage(productId, file) {
  const fd = new FormData();
  fd.append("product", productId);
  fd.append("image", file);

  const response = await fetch(buildApiUrl("/api/products/upload-image/"), {
    method: "POST",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body: fd,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to save image");
  return data;
}

export async function getCategories() {
  return apiRequest("/api/products/categories/", {
    errorMessage: "Failed to fetch categories",
  });
}
