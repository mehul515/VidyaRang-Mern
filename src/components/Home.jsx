"use client"

import {React, useState, useRef} from 'react'
import Createcourse from './Createcourse'
import Videobox from './Videobox'
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { useTheme } from "./Themecontextprovider";
export default function Home() {
       const { darkMode, toggleTheme } = useTheme();
   const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
  
    const togglePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const handleAudioEnd = () => {
      setIsPlaying(false); // Reset button to "Play" when audio finishes
    };
  
  return (
    <div className=" mt-20 h-screen lg:pb-28 pb-72 overflow-auto lg:px-6 px-2 text-center flex flex-col ">

      <div className="text-white pb-2">
        <h1 className={`lg:text-7xl text-5xl ${darkMode ? "text-cyan-400" : "text-black"}  font-bold inline-block `}>VidyaRANG</h1>

      </div>
      <h2 className={`lg:text-4xl text-2xl mt-5 ${darkMode? "text-white":"text-gray-600"}  font-medium`}>Learning Made Easy</h2>

      <div className=" p-2 mt-5 lg:text-2xl text-xl cursor-not-allowed ">
        <h1 className={`${darkMode? "text-gray-300":"text-gray-700"} `}>An AIGurukul Initiative - Build by students for students</h1>
      </div>
       <div className="mt-6">
      
              <audio ref={audioRef}  onEnded={handleAudioEnd} src="/assets/vidyarangg.wav" preload="auto" />
              <button className={` text-lg border ${darkMode ?"text-cyan-400 bg-black border-gray-700":"text-blue-600 bg-white border-blue-600"}   p-2.5 px-6 rounded-xl`} onClick={togglePlayPause}>
              {isPlaying ? <HiMiniSpeakerXMark className="text-xl" /> : <HiMiniSpeakerWave className="text-xl" />}
            </button>
            </div>

      <Createcourse />


      <div className='w-full  mt-10 lg:p-10 p-2 pb-10 flex flex-col justify-center'>
        <div className='text-center '>
          <h1 className={` ${darkMode? "text-white":"text-black"} lg:text-5xl text-4xl text-center font-bold pt-5 pb-7`}>VidyaRANG Featured Videos</h1>
        </div>



        <Videobox/>

      </div>

    </div>
  )
}
