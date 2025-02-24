"use client";
import { useState } from "react";
import {
    HomeIcon, InfoIcon, PlusCircleIcon, MessageCircleIcon, UsersIcon, BarChartIcon, ChevronLeft, ChevronRight
} from "lucide-react";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const menuItems = [
        { name: "Home", icon: HomeIcon, section: "Navigation" },
        { name: "About", icon: InfoIcon, section: "Navigation" },
        { name: "Create new course", icon: PlusCircleIcon, section: "Choose Action" },
        { name: "Chat with course", icon: MessageCircleIcon, section: "Choose Action" },
        { name: "Assign course", icon: UsersIcon, section: "Choose Action" },
        { name: "Analysis", icon: BarChartIcon, section: "Analysis" },
    ];

    return (
        <div className=" m-5">
            <div className={`relative rounded-2xl bg-gray-900 border-r border-gray-700 transition-all ${isCollapsed ? "w-14 px-2 py-4" : "w-72 p-7"} h-full flex flex-col`}>

                {/* Collapse Button */}
                <button
                    className={`hidden md:block absolute top-6 ${isCollapsed ? "right-[10px]" : "right-[20px]"} bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-700 transition z-50`}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight size={20} fill="white" /> : <ChevronLeft size={20} fill="white" />}
                </button>

                {/* Sidebar Options */}
                <div className="mt-16 flex flex-col gap-9">
                    {["Navigation", "Choose Action", "Analysis"].map((section) => (
                        <div key={section}>
                            {!isCollapsed && <h3 className="text-sm font-semibold text-gray-400 mb-3">{section}</h3>}
                            <div className="flex flex-col gap-1">
                                {menuItems
                                    .filter((item) => item.section === section)
                                    .map((item) => (
                                        <button
                                            key={item.name}
                                            className={`group relative flex items-center gap-3 p-2.5 w-full rounded-lg transition-colors ${selectedOption === item.name ? "bg-[#a56d3d]" : "hover:bg-gray-800"
                                                } ${isCollapsed && "justify-center"}`}
                                            onClick={() => setSelectedOption(item.name)}
                                        >
                                            <item.icon size={20} className="min-w-[20px]" />
                                            {!isCollapsed && <span>{item.name}</span>}

                                            {/* Tooltip for collapsed mode */}
                                            {isCollapsed && (
                                                <div className="absolute left-14 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-auto whitespace-nowrap">
                                                    {item.name}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
