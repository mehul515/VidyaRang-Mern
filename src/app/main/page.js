"use client";
import { useState } from "react";
import Sidebar from "../../components/SideBar";
import About from "../../components/About";
import CreateNewCourse from "../../components/CreateNewCourse";
import ChatWithCourse from "../../components/ChatWithCourse";
import AssignCourse from "../../components/AssignCourse";
import DataAnalysis from "../../components/DataAnalysis";
import Home from "../../components/Home";
import Navbar from "../../components/Navbar";
import Aboutmain from "@/components/Aboutmain";

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState("Home");

  const renderContent = () => {
    switch (selectedOption) {
      case "Home":
        return <Home />;
      case "About":
        return <Aboutmain />;
      case "Create new course":
        return <CreateNewCourse />;
      case "Chat with course":
        return <ChatWithCourse />;
      case "Assign course":
        return <AssignCourse />;
      case "Analysis":
        return <DataAnalysis />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          height: 100%;
          overflow: hidden; /* Prevent page scrolling */
        }
      `}</style>

      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <div className="flex text-white">
        {/* Sidebar for Desktop */}
        <div className="hidden lg:block h-screen border-r border-gray-900">
          <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden h-full lg:p-4  p-2 ">{renderContent()}</div>
      </div>
    </>
  );
};

export default MainPage;
