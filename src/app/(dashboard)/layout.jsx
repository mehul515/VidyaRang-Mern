"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import Script from "next/script";

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

      {/* Google tag (gtag.js) */}
      <Script
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=G-R59CWQG99J`}
  />

  {/* Initialize gtag */}
  <Script
    id="gtag-init"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-R59CWQG99J');
      `,
    }}
  />

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