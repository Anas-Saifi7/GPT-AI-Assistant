import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utils/api";
import AuthLayout from "../components/AuthLayout";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // ✅ type karte hi error clear ho
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError("All fields are required");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const data = await signupUser(formData);

      if (data.message !== "User registered successfully") {
        return setError(data.message);
      }

      navigate("/login");
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your journey with us 🚀"
      icon="✨"
      accentColor="indigo"
    >
      {/* ✅ No extra card/div — AuthLayout already has card */}
      <div className="space-y-3">

        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="off"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm pr-16"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-2.5 text-sm text-gray-400 cursor-pointer hover:text-indigo-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="new-password"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-3">{error}</p>
      )}

      {/* Signup Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-5">
        <hr className="flex-1 border-gray-200" />
        <span className="px-3 text-sm text-gray-400">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      {/* Footer */}
      <p className="text-sm text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-600 cursor-pointer hover:underline font-medium"
        >
          Login
        </span>
      </p>

    </AuthLayout>
  );
};

export default Signup;