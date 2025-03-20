"use client"; // Enables client-side rendering in Next.js

import { useState } from "react";
import supabase from "../supabaseClient"; // Importing Supabase client instance

export default function ForgotPassword() {
  // State for storing user email input
  const [email, setEmail] = useState("");
  // State for displaying messages (success/error)
  const [message, setMessage] = useState("");

  // Function to handle password reset request
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setMessage(""); // Clear previous messages

    // Basic email validation
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Calling Supabase function to send password reset email
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://vidya-rang-mern.vercel.app/reset-password", // Ensure this URL is allowed in Supabase settings
      });

      // Handle response
      if (error) {
        setMessage(error.message); // Show error message if any
      } else if (data) {
        setMessage("Password reset email sent! Check your inbox."); // Success message
      } else {
        setMessage("Something went wrong. Please try again."); // Handle unexpected responses
      }
    } catch (err) {
      setMessage("An error occurred. Please try again later."); // Generic error handling
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Container for the form */}
      <div className="bg-gray-900 p-8 rounded-[10px] shadow-md w-96">
        {/* Page heading */}
        <h2 className="text-2xl font-semibold text-gray-50 text-center mb-6">
          Forgot Password
        </h2>
        
        {/* Form for password reset */}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-100">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-gray-900 rounded-[7px] focus:ring-2 focus:ring-blue-500"
              required // Ensures that the input is not left empty
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-[7px] hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Display success or error message */}
        {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}
