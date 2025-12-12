import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!fullName || !email) {
      setError("Please provide your full name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await updateProfile({ name: fullName, email, phone });
      if (!res || res.ok === false) {
        setError(res?.message || "Failed to update profile.");
      } else {
        setMessage("Profile updated successfully.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <p className="text-slate-700 mb-4">
        Manage your personal information and settings.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 rounded border"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="p-3 rounded border"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {error && (
          <div className="text-sm text-red-700 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="text-sm text-green-800 bg-green-50 p-2 rounded">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 text-white font-semibold rounded-md ${
            submitting ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {submitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
