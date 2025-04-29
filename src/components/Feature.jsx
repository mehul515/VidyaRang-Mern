import React from 'react'
import { FaLock } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { MdPlayCircle } from "react-icons/md";
import { useTheme } from "./Themecontextprovider";
const Feature = () => {

   const { darkMode, toggleTheme } = useTheme();
  return (
    <div>{/* Features Section */}
    <div className="w-full mt-20">
      <div className="opacity-95 lg:p-10 p-4">
        <div>
          {/* Heading for Features */}
          <h1 className='lg:text-5xl text-4xl text-center font-bold'>Key Features of VidyaRANG</h1>
          <h2 className={`mt-8 text-center lg:text-xl text-lg ${darkMode? "text-gray-300":"text-gray-700"} `}>Secure Sharing, Engaging Learning, In-Depth Insights</h2>

          {/* Features Cards */}
          <div className='flex mt-10 lg:p-8 p-1 justify-evenly flex-wrap lg:gap-2 gap-10'>
            {
              [
                { icon: <FaLock className={`text-2xl ${darkMode? "text-cyan-400":"text-blue-600"} `} />, title: 'LockShare', desc: 'Privacy-First Document Sharing' },
                { icon: <FaChartBar className={`text-2xl ${darkMode? "text-cyan-400":"text-blue-600"} `} />, title: 'GraphEval', desc: 'Comprehensive Evaluation and Analytics' },
                { icon: <FaBrain className={`text-2xl ${darkMode? "text-cyan-400":"text-blue-600"} `} />, title: 'BrainQuiz', desc: 'Diverse Quizzes: Factual, Memory, and Reasoning' },
              ].map((item, index) => (
                <div key={index} className={`w-96 lg:h-60 h-52 flex flex-col justify-center lg:px-7 px-7 lg:p-7 p-4 rounded-xl  ${darkMode? "bg-[#242525] border-[#4d4d4e] border hover:border-cyan-500":"bg-white border border-gray-300 text-black  "}   transition-all duration-300 ease-in-out`}>
                  {/* Feature Icon */}
                  {item.icon}
                  {/* Feature Title */}
                  <h1 className='mt-5 font-semibold lg:text-2xl text-xl'>{item.title}</h1>
                  {/* Feature Description */}
                  <h1 className={`mt-5 text-lg  ${darkMode?"text-gray-300":"text-gray-600"} `}>{item.desc}</h1>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Feature