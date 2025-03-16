'use client'
import React, { useEffect, useState } from 'react';
import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import supabase from "../app/supabaseClient";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || "User",
          avatarUrl: session.user.user_metadata.avatar_url || "/profile.png"
        });
      } else {
        setUser(null);
      }
    };

    fetchUser();
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || "User",
          avatarUrl: session.user.user_metadata.avatar_url || "/profile.png"
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#030303] z-50 border-b-[0.02px] border-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">
        <a href="#" className="text-xl lg:text-2xl text-white font-bold">AIGurukul</a>

        {/* Mobile Menu Button (only visible if user is signed in) */}
        <div className="flex items-center gap-4">
          {user && (
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Menu (Visible only if user is signed in) */}
        {user && menuOpen && (
          <div className="absolute top-14 right-0 w-screen bg-black p-4 lg:hidden">
            <div className="max-w-[90%] mx-auto space-y-4">
              <Link href="/profile" className="flex items-center gap-2 text-white hover:opacity-80 transition">
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <span className="text-sm font-semibold">{user.name}</span>
              </Link>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <span className="text-sm font-semibold text-white">{user.name}</span>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <button className="rounded-[7px] p-2.5 px-6 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Sign In Button (Shown only when user is not signed in) */}
        {!user && (
          <div className="lg:hidden">
            <Link href="/login">
            <button className="rounded-[7px] p-2.5 px-6 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
