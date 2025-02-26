import React from 'react'
import { motion } from "framer-motion";
import  LampContainer  from "../components/ui/lamp"
export default function About() {
  return (
    <div className='text-white lg:p-24 p-5'>
      <div className='w-full  lg:h-96 h-44 bg-white rounded-2xl'>
      <img className='w-full h-full object-cover rounded-2xl' src="/assets/main.png" alt="" />
      </div>
      <div className='mt-10 text-white text-justify'>
        <h1>Welcome to VidyaRANG, your smart companion for learning! VidyaRANG is an AI-powered educational platform designed to make studying simpler, more interactive, and engaging. With VidyaRANG, you can easily upload your study materials, chat directly with your documents to get instant answers, take quizzes to test your knowledge, and analyze your progress with in-depth feedback.
        </h1>

        <h1 className='mt-5'>Whether you're a student or a lifelong learner, VidyaRANG makes learning easier and more effective. Dive into a personalized learning experience and see how VidyaRANG can help you reach your educational goals with confidence!</h1>
      </div>
   
    </div>
  )
}
