"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
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
        if (error.message.toLowerCase().includes("already registered")) {
          toast.info("User email already in use. Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          throw error;
        }
      } else {
        toast.success("Signup successful! Check your email to verify your account.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile`,
      },
    });

    if (error) {
      toast.error("Google Sign-in Failed!");
    } else {
      toast.success("Google Sign-in successful. Redirecting...");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-100">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

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

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="w-full h-px bg-gray-700"></div>
        </div>

        <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center border py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition">
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
          {loading ? "Processing..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </div>
  );
}
