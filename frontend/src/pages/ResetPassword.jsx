import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../utils/api";
import AuthLayout from "../components/AuthLayout";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) { navigate("/login"); return; }
    const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      return setError("All fields are required");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const data = await resetPasswordAPI(token, password, confirmPassword);

      if (data.message === "Password reset successful") {
        setMessage("Password updated successfully!");
        setCountdown(3); 
      } else {
        setError(data.message || "Reset failed");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below"
      icon="🔒"
      accentColor="indigo"
    >
      {/*  No extra card — AuthLayout already has it */}
      <div className="space-y-3">

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            autoComplete="new-password"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm pr-16"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            disabled={countdown !== null}
          />
          <span
            className="absolute right-3 top-2.5 text-sm text-gray-400 cursor-pointer hover:text-indigo-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="new-password"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
            disabled={countdown !== null}
          />
        </div>

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-3">{error}</p>
      )}

      {/*  Success + Countdown */}
      {message && countdown !== null && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mt-3">
          <p className="text-green-600 text-sm font-medium">✅ {message}</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {countdown}
            </div>
            <p className="text-xs text-gray-400">Redirecting to login...</p>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleReset}
        disabled={loading || countdown !== null}
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition"
      >
        {loading ? "Resetting..." : countdown !== null ? `Redirecting in ${countdown}s...` : "Reset Password"}
      </button>

      <p className="text-sm text-center text-gray-500 mt-5">
        Back to{" "}
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

export default ResetPassword;