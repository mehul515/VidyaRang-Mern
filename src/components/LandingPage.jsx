"use client";
import React, { useRef } from "react";
import Herosection from "./Herosection";
import Navbar from "./Navbar";
import About from "./About";
import Createcourse from "./Createcourse";
import Footer from "./Footer";
import Feature from "./Feature";

export default function LandingPage() {


  const createCourseRef = useRef(null);

  const scrollToCreateCourse = () => {
    if (createCourseRef.current) {
      createCourseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (


    <div className="relative">
      <div className="absolute inset-0 h-[calc(100vh)] -z-10 overflow-hidden">

      </div>

      <div className="relative">
        <Navbar />
        <Herosection onScrollToCreateCourse={scrollToCreateCourse} />
      </div>

      {/* Normal Components */}
      <About />
      <Createcourse ref={createCourseRef} />
      <Feature/>
      <Footer/>
    </div>
  );
}
