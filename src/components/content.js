import { MdOutlineCreateNewFolder } from "react-icons/md";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { MdUpload } from "react-icons/md";
import { MdOutlineAutorenew } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";

export const array=[
    
    {id:1 , des : 'Select "Create New Course" ', icon :<MdOutlineCreateNewFolder className="text-3xl "/>,redirect:'/create-course'},
    {id:2 , des : 'Enter course name', icon : <PiChatCenteredTextFill className="text-3xl  " />
        ,redirect:'/create-course'},
    {id:3 , des : 'Upload your files',icon : <MdUpload  className="text-3xl  "/>,redirect:'/create-course'},
    {id:4 , des : 'Select "Course chat" option to chat with your course material ',icon : <IoMdCheckboxOutline className="text-3xl  " />,redirect:'/chat'}
];