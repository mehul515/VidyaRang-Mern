"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, Home, BookOpen, Users } from "lucide-react";
import supabase from "../supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }
      setUserData({
        name: session.user.user_metadata.full_name || "User",
        email: session.user.email,
        role: session.user.user_metadata.role || "",
        avatarUrl:
          session.user.user_metadata.avatar_url || "/placeholder.svg",
      });
    };
    fetchUser();
  }, [router]);

  const selectRole = async (role) => {
    setUserData((prev) => ({ ...prev, role }));
    const { error } = await supabase.auth.updateUser({ data: { role } });
    if (error) console.error("Role update failed:", error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="animate-pulse w-32 h-32 bg-gray-700 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto overflow-hidden backdrop-blur-sm bg-gray-800/80 shadow-xl border border-gray-700 rounded-xl p-4">
        <div className="relative h-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-xl flex justify-center items-center">
          <img
            src={userData.avatarUrl}
            alt={userData.name}
            className="h-24 w-24 border-4 border-gray-800 shadow-md rounded-full absolute -bottom-12 object-cover"
            onError={(e) => (e.target.src = "/profile.png")} // Default image on error
          />
        </div>

        <div className="pt-16 pb-6 px-4 space-y-6 text-center">
          <h1 className="text-2xl font-bold text-gray-100">{userData.name}</h1>
          
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

        <div className="flex flex-col md:flex-row justify-between border-t border-gray-700 p-4 bg-gray-800/50 gap-2">
          <Link href="/">
            <button className="flex items-center gap-2 bg-gray-700/50 text-gray-200 hover:bg-gray-600 hover:text-white transition-colors px-4 py-2 rounded w-full md:w-auto">
              <Home className="h-4 w-4" />
              Home
            </button>
          </Link>

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
  );
}
