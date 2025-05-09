import React, { forwardRef } from "react";
import { array } from "./content.js"; // Importing content array
import "react-vertical-timeline-component/style.min.css";
import Link from "next/link.js";
import { useTheme } from "./Themecontextprovider";
// ForwardRef is used to pass a ref from the parent component
const Createcourse = forwardRef((props, ref) => {

    const { darkMode, toggleTheme } = useTheme();

    return (
        // Main container with margin and padding
        <div ref={ref} className='mt-28 lg:px-6 px-2'>

            {/* Background section with padding */}
            <div className={` ${darkMode ? "bg-[#0c0c0c]" : "bg-gray-200/30"} lg:p-10 p-4`}>

                {/* Steps Section */}
                <div className='w-full mt-16'>

                    {/* Heading Section */}
                    <div className='mb-8'>
                        <h1 className={` ${darkMode ? "text-gray-200" : "text-black"}    lg:text-5xl  text-4xl font-bold text-center`}>
                            Steps To On-Board Your Course
                        </h1>
                        <h2 className={`mt-8 text-center lg:text-xl text-lg  ${darkMode ? "text-gray-300" : "text-gray-600"} `}>
                            Our platform adapts to your learning style, making education more efficient and enjoyable
                        </h2>
                    </div>

                    {/* Steps Cards Container */}
                    <div className="flex flex-wrap justify-center gap-6">

                        {/* Mapping through the array to create step cards */}
                        {array.map((e, index) => (
                            <Link href={e.redirect} key={e.id}>
                                <div
                                    key={e.id} // Unique key for each element
                                    className={`
                                    lg:w-80 w-80 lg:h-52 h-52 flex gap-4 flex-col 
                                    lg:px-7 px-7 lg:py-7 py-6 rounded-xl 
                                    ${darkMode ? "bg-[#242525] text-white border border-[#4d4d4e] hover:border-cyan-500" : "bg-white text-black border border-[#cdcdcd] hover:border-gray-400"}

                                     transition-all duration-300 ease-in-out
                                    ${index < 3 ? "lg:w-1/4" : "lg:w-1/3"}
                                `}
                                >
                                    {/* Step Icon */}


                                    <div className={`${darkMode ? "text-cyan-300" : "text-blue-400"} text-3xl`}>
                                        {e.icon}
                                    </div>


                                    {/* Step Description */}
                                    <h1 className='text-xl mt-3 font-semibold'>{e.des}</h1>
                                </div></Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
});

// Exporting the component
export default Createcourse;
