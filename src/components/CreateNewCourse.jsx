"use client";

import React, { useState, useEffect } from "react";
import { Upload, Eye, EyeOff, FileText, Trash2 } from "lucide-react";
import { createCourse } from "./api"; // Import the API service
import { toast, ToastContainer } from "react-toastify"; // Importing toast for notifications
import supabase from "../app/supabaseClient"; // Importing Supabase client
import { useRouter } from "next/navigation";
import { useTheme } from "./Themecontextprovider";

export default function CreateNewCourse() {
  const [isPublic, setIsPublic] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);
  const router = useRouter(); // Router instance for navigation
  const [userEmail, setUserEmail] = useState(null); // State to store user data
  const { darkMode, toggleTheme } = useTheme();
  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the current session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // Redirect to login page if not authenticated
        return;
      }

      // Set user data from session metadata
      setUserEmail({
        email: session.user.email,
      });
    };
    fetchUser();
  }, [router]);

  // Function to handle file selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const selectedFiles = Array.from(e.target.files);

      const validFiles = selectedFiles.filter((file) => {
        if (file.size > maxSize) {
          toast.error(`${file.name} exceeds 5MB limit`);
          return false;
        }
        return true;
      });
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  // Function to remove a specific file from the list
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle file drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop event (appends dropped files)
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.dataTransfer.files),
      ]);
    }
  };

  // Validate course name input
  const validateCourseName = (name) => {
    if (name.trim() === "") {
      setCourseNameError(true);
      return false;
    }
    setCourseNameError(false);
    return true;
  };

  // Handle course name input change
  const handleCourseNameChange = (e) => {
    const value = e.target.value;
    setCourseName(value);
    if (courseNameError) {
      validateCourseName(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCourseName(courseName)) {
      toast.error("Please Try diffrent course name");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload atleast one file");
      return;
    }
    setIsSubmitting(true);
    setProgress(0);

    // Start dummy progress (0% to 99%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + 6;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500); // speed of fake progress
    setProgressInterval(interval);

    try {
      const response = await createCourse(courseName, files, userEmail);
      // Reset form if needed
      setCourseName("");
      setFiles([]);
      setProgress(100);
      const { data, error } = await supabase.from("course").insert([
        {
          course_name: courseName,
          course_creator: userEmail, // if using string (preferred)
          course_type: isPublic?"public":"private",
          total_enrollment_users: 0,
          total_users_assigned: 0,
          created_date: new Date().toISOString(),
        },
      ]).select();
      console.log("Course data:", data, "Error:", error);
      toast.success("Course will be shortly created and notified on your mail");
      console.log("Course created successfully:", response);
    } catch (error) {
      toast.error("Failed to Create course");
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setProgress(0);
      }, 1500);
    }
  };

  // Accepted file types for upload
  const acceptedFileTypes =
    ".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.json,.csv,.txt";

  return (
    <div className={`min-h-screen overflow-auto ${darkMode? "bg-gray-950":"bg-black"}  text-gray-100 flex items-center justify-center p-4`}>
      <div className={`w-full mt-14 max-w-md space-y-8 ${darkMode? "bg-gray-900":"bg-zinc-200"}  p-8 rounded-xl overflow-y-auto max-h-screen shadow-lg lg:pb-28 pb-72`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${darkMode? "text-cyan-400":"text-black"} `}>
            Create New Course
          </h1>
          <p className={`  ${darkMode?"text-gray-400":"text-gray-700"}  mt-2 text-sm`}>
            Fill in the details to create your course
          </p>
        </div>
        <ToastContainer />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Name Input */}
          <div className="space-y-2">
            <label htmlFor="courseName" className={`${darkMode? "text-white":"text-black"} `}>
              Course Name
            </label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={handleCourseNameChange}
              onBlur={() => validateCourseName(courseName)}
              placeholder="Enter course name"
              className={`w-full ${darkMode? "bg-gray-800":"bg-gray-300"}  border px-3 py-2 rounded text-white placeholder-gray-500 ${
                courseNameError
                  ? "border-red-500"
                  : "border-gray-700 focus:border-cyan-500"
              }`}
              required
            />
            {courseNameError && (
              <p className="text-red-500 text-xs mt-1">
                Course name is required
              </p>
            )}
          </div>

          {/* Course Visibility Switch */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="visibility" className={` ${darkMode? "text-white":"text-black"} `}>
                Course Visibility
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="visibility"
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  className="hidden"
                />
                <div
                  className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer ${
                    isPublic ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => setIsPublic(!isPublic)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isPublic ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
                <span
                  className={`flex items-center text-sm ${
                    isPublic ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPublic ? (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Public
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Private
                    </>
                  )}
                </span>
              </div>
            </div>
            <p className={`text-xs ${darkMode? "text-gray-400": "text-gray-700"}  mt-1 pl-1`}>
              {isPublic
                ? "Anyone can discover and enroll in this course"
                : "Only people with the link can access this course"}
            </p>
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <label htmlFor="fileUpload" className={` ${darkMode? "text-white":"text-black"} `}>
              Upload Course Materials
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${darkMode? "bg-gray-800 hover:bg-gray-700":"bg-gray-300 hover:bg-zinc-300"} ${
                isDragging
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-gray-700   hover:border-gray-500"
              }               `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <Upload
                className={`h-10 w-10 mx-auto mb-3 ${
                  isDragging ? "text-cyan-400" : "text-gray-400"
                }`}
              />
              <p className="text-sm font-medium text-white">
                Drag and drop files here or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports PDF, PPT, DOC, Sheets, JSON, CSV, and TXT
              </p>
              <p className="text-xs text-gray-400 mt-1">
                File size should be between 0 to 5 MB
              </p>
              <input
                id="fileUpload"
                type="file"
                multiple
                accept={acceptedFileTypes}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Display Selected Files with Remove Option */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className={`text-sm font-medium ${darkMode? "text-white":"text-black"} `}>
                  Selected Files:
                </p>
                <ul className="text-xs text-gray-300 space-y-1 max-h-32 overflow-y-auto bg-gray-800 rounded-md p-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center py-1 px-2 hover:bg-gray-700 rounded"
                    >
                      <FileText className="h-3 w-3 mr-2 text-cyan-400" />
                      <span className="truncate">{file.name}</span>
                      <span className="ml-auto text-gray-500 pl-2">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button" // Important to prevent form submission
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="ml-2 text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {isSubmitting && (
            <div className="w-full max-w-md mx-auto mt-6">
              <div className="relative w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden shadow-md">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-base font-medium text-white mt-2">
                {progress}%
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${darkMode ? "bg-cyan-500 text-white hover:bg-cyan-600":"bg-black text-white hover:bg-gray-500"}  py-2 rounded-lg  transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
