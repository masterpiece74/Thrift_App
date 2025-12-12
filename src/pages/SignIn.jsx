import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://thrifthackathon.onrender.com/api/v1/account/signin",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: identifier,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("SignIn response status:", response.status, "data:", data);

      // Treat non-2xx HTTP or an explicit data.ok===false as failure
      if (!response.ok || (data && data.ok === false)) {
        setError(
          data?.message || "Sign in failed. Please check your credentials."
        );
        setLoading(false);
        return;
      }

      // Store user in localStorage
      const user = data.user || {
        id: data.id,
        email: identifier,
        name: data.name || identifier,
        bvnVerified: data.bvnVerified || false,
      };

      console.log("Login successful, user data:", user);
      localStorage.setItem("rubiesthrift-auth", JSON.stringify(true));
      localStorage.setItem("rubiesthrift-user", JSON.stringify(user));

      // If BVN not verified → redirect to verification
      if (user.bvnVerified === false) {
        console.log("BVN not verified, redirecting to verification");
        setLoading(false);
        navigate("/verify-bvn", { state: { user } });
        return;
      }

      // Clear form and navigate to dashboard immediately
      console.log("Navigating to dashboard");
      setIdentifier("");
      setPassword("");
      setError("");
      setLoading(false);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Something went wrong. Check your internet or try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <img
        src="/s2.jpg"
        alt="Sign in background"
        className="absolute inset-0 w-full h-full object-cover -z-10 filter contrast-110 saturate-120 brightness-95"
      />
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/18 via-transparent to-slate-900/8 -z-10"></div>
      <div className="grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl border border-white/20 ring-1 ring-indigo-100/20">
          <h1 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Sign In
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            Welcome back to RubiesThrift. Sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone or Email
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="phone (+234801...) or you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition transform hover:scale-105 active:scale-95 ${
                loading
                  ? "bg-teal-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-300"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password */}
          <p className="text-sm text-slate-600 mt-6 text-center">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-teal-600 font-medium hover:underline"
            >
              Reset it
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-linear-to-r from-teal-700 to-emerald-700 text-white py-8 px-6 text-center border-t border-slate-700 shadow-lg">
        <p className="text-sm mb-2">© 2025 RubiesThrift — Secure Login</p>
        <p className="text-xs text-slate-400">Your security is our priority</p>
      </footer>
    </div>
  );
}
