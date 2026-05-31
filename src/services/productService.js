import { apiRequest } from "./apiClient";

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

export async function saveProductImage(productId, imageUrl) {
  return apiRequest("/api/products/upload-image/", {
    method: "POST",
    auth: true,
    body: {
      product: productId,
      image: imageUrl,
    },
    errorMessage: "Failed to save image",
  });
}

export async function getCategories() {
  return apiRequest("/api/products/categories/", {
    errorMessage: "Failed to fetch categories",
  });
}
