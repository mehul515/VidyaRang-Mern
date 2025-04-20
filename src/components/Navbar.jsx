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
import { useTheme } from "./Themecontextprovider";

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

   
  const { darkMode, toggleTheme } = useTheme();


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b-[0.02px] transition-colors duration-300 ${
        darkMode ? "bg-[#030303] border-gray-900" : "bg-white border-gray-200"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">
        {/* App Name */}
        <div
          className={`text-xl lg:text-2xl font-bold cursor-pointer transition ${
            darkMode ? "text-white" : "text-black"
          }`}
          onClick={() => router.push("/main")}
        >
          AIGurukul
        </div>
  
        {/* Right - Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${darkMode ? "text-white" : "text-black"}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
  
        {/* Mobile Menu */}
        { menuOpen && (
          <div
            className={`absolute top-14 right-0 w-screen p-4 lg:hidden transition-all ${
              darkMode ? "bg-black border-b-[0.3px] border-gray-500" : "bg-white  border-b-[0.3px] border-gray-400"
            }`}
          >
            <div className="max-w-[90%] mx-auto space-y-4">
              {/* Theme Toggle */}
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleTheme}
                  className={`w-12 h-6 flex items-center rounded-full px-1 transition-all duration-300 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      darkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </button>

                <Link href="/login">
              <button className={`rounded-[7px] p-2.5 px-5 ${ darkMode ? "bg-cyan-400 hover:bg-cyan-500 text-black" : "bg-black hover:bg-gray-950 text-white"} lg:text-sm `}>
                Sign In
              </button>
            </Link>


              </div>
  
              {/* Menu Items (only when logged in and on specific routes) */}
              {user && menuOpen && (
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
          
        )}
  
             
            </div>
          </div>
        )}
  
        {/* Right - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 flex items-center rounded-full px-1 transition-all duration-300 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
  
          {/* Auth */}
          {user ? (
            <a href="/profile">
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedOption("Profile")}
              >
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="h-8 rounded-full"
                />
                <span
                  className={`text-sm font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {user.name}
                </span>
              </div>
            </a>
          ) : (
            <Link href="/login">
              <button className={`rounded-[7px] p-2.5 px-5 ${ darkMode ? "bg-cyan-400 hover:bg-cyan-500 text-black" : "bg-black hover:bg-gray-950 text-white"} lg:text-sm `}>
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
  
};

export default Header;
