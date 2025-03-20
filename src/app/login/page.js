"use client"; // Ensures this component runs on the client side

import { useState } from "react"; // Importing useState for managing component state
import { useForm } from "react-hook-form"; // Importing react-hook-form for form handling
import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import { toast, ToastContainer } from "react-toastify"; // Importing toast for notifications
import supabase from "../supabaseClient"; // Importing Supabase client for authentication
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications

export default function Login() {
  const router = useRouter(); // Initializing Next.js router
  const {
    register, // Register function to bind inputs
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object to store form validation errors
  } = useForm(); // Initializing react-hook-form

  const [loading, setLoading] = useState(false); // State to track login button loading state
  const [googleLoading, setGoogleLoading] = useState(false); // State to track Google Sign-in loading state

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading state to true
    try {
      // Attempting login with email and password using Supabase authentication
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message); // Show error notification if login fails
        return;
      }

      toast.success("Login successful! Redirecting..."); // Show success notification
      setTimeout(() => router.push("/main"), 2000); // Redirect to the main page after 2 seconds
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again."); // Handle unexpected errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle Google Sign-in
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true); // Set Google loading state to true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile`, // Redirect to the profile page after sign-in
      },
    });

    if (error) {
      toast.error("Google Sign-in Failed!"); // Show error notification if Google sign-in fails
    } else {
      toast.success("Redirecting to Google..."); // Show success notification
    }
    setGoogleLoading(false); // Reset Google loading state
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <ToastContainer/> {/* Toast notification container */}
      <div className="p-8 rounded-[10px] shadow-md w-full max-w-sm bg-gray-900">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign In</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })} // Register email input
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-[7px] focus:ring-2 focus:ring-blue-500"
              disabled={loading} // Disable input while loading
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} {/* Show validation error */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })} // Register password input
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-[7px] focus:ring-2 focus:ring-blue-500"
              disabled={loading} // Disable input while loading
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} {/* Show validation error */}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" className="mr-2" disabled={loading} /> {/* Remember me checkbox */}
              <span className="text-gray-400 text-sm">Remember me</span>
            </div>
            <a href="/forgot-password" className="text-blue-400 text-sm">Forgot password?</a> {/* Forgot password link */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-[7px] hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing in..." : "Sign In"} {/* Change button text based on loading state */}
          </button>
        </form>

        {/* Divider for alternative login method */}
        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="w-full h-px bg-gray-700"></div>
        </div>

        {/* Google Sign-in button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full text-gray-50 flex items-center justify-center border border-gray-700 py-2 rounded-[7px] hover:bg-gray-800 transition disabled:opacity-50"
          disabled={googleLoading} // Disable button while loading
        >
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" /> {/* Google logo */}
          {googleLoading ? "Redirecting..." : "Continue with Google"} {/* Change button text based on loading state */}
        </button>

        {/* Sign-up link */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don&#39;t have an account? <a href="/signup" className="text-blue-400">Sign up</a>
        </p>
      </div>
    </div>
  );
}
