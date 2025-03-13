"use client"

import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import "react-vertical-timeline-component/style.min.css";
import { array } from "./content.js"
export default function About() {
  return (
    <div className='h-screen  ' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

      <div className='text-white lg:p-24 p-5 mt-32'>
        <div className='w-full  lg:h-96 h-44 bg-white rounded-2xl'>
          <img className='w-full h-full object-cover rounded-2xl' src="/assets/main.jpg" alt="" />
        </div>
        <div className='mt-10 text-white text-justify'>
          <h1>Welcome to VidyaRANG, your smart companion for learning! VidyaRANG is an AI-powered educational platform designed to make studying simpler, more interactive, and engaging. With VidyaRANG, you can easily upload your study materials, chat directly with your documents to get instant answers, take quizzes to test your knowledge, and analyze your progress with in-depth feedback.
          </h1>

          <h1 className='mt-5'>Whether you're a student or a lifelong learner, VidyaRANG makes learning easier and more effective. Dive into a personalized learning experience and see how VidyaRANG can help you reach your educational goals with confidence!</h1>
        </div>

      </div>


      <div className=" w-full ">

        <div className="  opacity-95 lg:p-10 p-4 ">
          <div>
            <h1 className='lg:text-5xl text-4xl text-center font-bold' >Key Features of VidyaRANG</h1>
            <h2 className='mt-8 text-center'>Secure Sharing, Engaging Learning, In-Depth Insights </h2>

            <div className='flex mt-10 lg:p-8 p-1 justify-evenly flex-wrap lg:gap-2 gap-10'>
              <div className='lg:w-64 w-60 lg:p-4 p-3 rounded-xl  bg-[#080d32] border-[#080d49] border'>
                <h1 className='lg:p-5 p-1 lg:text-3xl text-xl'>1</h1>
                <h1 className='lg:mt-8 mt-5 lg:text-2xl text-lg lg:p-4 p-1'>Privacy-First Document Sharing</h1>
              </div>
              <div className='lg:w-64 w-60 lg:p-4 p-3 rounded-xl  bg-[#080d32] border-[#080d49] border'>
                <h1 className='lg:p-5 p-1 lg:text-3xl text-xl'>2</h1>
                <h1 className='lg:mt-8 mt-5 lg:text-2xl text-lg lg:p-4 p-1'>Comprehensive Evaluation and Analytics</h1>
              </div>
              <div className='lg:w-64 w-60 lg:p-4 p-3 rounded-xl  bg-[#080d32] border-[#080d49] border'>
                <h1 className='lg:p-5 p-1 lg:text-3xl text-xl'>3</h1>
                <h1 className='lg:mt-8 mt-5 lg:text-2xl text-lg lg:p-4 p-1'>Diverse Quizzes: Factual, Memory, and Reasoning</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='w-full mt-16 mb-60 '>
        <div className='mb-8'>
          <h1 className='lg:text-5xl text-4xl font-bold text-center'>Steps To On-Board Your Course</h1>
        </div>
        <VerticalTimeline>

          {array.map((e) => (

            <VerticalTimelineElement
              key={e.id}
              className=""
              visible={ false }
              contentStyle={{ padding: '20px', marginBottom: '-10px', backgroundColor : '#080d32' }} 
              iconStyle={{
                background: '#080d24',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

              }}
              icon={<div className="text-white font-bold text-lg">{e.id}</div>} // Number inside the circle
            >
              <h1 className='text-white text-center lg:text-xl text-lg font-semibold'>{e.des}</h1>
            </VerticalTimelineElement>



          ))}


        </VerticalTimeline>
      </div>


    </div>
  )
}
