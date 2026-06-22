import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../services/uploadService";
import { updateAvatar, updateProfile, checkUsernameAvailable } from "../../services/authService";
import Loader from "../../components/common/Loader";
import AccountNavbar from "../../components/layout/AccountNavbar";

function EditProfile() {
  const navigate = useNavigate();
  const { user, loading, updateUser } = useAuth();
  const avatarInputRef = useRef(null);

  const [avatarUrl, setAvatarUrl] = useState(user?.profile_picture || null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernameAvailability, setUsernameAvailability] = useState(""); // "checking" | "taken" | "available" | ""

  const [form, setForm] = useState({
    username: user?.username || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    bio: user?.bio || "",
  });

  // debounce username check
  useEffect(() => {
    if (!form.username || form.username === user?.username) return;

    const timer = setTimeout(async () => {
      try {
        const res = await checkUsernameAvailable(form.username);
        setUsernameAvailability(res.available ? "available" : "taken");
      } catch {
        setUsernameAvailability("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [form.username, user?.username]);

  const usernameStatus =
    !form.username || form.username === user?.username ? "" : usernameAvailability;

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarUploading(true);
    try {
      const { url, public_id } = await uploadImage(file);
      await updateAvatar(url, public_id);
      setAvatarUrl(url);
      updateUser({ profile_picture: url });
    } catch {
      setAvatarUrl(user?.profile_picture || null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (usernameStatus === "taken") {
      setError("That username is already taken.");
      return;
    }
    if (!form.username.trim()) {
      setError("Username is required.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateProfile({
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        bio: form.bio,
      });
      updateUser(updated.user ?? updated);
      setSuccess("Profile updated.");
      setTimeout(() => navigate("/user/profile"), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const displayInitial = form.username?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AccountNavbar />
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/user/profile")}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
          >
            <FiArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold text-gray-900">Edit Profile</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="flex-1 max-w-lg w-full mx-auto px-4 py-8">

        {/* Avatar section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg overflow-hidden select-none">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                displayInitial
              )}
            </div>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={avatarUploading}
              className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow border-2 border-white transition disabled:opacity-60"
            >
              {avatarUploading
                ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FiCamera size={14} />
              }
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
          <p className="text-xs text-gray-400 mt-2">Tap the camera to change photo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">{success}</div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">

            {/* Username */}
            <div className="px-4 py-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => {
                  const username = e.target.value.toLowerCase().replace(/\s/g, "");
                  setForm({ ...form, username });
                  setUsernameAvailability(
                    !username || username === user?.username ? "" : "checking"
                  );
                }}
                className="w-full text-sm text-gray-900 outline-none bg-transparent"
                placeholder="username"
              />
              {usernameStatus === "checking" && (
                <p className="text-xs text-gray-400 mt-1">Checking...</p>
              )}
              {usernameStatus === "taken" && (
                <p className="text-xs text-red-500 mt-1">Username already taken</p>
              )}
              {usernameStatus === "available" && (
                <p className="text-xs text-green-600 mt-1">Username available</p>
              )}
            </div>

            {/* First name */}
            <div className="px-4 py-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">First Name</label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="w-full text-sm text-gray-900 outline-none bg-transparent"
                placeholder="First name"
              />
            </div>

            {/* Last name */}
            <div className="px-4 py-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Last Name</label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="w-full text-sm text-gray-900 outline-none bg-transparent"
                placeholder="Last name"
              />
            </div>

            {/* Bio */}
            <div className="px-4 py-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full text-sm text-gray-900 outline-none bg-transparent resize-none"
                placeholder="Tell buyers about yourself..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || usernameStatus === "taken" || avatarUploading}
            className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
