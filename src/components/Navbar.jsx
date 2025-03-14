'use client'
import React from 'react'
import { RainbowButton } from "@/components/magicui/rainbow-button";
const Header = () => {
  return (
    <div >
    <header className="fixed top-0 left-0 w-full bg-[#030303] z-50 border-b-[0.02px] border-gray-900">

      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center  justify-between py-4 px-4">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className='lg:text-2xl text-xl text-white font-bold'>AIGurukul</h1>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">


          <a href="/login" className="text-sm font-semibold text-gray-900">
          
          <button className='rounded-[7px] p-2.5 px-4 text-black  bg-cyan-400 lg:text-sm  hover:bg-cyan-500 '>Sign Up</button>
          </a>
        </div>
      </nav>

    </header>

    </div>
  )
}

export default Header
