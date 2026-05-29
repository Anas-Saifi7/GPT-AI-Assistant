import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileAPI, updateProfileAPI } from "../utils/api";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

useEffect(() => {
  const loadProfile = async () => {
    try {
      const data = await getProfileAPI();

      console.log("Profile Response:", data);

      if (data.user) {
        setUser(data.user);
        setUsername(data.user.username);
      } else {
        setError(data.message || "Profile load failed");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    }
  };

  loadProfile();
}, []);

  const handleUpdate = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await updateProfileAPI({
        username,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });

      if (data.message === "Profile updated successfully") {
        setMessage("Profile updated successfully ✅");
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

if (!user) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-gray-400">Loading...</p>

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Account Settings</h1>
        <div />
      </nav>

      <div className="max-w-lg mx-auto px-4 py-10 space-y-6">

        {/* Avatar */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-2xl text-white font-bold">
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full mt-1 inline-block">
              Free Plan
            </span>
          </div>
        </div>

        {/* Update Username */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Update Username</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          />
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Change Password</h3>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default Account;