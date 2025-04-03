"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Star, X, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getCourses, sendChatMessage } from "./api"

export default function ChatWithCourse() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [conversationEnded, setConversationEnded] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [username, setUsername] = useState("")
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const [playingMessageId, setPlayingMessageId] = useState(null)
  const audioRef = useRef(new Audio())

  // Fetch courses from API and set username
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        setUsername("user_" + Math.random().toString(36).substring(2, 8));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };
  
    fetchCourses();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // Clean up audio when component unmounts
  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Handle audio end event
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => {
      setPlayingMessageId(null)
    }
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedCourse) return;
  
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      course: selectedCourse,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
  
    // Simulate AI typing
    setIsTyping(true);
  
    try {
      // Call our chat API service
      const data = await sendChatMessage(selectedCourse, username, input);
      
      // Add AI response to messages
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response || "I couldn't generate a response. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
  
      // After a few messages, show the rating option
      if (messages.length >= 3 && !conversationEnded) {
        setShowRating(true);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add error message if API fails
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndConversation = () => {
    setConversationEnded(true)
    setShowRating(true)
  }

  const handleRating = (value) => {
    setRating(value)
    setShowFeedbackForm(true)
  }

  const submitFeedback = () => {
    console.log("Rating:", rating, "Feedback:", feedback)
    setShowFeedbackForm(false)

    // Add a system message acknowledging the feedback
    const systemMessage = {
      id: Date.now(),
      role: "system",
      content: `Thank you for your feedback! You rated this conversation ${rating} stars.`,
    }
    setMessages((prevMessages) => [...prevMessages, systemMessage])
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleTextToSpeech = async (messageId, text) => {
    const audio = audioRef.current

    if (playingMessageId === messageId) {
      // Stop playing
      audio.pause()
      setPlayingMessageId(null)
    } else {
      // If another message is playing, stop it first
      if (playingMessageId !== null) {
        audio.pause()
      }

      try {
        // Show loading state
        setPlayingMessageId("loading")

        // Call our API route
        const response = await fetch("/api/text-to-speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate audio")
        }

        // Get the audio blob
        const audioBlob = await response.blob()

        // Create a URL for the blob
        const audioUrl = URL.createObjectURL(audioBlob)

        // Set the audio source and play
        audio.src = audioUrl

        // Set playing message ID when audio is ready
        audio.oncanplay = () => {
          setPlayingMessageId(messageId)
          audio.play().catch((err) => {
            console.error("Error playing audio:", err)
            setPlayingMessageId(null)
          })
        }

        // Clean up the URL when done
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl)
          setPlayingMessageId(null)
        }
      } catch (error) {
        console.error("Error with text-to-speech:", error)
        setPlayingMessageId(null)
      }
    }
  }

  return (
    <div className="mt-16 flex items-center justify-center">
      <Card className="w-full shadow-lg bg-[#010912] border-cyan-900/30">
        <CardHeader className="border-cyan-900/30 p-3 md:p-4">
          <CardTitle className="flex items-center justify-between">
            {messages.length > 0 && !conversationEnded && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEndConversation}
                className="text-xs border-cyan-900 text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-300"
              >
                End Conversation
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[50vh] md:h-[60vh] overflow-y-auto scrollbar-hide no-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="text-xl md:text-2xl font-bold text-cyan-400">Welcome to Vidya RANG</div>
              <div className="text-gray-400 max-w-md">
                Select a course and ask a question to get started. I'll provide answers based on the course curriculum.
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex mb-4",
                    message.role === "user" ? "justify-end" : "justify-start",
                    message.role === "system" ? "justify-center" : "",
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <div className="bg-cyan-900 rounded-full h-full w-full flex items-center justify-center text-cyan-400 font-semibold">
                        V
                      </div>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-[10px] p-3",
                      message.role === "user"
                        ? "bg-cyan-800/30 text-gray-200 border border-cyan-800/50"
                        : message.role === "system"
                          ? "bg-[#0a1628] text-gray-400 text-sm py-2 border border-cyan-900/30"
                          : "bg-[#0a1628] text-gray-300 border border-cyan-900/30",
                    )}
                  >
                    {message.role === "user" && message.course && (
                      <div className="text-xs opacity-80 mb-1 text-cyan-400">
                        Course: {courses.find((c) => c.id === message.course)?.name}
                      </div>
                    )}
                    <div className="whitespace-pre-line">{message.content}</div>
                    {message.role === "assistant" && message.content.length <= 350 && (
                      <div className="mt-2 flex items-center justify-end">
                        <div
                          onClick={() => handleTextToSpeech(message.id, message.content)}
                          className="h-7 w-7 flex items-center justify-center rounded-full bg-cyan-900/30 border border-cyan-800/50 cursor-pointer hover:bg-cyan-900/50 transition-colors"
                        >
                          {playingMessageId === "loading" ? (
                            <div className="h-3 w-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                          ) : playingMessageId === message.id ? (
                            <Pause className="h-3.5 w-3.5 text-cyan-400" />
                          ) : (
                            <Play className="h-3.5 w-3.5 text-cyan-400" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                      <div className="bg-cyan-900/50 rounded-full h-full w-full flex items-center justify-center text-cyan-300 font-semibold">
                        U
                      </div>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <div className="bg-cyan-900 rounded-full h-full w-full flex items-center justify-center text-cyan-400 font-semibold">
                      V
                    </div>
                  </Avatar>
                  <div className="bg-[#0a1628] rounded-[10px] p-3 border border-cyan-900/30">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {showRating && conversationEnded && !showFeedbackForm && (
            <div className="bg-[#0a1628] rounded-[10px] p-4 mx-auto max-w-md border border-cyan-900/30">
              <div className="text-center mb-3 text-cyan-400">How would you rate this conversation?</div>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={cn(
                      "p-1 rounded-full transition-all",
                      rating >= star ? "text-cyan-400" : "text-gray-700 hover:text-cyan-600",
                    )}
                  >
                    <Star className="h-8 w-8" fill={rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {showFeedbackForm && (
            <div className="bg-[#0a1628] rounded-[10px] p-4 md:mx-20 border border-cyan-900/30">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-cyan-400">Additional Feedback</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="What did you like or dislike about this conversation?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mb-3 bg-[#0a1628] border-cyan-900/50 text-gray-300 font-medium focus-visible:ring-cyan-600"
                rows={3}
              />
              <Button onClick={submitFeedback} className="bg-cyan-400 hover:bg-cyan-600 text-gray-900">
                Submit Feedback
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="border-t border-cyan-900/30 p-3 md:px-32 flex flex-col gap-2">
          {!conversationEnded ? (
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div className="flex gap-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={isTyping || loadingCourses}>
                  <SelectTrigger className="w-full md:w-[200px] bg-[#0a1628] border-cyan-900/50 text-gray-300 focus:ring-cyan-600 font-medium">
                    <SelectValue placeholder={loadingCourses ? "Loading courses..." : "Select Course"} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a1628] border-cyan-900/50 text-gray-300 font-medium">
                    {courses.map((course) => (
                      <SelectItem key={course.name} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-full space-x-2 items-end">
                <div className="relative flex-grow">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about the selected course..."
                    className="min-h-16 resize-none bg-[#0a1628] border-cyan-900/50 text-gray-300 font-medium placeholder:text-gray-500 focus-visible:ring-cyan-600"
                    disabled={isTyping || !selectedCourse || loadingCourses}
                  />
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 bg-cyan-400 hover:bg-cyan-600 text-gray-900 rounded-[10px]"
                  disabled={isTyping || !input.trim() || !selectedCourse || loadingCourses}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">Press Enter to send, Shift+Enter for new line</div>
            </form>
          ) : (
            <div className="w-full text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setConversationEnded(false)
                  setShowRating(false)
                  setShowFeedbackForm(false)
                  setRating(0)
                  setFeedback("")
                  setMessages([])
                }}
                className="border-cyan-900 text-cyan-400 hover:bg-cyan-900/20"
              >
                Start New Conversation
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}