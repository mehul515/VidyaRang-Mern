"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "../supabaseClient"; // Import Supabase client
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Check if the user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users") // Replace "users" with your actual user table name if applicable
        .select("email")
        .eq("email", data.email)
        .single();
  
      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }
  
      if (existingUser) {
        toast.error("User already exists. Please log in instead.");
        return router.push("/login"); // Redirect to login
      }
  
      // Proceed with signup if user does not exist
      const { user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
            role: data.role, // Store role in user metadata
          },
        },
      });
  
      if (error) {
        throw error;
      }
      toast.success("Signup successful! Check your email to verify your account.");
      router.push("/login"); // Redirect to login after signup
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  
    if (error) {
      console.error("Google Sign-in Error:", error.message);
      toast.error("Google Sign-in Failed!");
    } else {
      console.log("Google Sign-in successful. Redirecting..."); // Debugging
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
       <ToastContainer/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" value="instructor" {...register("role", { required: "Please select a role" })} className="mr-2" />
                Instructor
              </label>
              <label className="flex items-center">
                <input type="radio" value="learner" {...register("role", { required: "Please select a role" })} className="mr-2" />
                Learner
              </label>
            </div>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Google Sign-in Button */}
        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100 transition">
          <img src="/google.png" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Sign in</a>
        </p>
      </div>
     
    
    </div>
  );
}