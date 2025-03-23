import {React, useState, useRef} from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Poppins } from "next/font/google";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Choose desired weights
  variable: "--font-poppins",
});

const Herosection = ({ onScrollToCreateCourse }) => {
  
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
    <div className={`${poppins.variable} font-sans relative text-center mt-44 flex flex-col justify-center items-center`}>


      {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}


      <div className="text-white pb-2">
        <h1 className="lg:text-7xl text-5xl text-cyan-400 font-bold inline-block ">VidyaRANG</h1>

      </div>
      <h2 className="lg:text-4xl text-2xl mt-5 text-white font-medium">Learning Made Easy</h2>

      <div className=" p-2 mt-5 lg:text-2xl text-xl cursor-not-allowed ">
        <h1 className=" text-gray-300">An AIGurukul Initiative - Build by students for students</h1>
      </div>

      <div className="flex items-center z-99  mt-10  gap-10 lg:flex-row flex-col">


      <div className="flex gap-10 justify-center items-center">

        <a href="/signup">
          <button className='rounded-[10px] p-2.5 px-6  text-black bg-cyan-400 hover:bg-cyan-500 '>Get Started {'>'} </button>
        </a>
        <a >
          <button   onClick={onScrollToCreateCourse}  className="rounded-[10px] p-2.5 px-6 border-gray-700 border bg-black hover:bg-gray-950 " >How It Works</button>
        </a>
      </div>
      <div className="">

        <audio ref={audioRef}  onEnded={handleAudioEnd} src="/assets/vidyarang.wav" preload="auto" />
        <button className=" text-lg border text-cyan-400 bg-black border-gray-700 p-2.5 px-6 rounded-xl" onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> :  <FaPlay />}
      </button>
      </div>

      </div>
    </div>
  );
};

export default Herosection;
