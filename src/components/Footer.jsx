import React from 'react'

export default function Footer() {
  return (
    <div className='lg:mt-28 mt-10 '>
      <div className='text-center p-4' >
          <h1 className='lg:text-4xl text-3xl font-semibold text-center'>Ready to Transform Your Learning Experience?</h1>
          <h2 className='lg:text-xl text-lg text-gray-300  mt-5 text-center'>Unlock a smarter way to learn with VidyaRANG and stay ahead in your studies!</h2>

          <button className='rounded-[10px] mt-10 p-2.5 px-6   text-black bg-cyan-400 hover:bg-cyan-500 '>Start Learning Today </button>
      </div>
      <footer className='bg-[#0c0c0c] w-full  lg:mt-20 mt-10  border-t-[0.01px] border-[#282727]'>
          <div className='flex lg:p-20 p-10 lg:justify-between justify-center items-center lg:flex-row flex-col '>
            <div>
                <h1 className='text-2xl font-bold lg:text-start text-center text-cyan-400'>VidyaRANG</h1>
                <h2 className='mt-2 text-gray-300'>© 2025 VidyaRANG. All rights reserved.</h2>
            </div>
            <div className='flex gap-5 flex-row lg:mt-0 mt-4'>
                <h1 className='cursor-pointer text-gray-400 hover:text-white' >Privacy</h1>
                <h1 className='cursor-pointer text-gray-400 hover:text-white' >Terms</h1>
                <h1 className='cursor-pointer text-gray-400 hover:text-white' >Contact</h1>
            </div>
          </div>
      </footer>
    </div>
  )
}
