// api.js- for req to api serving on https
const API_BASE_URL = 'https://vidyarang.aigurukul.dev'; // Change this to your FastAPI server URL

export const createCourse = async (courseName, files) => {
  const formData = new FormData();
  formData.append('course_name', courseName);
  
  // Append each file to the FormData
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/create-course/`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - the browser will set it automatically with the boundary
    });

    if (!response.ok) {
      throw new Error('Failed to create course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};



export const sendChatMessage = async (courseId, username, prompt) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        option: courseId,
        username: username,
        prompt: prompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Server responded with status ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Get available courses from the API
 * @returns {Promise<Array>} List of available courses
 */
export const getCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    
    // Transform the array of course names into objects with id and name
    return data.courses.map(course => ({
      id: course.toLowerCase().replace(/\s+/g, '-'),
      name: course
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};