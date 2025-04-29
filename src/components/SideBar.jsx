"use client";
import { useState, useEffect } from "react";
import supabase from "../app/supabaseClient";
import {
    HomeIcon, InfoIcon, PlusCircleIcon, 
    MessageCircleIcon, UsersIcon, BarChartIcon
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./Themecontextprovider";

const Sidebar = ({ selectedOption, setSelectedOption }) => {
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    // Define route mapping for navigation
    const routeMap = {
        "Home": "/main",
        "About": "/about",
        "Create new course": "/create-course",
        "Chat with course": "/chat",
        "Assign course": "/assign",
        "Analysis": "/analysis"
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
                return;
            }
            
            if (session) {
                setUserRole(session.user?.user_metadata?.role || "Learner");
            }
        };

        fetchUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUserRole(session?.user?.user_metadata?.role || null);
        });

        return () => subscription?.unsubscribe();
    }, []);

    // Organized menu items with better TypeScript-like structure
    const menuSections = [
        {
            title: "Navigation",
            items: [
                { name: "Home", icon: HomeIcon, roles: null },
                { name: "About", icon: InfoIcon, roles: null }
            ]
        },
        {
            title: "Choose Action",
            items: [
                { 
                    name: "Create new course", 
                    icon: PlusCircleIcon, 
                    roles: ["Instructor"] 
                },
                { 
                    name: "Chat with course", 
                    icon: MessageCircleIcon, 
                    roles: null 
                },
                { 
                    name: "Assign course", 
                    icon: UsersIcon, 
                    roles: ["Instructor"] 
                }
            ]
        },
        {
            title: "Analysis",
            items: [
                { name: "Analysis", icon: BarChartIcon, roles: null }
            ]
        }
    ];

    const handleNavigation = (option) => {
        setSelectedOption(option);
        const route = routeMap[option];
        if (route && route !== pathname) {
            router.push(route);
        }
    };
      const { darkMode, toggleTheme } = useTheme();
    return (
        <aside className="m-5 mt-24 w-72">
            <nav className={` p-7 rounded-2xl  ${darkMode ? "bg-[#131313]": "bg-gray-300/50"}   flex flex-col`}>
                <div className="mt-16 flex flex-col gap-9">
                    {menuSections.map((section) => (
                        <section key={section.title} aria-labelledby={`${section.title}-heading`}>
                            <h3 
                                id={`${section.title}-heading`}
                                className={`text-sm font-semibold   ${darkMode?"text-white":"text-gray-900"}  mb-3`}
                            >
                                {section.title}
                            </h3>

                            <ul className="flex flex-col gap-1">
                                {section.items
                                    .filter(item => !item.roles || item.roles.includes(userRole))
                                    .map((item) => (
                                        <li key={item.name}>
                                            <button
                                                aria-current={selectedOption === item.name ? "page" : undefined}
                                                className={`group ${darkMode?"text-gray-300":"text-gray-700"} flex items-center gap-3 p-2.5 w-full rounded-[5px] transition-colors ${
                                                    darkMode
                                                      ? selectedOption === item.name
                                                        ? "bg-cyan-900/30 text-cyan-400"
                                                        : "hover:bg-gray-800 text-gray-300"
                                                      : selectedOption === item.name
                                                        ? "bg-gray-100 text-cyan-700"
                                                        : "hover:bg-gray-400/40 text-gray-700"
                                                  }`}
                                                onClick={() => handleNavigation(item.name)}
                                            >
                                                <item.icon 
                                                    size={20} 
                                                    className="min-w-[20px]" 
                                                    aria-hidden="true"
                                                />
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;