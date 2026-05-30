/**
 * Upload a single file to Cloudinary and return the hosted URL.
 * Uses an unsigned upload preset, so no Cloudinary API secret is exposed.
 * @param {File} file
 * @returns {Promise<string>} image URL
 */
export async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);
  fd.append("folder", "tradelink/products");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url;
}
