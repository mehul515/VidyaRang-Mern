import { icons } from "lucide-react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { MdUpload } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineAutorenew } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";

export const array=[
    
    {id:1 , des : 'Select "Create New Course" ', icon :<MdOutlineCreateNewFolder className="text-3xl text-cyan-300 " />},
    {id:2 , des : 'Enter course name', icon : <PiChatCenteredTextFill className="text-3xl text-cyan-300 " />
    },
    {id:3 , des : 'Upload your files',icon : <MdUpload  className="text-3xl text-cyan-300 "/>},
    {id:4 , des : 'After processing your files course will be on-boarded',icon :<MdOutlineAutorenew className="text-3xl text-cyan-300 " />},
    {id:5 , des : 'Select "Course chat" option to chat with your course material ',icon : <IoMdCheckboxOutline className="text-3xl text-cyan-300 " />}
];