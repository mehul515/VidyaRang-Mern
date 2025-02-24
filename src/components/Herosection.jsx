import React from "react";
const Herosection = () => {
  return (
    <div className="relative text-center mt-24 flex flex-col justify-center items-center">
            {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}

      <div className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-white bg-clip-text text-transparent pb-2">
        <h1 className="text-6xl font-bold inline-block ">VidyaRANG</h1>
      </div>
      <h2 className="text-4xl mt-5 text-white font-medium">Learning Made Easy</h2>
      <div className="mt-5">
        <h1 className="text-white lg:text-2xl text-xl">Upload, Learn, Interact, Assess, and Improve - Your Complete Learning Journey</h1>

      </div>

      <div className="flex gap-10 mt-10 justify-center items-center">
        
        <a href="">
    
        <button className='rounded-2xl p-3 px-8 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 font-bold text-black border-cyan-400 border-2 lg:text-base text-sm hover:bg-gradient-to-r'>Login</button>

        </a>
        <a href="">
        <button className='rounded-md p-3 px-6 text-cyan-400 border-cyan-400 border-2 lg:text-base text-sm hover:bg-gradient-to-r hover:from-cyan-500 hover:text-white hover:to-cyan-300 '>Get Started</button>
        </a>
      </div>
    </div>
  );
};

export default Herosection;
