"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast,ToastContainer } from "react-toastify";
import supabase from "../supabaseClient";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/main"), 2000);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/main`,
      },
    });

    if (error) {
      toast.error("Google Sign-in Failed!");
    } else {
      toast.success("Redirecting to Google...");
    }
    setGoogleLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#010912]">
      <ToastContainer/>
      <div className="p-8 rounded-lg shadow-md w-96 bg-gray-900">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" className="mr-2" disabled={loading} />
              <span className="text-gray-400 text-sm">Remember me</span>
            </div>
            <a href="/forgot-password" className="text-blue-400 text-sm">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="w-full h-px bg-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full text-gray-50 flex items-center justify-center border border-gray-700 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          disabled={googleLoading}
        >
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don&#39;t have an account? <a href="/signup" className="text-blue-400">Sign up</a>
        </p>
      </div>
    </div>
  );
}
