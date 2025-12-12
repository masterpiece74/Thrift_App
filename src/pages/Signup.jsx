import React, { useState } from "react";
import Ajo1 from "../assets/Ajo1.png";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "https://thrifthackathon.onrender.com/api/v1/account/createAcc",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!data || data.ok === false || response.status >= 400) {
        const msg = data.message || "Signup failed";
        const detail = data.error ? ` (${data.error})` : "";
        setError(msg + detail);
        return;
      } else {
        console.log("Signup successful:", data);
        navigate("/signin");
      }
    } catch (err) {
      setError("Something went wrong. Check your internet or try again.");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <img
        src={Ajo1}
        alt="Signup background"
        className="absolute inset-0 w-full h-full object-cover -z-10 filter contrast-115 saturate-125 brightness-95"
      />
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 via-transparent to-teal-900/8 -z-10"></div>
      <div className="grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl border border-white/20 ring-1 ring-indigo-100/30">
          <h1 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Sign Up
          </h1>
          <p className="text-sm text-slate-600 mb-8">
            Create your RubiesThrift account and start saving.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="08123456789"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
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
              className="w-full px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-300 transition transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-teal-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
