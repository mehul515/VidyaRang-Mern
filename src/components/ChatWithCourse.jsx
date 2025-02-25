import { useState } from "react";

const ChatInterface = () => {
  const [selectedCourse, setSelectedCourse] = useState("Course 1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rating, setRating] = useState(3);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const courses = ["Course 1", "Course 2", "Course 3"];

  // Function to handle message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "You", course: selectedCourse };
      const demoResponse = { text: `This is an automated response for "${message}".`, sender: "Bot" };

      setMessages([...messages, newMessage, demoResponse]);
      setMessage("");
    }
  };

  // Function to handle feedback submission
  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
  };

  return (
    <div className="py-2 px-1 md:p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center">VidyaRANG : Learning Made Easy</h1>
        <p className="text-gray-300 mt-1 text-center">
          Upload, Learn, Interact, Assess, and Improve – Your Complete Learning Journey.
        </p>
      </div>

      {/* Course Selection */}
      <label className="block mt-4 text-gray-400 font-semibold">
        Select Course
      </label>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full p-2 border rounded-[5px] mt-1 text-gray-800 text-base font-semibold"
      >
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      {/* Message Input */}
      <label className="block mt-4 text-gray-400 font-semibold">
        Enter your message:
      </label>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded-[5px] mt-1 text-gray-800 text-base font-semibold"
      />
      <button
        onClick={handleSendMessage}
        className="mt-2 bg-[#a56d3d] px-4 py-1.5 rounded-[5px]"
      >
        Send
      </button>

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-400">Chat History:</h3>
          <div className="mt-2 space-y-2">
            {messages.map((msg, index) => (
              <p key={index} className={`${msg.sender === "You" ? "text-blue-400" : "text-green-400"}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Rating Section */}
      <label className="block mt-4 text-gray-400 font-semibold">
        Rate your experience:
      </label>
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full mt-2"
      />
      <p className="text-gray-400 font-semibold">Rating: {rating}</p>

      <button
        onClick={handleSubmitFeedback}
        className="mt-2 bg-[#a56d3d] text-white px-4 py-1.5 rounded-[5px] "
      >
        Submit Rating
      </button>

      {/* Thank-you message after feedback */}
      {feedbackSubmitted && (
        <p className="mt-3 text-green-400">
          Thank you for your feedback! We appreciate your time.
        </p>
      )}
    </div>
  );
};

export default ChatInterface;
