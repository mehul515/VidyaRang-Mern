import React from 'react'

export default function Home() {
  return (
    <div className="relative text-center mt-32 flex flex-col justify-center items-center">
      {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}

      <div className="text-white pb-2">
        <h1 className="lg:text-7xl text-5xl text-cyan-400 font-bold inline-block ">VidyaRANG</h1>

      </div>
      <h2 className="lg:text-4xl text-2xl mt-5 text-white font-medium">Learning Made Easy</h2>

      <div className=" p-2 mt-5 lg:text-2xl text-xl cursor-not-allowed ">
        <h1 className=" text-gray-300">An AIGurukul Initiative - Build by students for students</h1>
      </div>
    </div>
  )
}
