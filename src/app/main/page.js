"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import CreateNewCourse from "@/components/CreateNewCourse";
import ChatWithCourse from "@/components/ChatWithCourse";
import AssignCourse from "@/components/AssignCourse";
import DataAnalysis from "@/components/DataAnalysis";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar"

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState("Home");

  const renderContent = () => {
    switch (selectedOption) {
      case "Home":
        return <div className="text-white"><Home/></div>;
      case "About":
        return <div className="text-white"><About/></div>;
      case "Create new course":
        return <div className="text-white"><CreateNewCourse/></div>;
      case "Chat with course":
        return <div className="text-white"><ChatWithCourse/></div>;
      case "Assign course":
        return <div className="text-white"><AssignCourse/></div>;
      case "Analysis":
        return <div className="text-white"><DataAnalysis/></div>;
      default:
        return <div className="text-white"><Home/></div>;
    }
  };

  return (
    <>
      <Navbar/>
    <div className="flex h-screen text-white">
      {/* Sidebar Component */}
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      
      {/* Content Area */}
      <div className="flex-1 p-4 ps-0 md:ps-4">{renderContent()}</div>
    </div>
    </>
  );
};

export default MainPage;
