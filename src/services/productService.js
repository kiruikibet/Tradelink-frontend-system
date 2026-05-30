import { BASE_URL } from "../utils/constants";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products/products/`);
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch products");
  return data;
}

export async function createProduct(productData) {
  const token = localStorage.getItem("access");
  const response = await fetch(`${BASE_URL}/api/products/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || JSON.stringify(data));
  return data;
}

export async function saveProductImage(productId, imageUrl) {
  const token = localStorage.getItem("access");
  const response = await fetch(`${BASE_URL}/api/products/upload-image/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product: productId,
      image: imageUrl,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to save image");
  return data;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/api/products/categories/`);
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch categories");
  return data;
}
