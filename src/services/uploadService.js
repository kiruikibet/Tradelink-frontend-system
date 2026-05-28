import { UPLOADTHING_API_URL } from "../utils/constants";

/**
 * Upload a single file to UploadThing and return the URL
 * @param {File} file
 * @returns {Promise<string>} image URL
 */
export async function uploadToUploadThing(file) {
  const fd = new FormData();
  fd.append("files", file);
  const res = await fetch(UPLOADTHING_API_URL, {
    method: "POST",
    headers: { "x-uploadthing-api-key": import.meta.env.VITE_UPLOADTHING_TOKEN },
    body: fd,
  });
  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return (data.data || data)[0]?.url || (data.data || data)[0]?.fileUrl;
}
