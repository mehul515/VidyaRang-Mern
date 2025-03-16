"use client"

import React from 'react'
import { FaLock } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { MdPlayCircle } from "react-icons/md";
export default function About() {
  return (
    <div className='mt-36 lg:px-6 px-2 '>

      <div className='bg-[#0c0c0c] lg:p-10 p-2'>

        <div className='text-white lg:px-14 px-3 py-4 mt-5 flex w-full lg:gap-10 gap-3  items-center  lg:flex-row flex-col'>
          <div className='lg:w-1/2 w-full text-white font-sans text-justify lg:text-xl text-base '>

            <h1 className='lg:text-5xl sm:text-4xl text-3xl font-medium lg:text-left text-center '> What is{' '}
              <span className='bg-gradient-to-t from-cyan-400 font-bold  to-white text-transparent bg-clip-text'>
                VidyaRANG
              </span></h1>

            <div className='flex items-center  mt-10'>
              <h1 className='lg:text-left text-center  lg:text-2xl text-xl text-zinc-400'>Know everything about
                {' '} <span className='font-semibold text-white underline-offset-4 underline'> VidyaRANG   </span>  {' '}  </h1>
              {/* <MdPlayCircle className='lg:text-3xl text-2xl' /> */}
            </div>


            <h1 className='mt-6 text-gray-300 text-lg'>Welcome to VidyaRANG, your smart companion for learning! VidyaRANG is an AI-powered educational platform designed to make studying simpler, more interactive, and engaging. With VidyaRANG, you can easily upload your study materials, chat directly with your documents to get instant answers, take quizzes to test your knowledge, and analyze your progress with in-depth feedback.
            </h1>

            <h1 className='mt-5 text-lg text-gray-300 '>Whether you're a student or a lifelong learner, VidyaRANG makes learning easier and more effective. Dive into a personalized learning experience and see how VidyaRANG can help you reach your educational goals with confidence!</h1>
          </div>
          <div className=' rounded-2xl flex justify-center lg:w-1/2 w-full  '>
            <img className='object-fill lg:h-[450px] h-[310px]  rounded-2xl  ' src="/assets/main.png" alt="" />
          </div>

        </div>

      </div>

      <div className=" w-full mt-20 ">

        <div className="  opacity-95 lg:p-10 p-4 ">
          <div>
            <h1 className='lg:text-5xl text-4xl text-center font-bold' >Key Features of VidyaRANG</h1>
            <h2 className='mt-8 text-center lg:text-xl text-lg text-gray-300'>Secure Sharing, Engaging Learning, In-Depth Insights </h2>

            <div className='flex mt-10 lg:p-8 p-1 justify-evenly flex-wrap lg:gap-2 gap-10'>

              {[
                { icon: <FaLock className='text-2xl text-cyan-400' />, title: 'LockShare', desc: 'Privacy-First Document Sharing' },
                { icon: <FaChartBar className='text-2xl text-cyan-400' />, title: 'GraphEval', desc: 'Comprehensive Evaluation and Analytics' },
                { icon: <FaBrain className='text-2xl text-cyan-400' />, title: 'BrainQuiz', desc: 'Diverse Quizzes: Factual, Memory, and Reasoning' },
              ].map((item, index) => (
                <div key={index} className='w-96 lg:h-60 h-52 flex flex-col  justify-center lg:px-7 px-7 lg:p-7 p-4 rounded-xl bg-[#242525] border-[#4d4d4e] border hover:border-cyan-500 transition-all duration-300 ease-in-out'>
                  {item.icon}
                  <h1 className='mt-5 font-semibold lg:text-2xl text-xl'>{item.title}</h1>
                  <h1 className='mt-5 text-lg text-gray-300 '>{item.desc}</h1>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>



      

    </div>
  )
}
