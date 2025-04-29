import Link from 'next/link'
import React from 'react'
import { useTheme } from "./Themecontextprovider";
export default function Footer() {

  
     const { darkMode, toggleTheme } = useTheme();
  return (
    <div className='lg:mt-28 mt-10 '>
      <div className='text-center p-4' >
        <h1 className='lg:text-4xl text-3xl font-semibold text-center'>Ready to Transform Your Learning Experience?</h1>
        <h2 className={`lg:text-xl text-lg ${darkMode? "text-gray-300":"text-gray-800"}   mt-5 text-center`}>Unlock a smarter way to learn with VidyaRANG and stay ahead in your studies!</h2>
        <Link href="/main">
          <button className={`rounded-[10px] mt-10 p-2.5 px-6  ${darkMode ? "text-black bg-cyan-400 hover:bg-cyan-500":"text-white bg-blue-500 hover:bg-blue-600"}  `}>Start Learning Today </button>
        </Link>
      </div>
      <footer className={` ${darkMode?"bg-[#0c0c0c] border-[#282727]":"bg-gray-300/30 border-gray-300"}       w-full  lg:mt-20 mt-10  border-t-[0.01px] `}>
        <div className='flex lg:p-20 p-10 lg:justify-between justify-center items-center lg:flex-row flex-col '>
          <div>
            <h1 className={`text-2xl font-bold lg:text-start text-center ${darkMode? "text-cyan-400":"text-black"} `}>VidyaRANG</h1>
            <h2 className={`mt-2 ${darkMode?"text-gray-300":"text-gray-600"} `}>© 2025 VidyaRANG. All rights reserved.</h2>
          </div>
          <div className='flex gap-5 flex-row lg:mt-0 mt-4'>
            <h1 className={` cursor-pointer font-medium  ${darkMode?"text-gray-400 hover:text-white":"text-black"}  `} >Privacy</h1>
            <h1 className={` cursor-pointer  font-medium  ${darkMode?"text-gray-400 hover:text-white ":"text-black"}  `} >Terms</h1>
            <h1 className={` cursor-pointer  font-medium  ${darkMode?"text-gray-400 hover:text-white ":"text-black"}  `} >Contact</h1>
          </div>
        </div>
      </footer>
    </div>
  )
}
