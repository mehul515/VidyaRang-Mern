import React from 'react'
import Createcourse from './Createcourse'
import Videobox from './Videobox'

export default function Home() {
  return (
    <div className=" mt-20 h-screen lg:pb-28 pb-72 overflow-auto lg:px-6 px-2 text-center flex flex-col ">
      {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}

      <div className="text-white pb-2">
        <h1 className="lg:text-7xl text-5xl text-cyan-400 font-bold inline-block ">VidyaRANG</h1>

      </div>
      <h2 className="lg:text-4xl text-2xl mt-5 text-white font-medium">Learning Made Easy</h2>

      <div className=" p-2 mt-5 lg:text-2xl text-xl cursor-not-allowed ">
        <h1 className=" text-gray-300">An AIGurukul Initiative - Build by students for students</h1>
      </div>

      <Createcourse />


      <div className='w-full  mt-10 lg:p-10 p-2 pb-10 flex flex-col justify-center'>
        <div className='text-center '>
          <h1 className='lg:text-5xl text-4xl text-center font-bold pt-5 pb-7'>VidyaRANG Featured Videos</h1>
        </div>



        <Videobox/>

      </div>

    </div>
  )
}
