"use client"

import React from 'react'


export default function About() {
  return (
    <div className='mt-36 lg:px-6 px-2 '>

      {/* Main container with background color */}
      <div className='bg-[#0c0c0c] lg:p-10 p-2'>

        {/* Introduction Section */}
        <div className='text-white lg:px-14 px-3 py-4 mt-5 flex w-full lg:gap-10 gap-3 items-center lg:flex-row flex-col'>
          
          {/* Left Section - Text Content */}
          <div className='lg:w-1/2 w-full text-white font-sans text-justify lg:text-xl text-base '>
            
            {/* Heading */}
            <h1 className='lg:text-5xl sm:text-4xl text-3xl font-medium lg:text-left text-center '> What is{' '}
              <span className='bg-gradient-to-t from-cyan-400 font-bold  to-white text-transparent bg-clip-text'>
                VidyaRANG
              </span>
            </h1>

            {/* Subtitle */}
            <div className='flex items-center mt-10'>
              <h1 className='lg:text-left text-center lg:text-2xl text-xl text-zinc-400'>Know everything about
                {' '} <span className='font-semibold text-white underline-offset-4 underline'> VidyaRANG </span> {' '} 
              </h1>
            </div>

            {/* Description */}
            <h1 className='mt-6 text-gray-300 text-lg'>
              Welcome to VidyaRANG, your smart companion for learning! VidyaRANG is an AI-powered educational platform designed to make studying simpler, more interactive, and engaging. With VidyaRANG, you can easily upload your study materials, chat directly with your documents to get instant answers, take quizzes to test your knowledge, and analyze your progress with in-depth feedback.
            </h1>

            <h1 className='mt-5 text-lg text-gray-300'>
              Whether you're a student or a lifelong learner, VidyaRANG makes learning easier and more effective. Dive into a personalized learning experience and see how VidyaRANG can help you reach your educational goals with confidence!
            </h1>
          </div>
          
          {/* Right Section - Image */}
          <div className='rounded-2xl flex justify-center lg:w-1/2 w-full'>
            <img className='object-fill lg:h-[450px] h-[310px] rounded-2xl' src="/assets/main.png" alt="VidyaRANG" />
          </div>

        </div>

      </div>

      
    </div>
  )
}
