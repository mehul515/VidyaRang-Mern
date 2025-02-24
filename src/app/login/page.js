"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "../supabaseClient";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login Error:", error.message);
        alert(error.message);
        return;
      }

      console.log("Login Success:", session);
      router.push("/main"); // Redirect after successful login
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google Sign-in Error:", error.message);
      alert("Google Sign-in Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700 text-sm">Remember me</span>
            </div>
            <a href="/forgot-password" className="text-blue-500 text-sm">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100 transition"
        >
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Dont have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
