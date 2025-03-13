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
            <h1 className='lg:text-3xl text-2xl text-white font-semibold'>AIGurukul</h1>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold text-gray-900">
          
          <button className='rounded-[7px] p-2 px-7 text-white bg-purple-500  lg:text-sm text-xs hover:bg-purple-600 '>Login</button>
          </a>
        </div>
      </nav>
    </header>

    </div>
  )
}

export default Header
