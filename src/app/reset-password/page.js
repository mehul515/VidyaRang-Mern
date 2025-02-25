"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../supabaseClient"; // Import Supabase client

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#010912]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-100">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Update Password
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}
