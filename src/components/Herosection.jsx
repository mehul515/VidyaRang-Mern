import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundLines } from "@/components/ui/background-lines";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

const Herosection = () => {

  const words = 'Upload, Learn, Interact, Assess, and Improve - Your Complete Learning Journey';

  return (
    <div className="relative text-center py-28 flex flex-col justify-center items-center">


      {/* <Spotlight className="absolute top-10 left-0 md:left-40 md:top-0" fill="white" /> */}

      <div className=" flex justify-between items-center gap-3 py-1 px-3  mb-10 rounded-3xl bg-transparent border border-blue-500 ">
        <h1 className="bg-slate-700 text-white text-center rounded-3xl px-2 lg:text-sm text-xs">New </h1>
        <AnimatedGradientText className="lg:text-sm text-xs font-medium">
          Unlock your full potential with -
        </AnimatedGradientText>
      </div>


      <div className="text-white pb-2">
        <h1 className="lg:text-6xl text-5xl font-semibold inline-block ">VidyaRANG</h1>

      </div>
      <h2 className="lg:text-4xl text-2xl mt-5 text-white font-medium">Learning Made Easy</h2>

      <div className="lg:mt-5 mt-2 px-4 ">
        <TextGenerateEffect className="" words={words} />

      </div>

      <div className="flex lg:gap-24 z-99 gap-10 mt-10 justify-center items-center">

        <a href="/login">
          <button className='rounded-[10px] p-2.5 px-6 text-white border-purple-900 border-2  hover:bg-gradient-to-r hover:from-purple-700 hover:text-white hover:to-purple-500 '>Get Started</button>
        </a>
      </div>
    </div>
  );
};

export default Herosection;
