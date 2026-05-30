import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }

    try {
      const data = await loginUser(formData);

      if (!data.token) {
        return setError(data.message);
      }

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
        console.log(err);
      setError(err.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
  <AuthLayout
    title="Welcome back 👋"
    subtitle="Login to your account"
    icon="🔐"
    accentColor="indigo"
  >
    <div className="space-y-4">
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
          className="absolute right-3 top-2.5 text-sm text-gray-400 cursor-pointer hover:text-indigo-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
    </div>

    {/* Forgot Password */}
    <div className="text-right mt-2">
      <span
        onClick={handleForgotPassword}
        className="text-sm text-indigo-600 cursor-pointer hover:underline"
      >
        Forgot password?
      </span>
    </div>

    {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
    {message && <p className="text-green-500 text-sm text-center mt-3">{message}</p>}

    <button
      onClick={handleSubmit}
      className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-sm transition"
    >
      Login
    </button>

    <div className="flex items-center my-5">
      <hr className="flex-1 border-gray-200" />
      <span className="px-3 text-sm text-gray-400">or</span>
      <hr className="flex-1 border-gray-200" />
    </div>

    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>

    <p className="text-sm text-center text-gray-500 mt-6">
      Don't have an account?{" "}
      <span
        onClick={() => navigate("/signup")}
        className="text-indigo-600 cursor-pointer hover:underline font-medium"
      >
        Signup
      </span>
    </p>
  </AuthLayout>
);
};

export default Login;