"use client";

import { useForm } from "react-hook-form"; // Importing React Hook Form for form handling
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import supabase from "../supabaseClient"; // Importing Supabase client for authentication
import { ToastContainer, toast } from "react-toastify"; // Importing toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"; // Importing useState hook for managing component state

export default function Signup() {
  const router = useRouter(); // Initializing router for navigation
  const [loading, setLoading] = useState(false); // State to manage loading state during async operations
  
  // Initializing form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true); // Set loading state to true while processing
    try {
      // Signing up user using Supabase authentication
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
            role: data.role,
          },
        },
      });

      if (error) {
        // Handling already registered email error
        if (error.message.toLowerCase().includes("already registered")) {
          toast.info("User email already in use. Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          throw error; // Throw other errors
        }
      } else {
        // Successful signup notification
        toast.success("Signup successful! Check your email to verify your account.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.message); // Display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile`, // Redirect to profile page after successful login
      },
    });

    if (error) {
      toast.error("Google Sign-in Failed!"); // Display error if Google Sign-In fails
    } else {
      toast.success("Redirecting to Google..."); // Show success notification
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="bg-gray-900 p-6 sm:p-8 rounded-[10px] shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Sign Up</h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-[7px] border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-[7px] border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-[7px] border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-300">Role</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center text-gray-300">
                <input type="radio" value="Instructor" {...register("role", { required: "Please select a role" })} className="mr-2" />
                Instructor
              </label>
              <label className="flex items-center text-gray-300">
                <input type="radio" value="Learner" {...register("role", { required: "Please select a role" })} className="mr-2" />
                Learner
              </label>
            </div>
            {errors.role && <p className="text-red-400 text-sm">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-[7px] hover:bg-blue-700 transition">
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="w-full h-px bg-gray-700"></div>
        </div>

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn} disabled={loading} className="w-full border border-gray-700 flex items-center justify-center py-2 rounded-[7px] bg-gray-800 text-white hover:bg-gray-700 transition">
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
          {loading ? "Processing..." : "Continue with Google"}
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </div>
  );
}
