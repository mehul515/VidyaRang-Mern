"use client";
import { useState } from "react";
import Sidebar from "../../components/SideBar";
import About from "../../components/About";
import CreateNewCourse from "../../components/CreateNewCourse";
import ChatWithCourse from "../../components/ChatWithCourse";
import AssignCourse from "../../components/AssignCourse";
import DataAnalysis from "../../components/DataAnalysis";
import Home from "../../components/Home";
import Navbar from "../../components/Navbar"

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

    <div className="flex  text-white">
      {/* Sidebar Component */}
      <div className="hidden lg:block h-screen ">
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    </div>
      
      {/* Content Area */}
      <div className="flex-1 h-full overflow-hidden">{renderContent()}</div>
    </div>
    </>
  );
};

export default MainPage;
