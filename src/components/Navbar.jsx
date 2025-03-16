"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, Menu, X, HomeIcon, InfoIcon, PlusCircleIcon, MessageCircleIcon, UsersIcon, BarChartIcon } from "lucide-react";
import supabase from "../app/supabaseClient";
import Link from "next/link";

const allMenuItems = [
  { name: "Home", icon: HomeIcon },
  { name: "About", icon: InfoIcon },
  { name: "Create new course", icon: PlusCircleIcon, restrictedTo: ["admin", "instructor"] }, // Restricted
  { name: "Chat with course", icon: MessageCircleIcon },
  { name: "Assign course", icon: UsersIcon, restrictedTo: ["admin", "instructor"] }, // Restricted
  { name: "Analysis", icon: BarChartIcon },
];

const Header = ({ selectedOption, setSelectedOption }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Stores user role
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { user_metadata } = session.user;
        setUser({
          name: user_metadata.full_name || "User",
          avatarUrl: user_metadata.avatar_url || "/profile.png",
        });
        setUserRole(user_metadata.role || "learner"); // Fetch role (default to learner)
      } else {
        setUser(null);
        setUserRole(null);
      }
    };

    fetchUser();
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        const { user_metadata } = session.user;
        setUser({
          name: user_metadata.full_name || "User",
          avatarUrl: user_metadata.avatar_url || "/profile.png",
        });
        setUserRole(user_metadata.role || "learner");
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
  }, []);

  // Filter menu items based on role
  const menuItems = allMenuItems.filter(item => !item.restrictedTo || item.restrictedTo.includes(userRole));

  return (
    <header className="fixed top-0 left-0 w-full bg-[#030303] z-50 border-b-[0.02px] border-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">

        {/* App Name (Navigates to /main) */}
        <div className="text-xl lg:text-2xl text-white font-bold cursor-pointer" onClick={() => router.push("/main")}>
          AIGurukul
        </div>

        {/* Mobile Menu Button */}
        {user && (
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Mobile Menu */}
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

              {/* Menu Items */}
              <div className="flex flex-col gap-4 mt-4">

                {/* Other Menu Items (Only Visible in /main) */}
                {pathname === "/main" &&
                  menuItems.map(item => (
                    <button
                      key={item.name}
                      onClick={() => {setSelectedOption(item.name); setMenuOpen(false); }}
                      className={`flex items-center gap-2 text-white hover:opacity-80 transition ${selectedOption === item.name ? "text-cyan-400 font-bold" : ""
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

        {/* User Profile / Login Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <a href="/profile">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition" onClick={() => {setSelectedOption("Profile")}}>
              <img src={user.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full border border-gray-600" />
              <span className="text-sm font-semibold text-white">{user.name}</span>
            </div>
            </a>
          ) : (
            <Link href="/login">
            <button className="rounded-[7px] p-2.5 px-6 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
              Sign In
            </button>
            </Link>
          )}
        </div>

        {/* Mobile Login Button */}
        {!user && (
          <Link href="/login">
          <div className="lg:hidden">
            <button className="rounded-[7px] p-2.5 px-6 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
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
