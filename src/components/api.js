// api.js
const API_BASE_URL = 'http://localhost:8000'; // Change this to your FastAPI server URL

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