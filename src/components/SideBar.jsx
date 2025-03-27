"use client";
import { useState, useEffect } from "react";
import supabase from "../app/supabaseClient";
import {
    HomeIcon, InfoIcon, PlusCircleIcon, MessageCircleIcon, UsersIcon, BarChartIcon
} from "lucide-react";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
    // State to store the role of the logged-in user
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Function to fetch the authenticated user's role from Supabase
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { user_metadata } = session.user;
                setUserRole(user_metadata.role || "Learner"); // Default role is "Learner"
            } else {
                setUserRole(null);
            }
        };

        fetchUser();

        // Listen for authentication state changes and update the role accordingly
        supabase.auth.onAuthStateChange((_, session) => {
            if (session) {
                const { user_metadata } = session.user;
                setUserRole(user_metadata.role || "Learner");
            } else {
                setUserRole(null);
            }
        });
    }, []);

    // List of menu items with role-based access control
    const menuItems = [
        { name: "Home", icon: HomeIcon, section: "Navigation", path: "/main" },
        { name: "About", icon: InfoIcon, section: "Navigation" },
        { name: "Create new course", icon: PlusCircleIcon, section: "Choose Action", roles: ["Instructor"] }, // Restricted to Instructors
        { name: "Chat with course", icon: MessageCircleIcon, section: "Choose Action" },
        { name: "Assign course", icon: UsersIcon, section: "Choose Action", roles: ["Instructor"] }, // Restricted to Instructors
        { name: "Analysis", icon: BarChartIcon, section: "Analysis" },
    ];

    return (
        <div className="m-5 mt-24">
            {/* Sidebar Container */}
            <div className="relative w-72 p-7 rounded-2xl bg-[#131313] flex flex-col">
                
                {/* Sidebar Menu Sections */}
                <div className="mt-16 flex flex-col gap-9">
                    {["Navigation", "Choose Action", "Analysis"].map((section) => (
                        <div key={section}>
                            {/* Section Heading */}
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">{section}</h3>

                            {/* Section Items */}
                            <div className="flex flex-col gap-1">
                                {menuItems
                                    .filter((item) => item.section === section) // Filter items belonging to the current section
                                    .filter((item) => !item.roles || item.roles.includes(userRole)) // Apply role-based filtering
                                    .map((item) => (
                                        <button
                                            key={item.name}
                                            className={`group flex items-center gap-3 p-2.5 w-full rounded-[5px] transition-colors ${
                                                selectedOption === item.name ? "bg-cyan-900/30" : "hover:bg-gray-800"
                                            }`}
                                            onClick={() => setSelectedOption(item.name)} // Update selected option
                                        >
                                            {/* Icon and Name of Menu Item */}
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
