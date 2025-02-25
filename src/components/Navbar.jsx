'use client'
import React from 'react'
import { RainbowButton } from "@/components/magicui/rainbow-button";
const Header = () => {
  return (
    <div>
    <header className="bg-transparent">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className='text-4xl text-white font-bold'>AIGurukul</h1>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold text-gray-900">
          
          <button className='rounded-lg p-3 px-6 text-cyan-400 border-cyan-400 border-2 lg:text-sm text-xs hover:bg-gradient-to-r hover:from-cyan-500 hover:text-white hover:to-cyan-300 '>Get Started</button>
          </a>
        </div>
      </nav>
    </header>

    </div>
  )
}

export default Header
