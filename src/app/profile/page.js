"use client"; // Enables client-side rendering in Next.js

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Home, BookOpen, Users } from "lucide-react"; // Importing icons
import supabase from "../supabaseClient"; // Importing Supabase client
import Navbar from "@/components/Navbar"; // Importing Navbar component

export default function ProfilePage() {
  const router = useRouter(); // Router instance for navigation
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the current session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // Redirect to login page if not authenticated
        return;
      }

      // Set user data from session metadata
      setUserData({
        name: session.user.user_metadata.username || session.user.user_metadata.full_name || "User",
        email: session.user.email,
        role: session.user.user_metadata.role || "",
        avatarUrl: session.user.user_metadata.avatar_url || "/placeholder.svg",
      });
    };
    fetchUser();
  }, [router]);

  // Function to update the user role in Supabase
  const selectRole = async (role) => {
    setUserData((prev) => ({ ...prev, role })); // Update local state
    const { error } = await supabase.auth.updateUser({ data: { role } }); // Update role in Supabase
    if (error) console.error("Role update failed:", error.message);
  };

  // Function to log out the user
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    router.push("/"); // Redirect to the home page
  };

  // Display a loading animation while user data is being fetched
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="animate-pulse w-32 h-32 bg-gray-700 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* Navbar Component */}

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg mx-auto overflow-hidden backdrop-blur-sm bg-gray-950/80 shadow-xl border border-gray-700 rounded-xl p-4">
          
          {/* Profile Banner */}
          <div className="relative h-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-xl flex justify-center items-center">
            <img
              src={userData.avatarUrl}
              alt={userData.name}
              className="h-24 w-24 border-4 border-gray-800 shadow-md rounded-full absolute -bottom-12 object-cover"
              onError={(e) => (e.target.src = "/profile.png")} // Default image on error
            />
          </div>

          {/* User Information Section */}
          <div className="pt-16 pb-6 px-4 space-y-6 text-center">
            <h1 className="text-2xl font-bold text-gray-100">{userData.name}</h1>

            {/* Display email and role */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm md:flex-row md:gap-4">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{userData.email}</span>
              </div>
              {userData.role && (
                <h1 className="mt-2 md:mt-0 bg-blue-600 px-3 py-1 rounded text-white text-sm">
                  {userData.role}
                </h1>
              )}
            </div>

            {/* Role selection buttons (if role is not set) */}
            {!userData.role && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-300">
                  Select your role
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-2 h-auto py-3 bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600 hover:text-white transition-all duration-300 w-full rounded"
                    onClick={() => selectRole("Learner")}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium">Learner</span>
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 h-auto py-3 bg-gray-700/50 border-gray-600 text-gray-200 hover:bg-gray-600 hover:text-white transition-all duration-300 w-full rounded"
                    onClick={() => selectRole("Instructor")}
                  >
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Instructor</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation & Logout Buttons */}
          <div className="flex flex-col md:flex-row justify-between border-t border-gray-700 p-4 bg-gray-800/50 gap-2">
            
            {/* Home Button */}
            <Link href="/main">
              <button className="flex items-center gap-2 bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white transition-colors px-4 py-2 rounded w-full md:w-auto">
                <Home className="h-4 w-4" />
                Home
              </button>
            </Link>

            {/* Logout Button */}
            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded text-white w-full md:w-auto"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
