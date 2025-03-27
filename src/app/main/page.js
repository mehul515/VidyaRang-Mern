"use client";
import { useState } from "react";
import Sidebar from "../../components/SideBar";
import CreateNewCourse from "../../components/CreateNewCourse";
import ChatWithCourse from "../../components/ChatWithCourse";
import AssignCourse from "../../components/AssignCourse";
import DataAnalysis from "../../components/DataAnalysis";
import Home from "../../components/Home";
import Navbar from "../../components/Navbar";
import Aboutmain from "@/components/Aboutmain";

const MainPage = () => {
  // State to manage the currently selected option in the sidebar or navbar
  const [selectedOption, setSelectedOption] = useState("Home");

  // Function to render the appropriate component based on the selected option
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
      {/* Global styles to prevent page scrolling */}
      <style jsx global>{`
        html, body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      {/* Navbar component to handle navigation */}
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <div className="flex text-white">
        {/* Sidebar for larger screens (hidden on smaller screens) */}
        <div className="hidden lg:block h-screen border-r border-gray-900">
          <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
        {/* Main content area that dynamically displays the selected component */}
        <div className="flex-1 overflow-hidden h-full lg:p-4 p-2">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default MainPage;
