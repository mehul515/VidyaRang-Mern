"use client"

import React from 'react'
import { useTheme } from "./Themecontextprovider";

export default function About() {


  const { darkMode, toggleTheme } = useTheme();



  return (


    <div className='mt-36 lg:px-6 px-2 '>

      {/* Main container with background color */}
      <div className={`  ${darkMode ? "bg-[#0c0c0c]" : "bg-gray-200/30"}        lg:p-10 p-2`}>

        {/* Introduction Section */}
        <div className='text-white lg:px-14 px-3 py-4 mt-5 flex w-full lg:gap-10 gap-3 items-center lg:flex-row flex-col'>
          
          {/* Left Section - Text Content */}
          <div className='lg:w-1/2 w-full text-white font-sans text-justify lg:text-xl text-base '>
            
            {/* Heading */}
            <h1 className={`lg:text-5xl sm:text-4xl text-3xl ${darkMode? "text-white":"text-gray-950"} font-medium lg:text-left text-center `}> What is{' '}
              <span className={`     ${darkMode? " bg-gradient-to-t from-cyan-400 font-bold  to-white text-transparent bg-clip-text" : "bg-gradient-to-t from-gray-900 font-bold  to-white text-transparent bg-clip-text"}    `}>
                VidyaRANG
              </span>
            </h1>

            {/* Subtitle */}
            <div className='flex items-center mt-10'>
              <h1 className={`lg:text-left text-center lg:text-2xl text-xl "${darkMode? "text-zinc-400":"text-gray-900"} `}> <span className={`${darkMode?"text-zinc-400":"text-gray-600"}`}>Know everything about </span>
                {'  '} <span className={`font-semibold ${darkMode?"text-white":"text-zinc-800"}  underline-offset-4 underline`}> VidyaRANG </span> {' '} 
              </h1>
            </div>

            {/* Description */}
            <h1 className={` ${darkMode? "text-gray-300" : "text-gray-700"} mt-6  text-lg`}>
              Welcome to VidyaRANG, your smart companion for learning! VidyaRANG is an AI-powered educational platform designed to make studying simpler, more interactive, and engaging. With VidyaRANG, you can easily upload your study materials, chat directly with your documents to get instant answers, take quizzes to test your knowledge, and analyze your progress with in-depth feedback.
            </h1>

            <h1 className={` ${darkMode? "text-gray-300" : "text-gray-700"} mt-5  text-lg`}>
              Whether you're a student or a lifelong learner, VidyaRANG makes learning easier and more effective. Dive into a personalized learning experience and see how VidyaRANG can help you reach your educational goals with confidence!
            </h1>
          </div>
          
          {/* Right Section - Image */}
          <div className='rounded-2xl flex justify-center lg:w-1/2 w-full'>
            <img className='object-fill lg:h-[450px] h-[310px] rounded-2xl' src={`${darkMode?"/assets/main.png":"/assets/GENAI.jpg"} `} alt="VidyaRANG" />
          </div>

        </div>

      </div>

      
    </div>
  )
}
