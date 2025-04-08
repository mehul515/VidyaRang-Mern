// app/assign-course/page.js
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { Search, Mail as MailIcon } from "lucide-react";
import supabase from "../app/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AssignCoursePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter(); // Router instance for navigation
  useEffect(() => {
    const fetchUserAndCourses = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (!session) {
          router.push("/login");
          return;
        }

        const userEmail = session.user.email;
        setEmail(userEmail);
        console.log("User email:", userEmail);

        const { data, error } = await supabase.from("course").select("*");

        if (error) throw error;

        // 🔍 Filter after parsing course_creator as JSON
        const filteredCourses = data.filter((course) => {
          try {
            const creator = JSON.parse(course.course_creator);
            return creator.email === userEmail;
          } catch (e) {
            console.error(
              "Invalid JSON in course_creator:",
              course.course_creator
            );
            return false;
          }
        });

        setCourses(filteredCourses || []);
        console.log("Filtered courses:", filteredCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCourses();
  }, [router]);

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleTogglePrivacy = async (id) => {
    try {
      // Find the course using course_id (not id)
      const course = courses.find((c) => c.course_id === id);
      if (!course) throw new Error("Course not found");
      
      // Toggle between 'public' and 'private'
      const newPrivacyStatus =
      course.course_type === "public" ? "private" : "public";
      const confirmed = window.confirm(
        `Are you sure you want to make this course ${newPrivacyStatus}?`
      );
      if (!confirmed) return;
      

      // Update in Supabase
      const { error } = await supabase
        .from("course")
        .update({ course_type: newPrivacyStatus })
        .eq("course_id", id);

      if (error) throw error;

      // Update local state
      setCourses((prev) =>
        prev.map((course) =>
          course.course_id === id
            ? { ...course, course_type: newPrivacyStatus }
            : course
        )
      );

      toast.success(`Course made ${newPrivacyStatus}`);
    } catch (error) {
      console.error("Toggle privacy error:", error);
      toast.error("Failed to update course privacy: " + error.message);
    }
  };

  const handleAssign = async () => {
    console.log("chekcing");
    if (!email) return toast.error("Please enter a user email");

    const course = courses.find((c) => c.course_id === selectedCourseId);
    if (!course) return toast.error("Course not found");

    if (course.course_type === "public") {
      return toast.error("Public courses cannot be assigned");
    }

    try {
      const { data: courseData, error: fetchError } = await supabase
        .from("course")
        .select("allow_emails")
        .eq("course_id", selectedCourseId)
        .single();

      if (fetchError) throw fetchError;

      const currentEmails = courseData.allow_emails || [];

      if (!currentEmails.includes(email)) {
        const updatedEmails = [...currentEmails, email];

        const { error: updateError } = await supabase
          .from("course")
          .update({ allow_emails: updatedEmails })
          .eq("course_id", selectedCourseId);

        if (updateError) throw updateError;
        toast.success(
          `Email "${email}" successfully added to course "${course.course_name}"`
        );
      } else {
        toast.info(`Email "${email}" is already assigned to this course.`);
      }

      setEmail("");
    } catch (error) {
      toast.error("Assignment failed: " + error.message);
    }
  };

  const selectedCourse = courses.find((c) => c.course_id === selectedCourseId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white px-6 py-20 font-sans flex items-center justify-center">
        <div className="animate-pulse text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-20 font-sans">
      <ToastContainer />
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full mx-auto">
        {/* Courses List */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          <div className="relative mb-5">
            <input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121212] border border-cyan-700 text-cyan-400 placeholder:text-cyan-600 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-cyan-600" />
          </div>
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.course_id}
                  onClick={() => setSelectedCourseId(course.course_id)}
                  className={`rounded-xl px-5 py-4 cursor-pointer border transition-all duration-300 ${
                    selectedCourseId === course.course_id
                      ? "border-purple-500 shadow-md shadow-purple-500/30"
                      : "border-[#2c2c2c]"
                  } bg-[#0f0f0f] hover:border-cyan-400`}
                >
                  <div className="flex justify-between items-center">
                    {/* Left side: Course name */}
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">
                        {course.course_name}
                      </h3>
                    </div>

                    {/* Right side: Public/Private badge */}
                    <div>
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                          course.course_type == "public"
                            ? "bg-green-900 text-green-400"
                            : "bg-red-900 text-red-400"
                        }`}
                      >
                        {course.course_type == "public" ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-cyan-600 text-center py-4">
                {searchTerm
                  ? "No matching courses found"
                  : "You haven't created any courses yet"}
              </p>
            )}
          </div>
        </div>

        {/* Assign Section */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-xl h-fit sticky top-8">
          <h2 className="text-2xl font-semibold mb-4">Assign Course</h2>

          {selectedCourse ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {selectedCourse.course_name}
                  </h3>
                  <span
                    className={`text-sm px-2 py-0.5 rounded-full ${
                      selectedCourse.course_type == "public"
                        ? "bg-green-900 text-green-400"
                        : "bg-red-900 text-red-400"
                    }`}
                  >
                    {selectedCourse.course_type == "public"
                      ? "Public"
                      : "Private"}
                  </span>
                </div>
                <Button
                  onClick={() => handleTogglePrivacy(selectedCourse.course_id)}
                  variant="ghost"
                  className={`text-sm font-medium px-4 py-1 rounded-md ${
                    selectedCourse.course_type == "public"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {selectedCourse.course_type == "public"
                    ? "Make Private"
                    : "Make Public"}
                </Button>
              </div>

              {/* Public Course Info or Email Assign */}
              {selectedCourse.course_type == "private" ? (
                <>
                  {selectedCourse.allow_emails &&
                    selectedCourse.allow_emails.length > 0 && (
                      <div className="mb-4">
                        <p className="text-cyan-300 text-sm mb-2">
                          Assigned to:
                        </p>
                        <ul className="space-y-1 pl-4 list-disc text-cyan-500 text-sm">
                          {selectedCourse.allow_emails.map(
                            (assignedEmail, idx) => (
                              <li key={idx}>{assignedEmail}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="flex items-center gap-3 mb-4">
                    <MailIcon size={20} className="text-cyan-400" />
                    <input
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="flex-1 bg-transparent border border-cyan-700 text-cyan-400 placeholder:text-cyan-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    onClick={handleAssign}
                    className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-lg py-2"
                  >
                    Assign Course
                  </Button>
                </>
              ) : (
                <div className="mt-6 bg-[#2c2c2c] p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-300">
                  <p className="font-semibold mb-1">⚠️ Public Course</p>
                  <p className="text-sm">
                    Public courses cannot be assigned. Make it Private to
                    assign.
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-cyan-600 text-lg font-medium">
              {courses.length > 0 ? (
                "Select a course to assign"
              ) : (
                <Link
                  href="/your-create-course-path"
                  className="underline text-blue-600"
                >
                  Create a course first
                </Link>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
