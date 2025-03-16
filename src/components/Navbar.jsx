'use client'
import React, { useEffect, useState } from 'react'
import { User } from "lucide-react"
import Link from "next/link"
import supabase from "../app/supabaseClient"

const Header = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || "User",
          avatarUrl: session.user.user_metadata.avatar_url || "/profile.png"
        })
      } else {
        setUser(null)
      }
    }

    fetchUser()
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || "User",
          avatarUrl: session.user.user_metadata.avatar_url || "/default-avatar.png"
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full bg-[#030303] z-50 border-b-[0.02px] border-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className="lg:text-2xl text-xl text-white font-bold">AIGurukul</h1>
          </a>
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <img 
                  src={user.avatarUrl} 
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />
                <span className="text-sm font-semibold text-white hidden lg:block">{user.name}</span>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <button className="rounded-[7px] p-2.5 px-4 text-black bg-cyan-400 lg:text-sm hover:bg-cyan-500">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
