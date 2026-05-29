import React, { useState } from "react";
import { forgotPasswordAPI } from "../utils/api";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email) return setError("Email is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return setError("Please enter a valid email address");

  setLoading(true);
  try {
    await forgotPasswordAPI(email);
    setSent(true); 
  } catch (err) {
    setError(err.message || "Error sending reset link.");
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
      icon="📧"
      accentColor="indigo"
    >
      <div className="space-y-4">

        {sent ? (
          /* ✅ Success Screen */
          <div className="text-center py-4">
            <div className="text-5xl mb-4">📬</div>
            <h3 className="text-gray-800 font-semibold text-base mb-2">
              Check your email!
            </h3>
            <p className="text-gray-500 text-sm mb-1">
              Reset link has been sent to:
            </p>
            <p className="text-indigo-600 font-medium text-sm mb-4">
              {email}
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              Click the link in your email to reset your password.
              The link will expire in <strong>10 minutes</strong>.
            </p>

            {/* Resend */}
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
                setMessage("");
                setError("");
              }}
              className="text-indigo-600 text-sm hover:underline cursor-pointer font-medium"
            >
              Wrong email? Try again
            </button>
          </div>
        ) : (
        //   / Email Input Screen */
          <>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="off"
              disabled={loading}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}

        <p className="text-center text-sm text-gray-400 pt-2">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;