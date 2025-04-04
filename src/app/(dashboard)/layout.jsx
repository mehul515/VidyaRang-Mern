"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Map between routes and sidebar options
  const routeToOption = {
    "/main": "Home",
    "/about": "About",
    "/create-course": "Create new course",
    "/chat": "Chat with course",
    "/assign": "Assign course",
    "/analysis": "Analysis",
  };

  const [selectedOption, setSelectedOption] = useState(
    routeToOption[pathname] || "Home"
  );

  const handleNavigation = (option) => {
    const routeMap = {
      "Home": "/main",
      "About": "/about",
      "Create new course": "/create-course",
      "Chat with course": "/chat",
      "Assign course": "/assign",
      "Analysis": "/analysis",
    };
    router.push(routeMap[option]);
    setSelectedOption(option);
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      <Navbar
        selectedOption={selectedOption}
        setSelectedOption={handleNavigation}
      />

      <div className="flex text-white">
        {/* Persistent Sidebar */}
        <div className="hidden lg:block h-screen border-r border-gray-900 sticky top-0">
          <Sidebar
            selectedOption={selectedOption}
            setSelectedOption={handleNavigation}
          />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh)] lg:p-4 p-2">
          {children}
        </main>
      </div>
    </>
  );
}