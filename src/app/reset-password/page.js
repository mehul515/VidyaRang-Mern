"use client"; // Enables client-side rendering in Next.js

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import supabase from "../supabaseClient"; // Import Supabase client instance

export default function ResetPassword() {
  const router = useRouter(); // Initialize router for redirection
  const [password, setPassword] = useState(""); // State to store new password input
  const [message, setMessage] = useState(""); // State to store success/error messages

  // Function to handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setMessage(""); // Clear any previous messages

    // Call Supabase function to update the user's password
    const { error } = await supabase.auth.updateUser({
      password: password, // Pass the new password
    });

    // Handle response
    if (error) {
      setMessage(error.message); // Display error message if any
    } else {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => router.push("/login"), 3000); // Redirect user to login page after 3 seconds
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Form container */}
      <div className="bg-gray-900 p-8 rounded-[10px] shadow-md w-96">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">
          Reset Password
        </h2>

        {/* Password reset form */}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-100">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full text-gray-900 px-4 py-2 border rounded-[7px] focus:ring-2 focus:ring-blue-500"
              required // Ensure password input is not empty
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-[7px] hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </form>

        {/* Display success or error message */}
        {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}
