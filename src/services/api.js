const API_BASE_URL = 'http://localhost:5000/api';

class StudentAPI {
  // Check if network is available
  static async checkNetworkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${API_BASE_URL}/health`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Network connection failed:', error.message);
      return false;
    }
  }

  // Get all students
  static async getAllStudents() {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.name === 'AbortError') {
        throw new Error('Network timeout - please check your connection');
      }
      throw error;
    }
  }

  // Get single student by ID
  static async getStudentById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  }

  // Create new student
  static async createStudent(studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      if (!response.ok) {
        throw new Error('Failed to create student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      if (error.name === 'AbortError') {
        throw new Error('Network timeout - please check your connection');
      }
      throw error;
    }
  }

  // Update student
  static async updateStudent(id, studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      if (error.name === 'AbortError') {
        throw new Error('Network timeout - please check your connection');
      }
      throw error;
    }
  }

  // Delete student
  static async deleteStudent(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  // Search students
  static async searchStudents(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search students');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching students:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      if (!response.ok) {
        throw new Error('API health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      if (error.name === 'AbortError') {
        throw new Error('Network timeout - please check your connection');
      }
      throw error;
    }
  }
}

export default StudentAPI; 