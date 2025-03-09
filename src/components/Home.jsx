import React from 'react'

export default function Home() {
  return (
    <div className="relative text-center mt-24 flex flex-col justify-center items-center">
            {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}

      <div className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-white bg-clip-text text-transparent lg:pb-10 pb-2">
        <h1 className="lg:text-9xl text-4xl font-bold inline-block ">VidyaRANG</h1>
      </div>
      <h2 className="lg:text-4xl text-2xl lg:mt-10 mt-4 text-white font-medium">Learning Made Easy</h2>
      <div className="lg:mt-6 mt-2">
        <h1 className="text-white lg:text-2xl text-xl">Upload, Learn, Interact, Assess, and Improve - Your Complete Learning Journey</h1>

      </div>
    </div>
  )
}
