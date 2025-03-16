"use client";
import { useState, useEffect } from "react";
import supabase from "../app/supabaseClient";
import {
    HomeIcon, InfoIcon, PlusCircleIcon, MessageCircleIcon, UsersIcon, BarChartIcon
} from "lucide-react";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { user_metadata } = session.user;
                setUserRole(user_metadata.role || "learner");
            } else {
                setUserRole(null);
            }
        };

        fetchUser();
        supabase.auth.onAuthStateChange((_, session) => {
            if (session) {
                const { user_metadata } = session.user;
                setUserRole(user_metadata.role || "learner");
            } else {
                setUserRole(null);
            }
        });
    }, []);

    const menuItems = [
        { name: "Home", icon: HomeIcon, section: "Navigation", path: "/main" },
        { name: "About", icon: InfoIcon, section: "Navigation" },
        { name: "Create new course", icon: PlusCircleIcon, section: "Choose Action", roles: ["admin", "instructor"] },
        { name: "Chat with course", icon: MessageCircleIcon, section: "Choose Action" },
        { name: "Assign course", icon: UsersIcon, section: "Choose Action", roles: ["admin"] },
        { name: "Analysis", icon: BarChartIcon, section: "Analysis" },
    ];

    return (
        <div className="m-5 mt-28">
            <div className="relative w-72 p-7 rounded-2xl bg-gray-900 border-r border-gray-700 flex flex-col">
                <div className="mt-16 flex flex-col gap-9">
                    {["Navigation", "Choose Action", "Analysis"].map((section) => (
                        <div key={section}>
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">{section}</h3>
                            <div className="flex flex-col gap-1">
                                {menuItems
                                    .filter((item) => item.section === section)
                                    .filter((item) => !item.roles || item.roles.includes(userRole)) // Role-based filtering
                                    .map((item) => (
                                        <button
                                            key={item.name}
                                            className={`group flex items-center gap-3 p-2.5 w-full rounded-[5px] transition-colors ${selectedOption === item.name ? "bg-cyan-900/30" : "hover:bg-gray-800"}`}
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
