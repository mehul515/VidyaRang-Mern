"use client";
import React from "react";
import Herosection from "./Herosection";
import Navbar from "./Navbar";
import About from "./About";
import { SparklesCore } from "@/components/ui/sparkles";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Sparkles Background - Positioned Behind Everything */}
      <div className="absolute inset-0 h-[calc(100vh)] -z-10 overflow-hidden">

      </div>

      {/* Components with Sparkles Background */}
      <div className="relative">
        <Navbar />
        <Herosection />
      </div>

      {/* Normal Components */}
      <About />
    </div>
  );
}
