"use client";
import { useState } from "react";
import {
    HomeIcon, InfoIcon, PlusCircleIcon, MessageCircleIcon, UsersIcon, BarChartIcon
} from "lucide-react";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
    const menuItems = [
        { name: "Home", icon: HomeIcon, section: "Navigation" },
        { name: "About", icon: InfoIcon, section: "Navigation" },
        { name: "Create new course", icon: PlusCircleIcon, section: "Choose Action" },
        { name: "Chat with course", icon: MessageCircleIcon, section: "Choose Action" },
        { name: "Assign course", icon: UsersIcon, section: "Choose Action" },
        { name: "Analysis", icon: BarChartIcon, section: "Analysis" },
    ];

    return (
        <div className="m-5  mt-28 ">
            <div className="relative w-72 p-7 rounded-2xl bg-gray-900 border-r border-gray-700 flex flex-col">
                {/* Sidebar Options */}
                <div className="mt-16 flex flex-col gap-9">
                    {["Navigation", "Choose Action", "Analysis"].map((section) => (
                        <div key={section}>
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">{section}</h3>
                            <div className="flex flex-col gap-1">
                                {menuItems
                                    .filter((item) => item.section === section)
                                    .map((item) => (
                                        <button
                                            key={item.name}
                                            className={`group flex items-center gap-3 p-2.5 w-full rounded-[5px] transition-colors ${selectedOption === item.name ? "bg-[#a56d3d]" : "hover:bg-gray-800"}`}
                                            onClick={() => setSelectedOption(item.name)}
                                        >
                                            <item.icon size={20} className="min-w-[20px]" />
                                            <span>{item.name}</span>
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
