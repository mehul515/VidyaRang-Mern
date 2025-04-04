"use client"; // Enables client-side rendering in Next.js
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Hooks for navigation
import {
  User,
  Menu,
  X,
  HomeIcon,
  InfoIcon,
  PlusCircleIcon,
  MessageCircleIcon,
  UsersIcon,
  BarChartIcon,
} from "lucide-react"; // Icons
import supabase from "../app/supabaseClient"; // Supabase client for authentication
import Link from "next/link"; // Link component for navigation

// Menu items for navigation
const allMenuItems = [
  { name: "Home", icon: HomeIcon },
  { name: "About", icon: InfoIcon },
  { name: "Create new course", icon: PlusCircleIcon, restrictedTo: ["Instructor"] }, // Restricted to Instructors
  { name: "Chat with course", icon: MessageCircleIcon },
  { name: "Assign course", icon: UsersIcon, restrictedTo: ["Instructor"] }, // Restricted to Instructors
  { name: "Analysis", icon: BarChartIcon },
];

const Header = ({ selectedOption, setSelectedOption }) => {
  const [user, setUser] = useState(null); // Stores user data
  const [userRole, setUserRole] = useState(null); // Stores user role
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu visibility
  const pathname = usePathname(); // Current route path
  const router = useRouter(); // Router for navigation

  // Fetch user session and role on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { user_metadata } = session.user;
        setUser({
          name: session.user.user_metadata.username || session.user.user_metadata.full_name || "User",
          avatarUrl: user_metadata.avatar_url || "/profile.png",
        });
        setUserRole(user_metadata.role || "learner"); // Set role, default to "learner"
      } else {
        setUser(null);
        setUserRole(null);
      }
    };

    fetchUser();

    // Listen for authentication state changes
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        const { user_metadata } = session.user;
        setUser({
          name: session.user.user_metadata.username || session.user.user_metadata.full_name || "User",
          avatarUrl: user_metadata.avatar_url || "/profile.png",
        });
        setUserRole(user_metadata.role || "learner");
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
  }, []);

  // Filter menu items based on the user's role
  const menuItems = allMenuItems.filter(item => !item.restrictedTo || item.restrictedTo.includes(userRole));

  return (
    <header className="fixed top-0 left-0 w-full bg-[#030303] z-50 border-b-[0.02px] border-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">

        {/* App Name (Clicking navigates to "/main") */}
        <div
          className="text-xl lg:text-2xl text-white font-bold cursor-pointer"
          onClick={() => router.push("/main")}
        >
          AIGurukul
        </div>

        {/* Mobile Menu Toggle Button (Only visible when logged in) */}
        {user && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Mobile Menu (Only visible when menuOpen is true) */}
        {user && menuOpen && (
          <div className="absolute top-14 right-0 w-screen bg-black p-4 lg:hidden">
            <div className="max-w-[90%] mx-auto space-y-4">

              {/* User Info */}
              <Link href={"/profile"}>
                <div className="flex items-center gap-2 text-white">
                  <img src={user.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full border border-gray-600" />
                  <span className="text-sm font-semibold">{user.name}</span>
                </div>
              </Link>

              {/* Menu Items (Only visible in "/main") */}
              <div className="flex flex-col gap-4 mt-4">
                {(pathname === "/main" || pathname === "/chat" || pathname === "/about" || pathname === "/assign" || pathname === "/create-course" || pathname === "/analysis") &&
                  menuItems.map(item => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setSelectedOption(item.name);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 text-white hover:opacity-80 transition ${
                        selectedOption === item.name ? "text-cyan-400 font-bold" : ""
                      }`}
                    >
                      <item.icon size={20} className="text-gray-400" />
                      <span>{item.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* User Profile Section (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <a href="/profile">
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedOption("Profile")}
              >
                <img src={user.avatarUrl} alt="Profile" className="h-8 rounded-full" />
                <span className="text-sm font-semibold text-white">{user.name}</span>
              </div>
            </a>
          ) : (
            // Sign In Button (Desktop)
            <Link href="/login">
              <button className="rounded-[7px] p-2.5 px-5 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Sign In Button (Mobile) */}
        {!user && (
          <Link href="/login">
            <div className="lg:hidden">
              <button className="rounded-[7px] p-2 px-5 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
                Sign In
              </button>
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
