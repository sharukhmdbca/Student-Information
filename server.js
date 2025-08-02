const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'students.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
  } catch (error) {
    console.log('Data directory already exists');
  }
}

// Load students data
async function loadStudents() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Save students data
async function saveStudents(students) {
  await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));
}

// Initialize data directory
ensureDataDirectory();

// API Routes

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await loadStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load students' });
  }
});

// GET single student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const students = await loadStudents();
    const student = students.find(s => s.id === req.params.id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load student' });
  }
});

// POST create new student
app.post('/api/students', async (req, res) => {
  try {
    const students = await loadStudents();
    const newStudent = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    students.push(newStudent);
    await saveStudents(students);
    
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// PUT update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const students = await loadStudents();
    const studentIndex = students.findIndex(s => s.id === req.params.id);
    
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    students[studentIndex] = {
      ...students[studentIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    await saveStudents(students);
    res.json(students[studentIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const students = await loadStudents();
    const filteredStudents = students.filter(s => s.id !== req.params.id);
    
    if (filteredStudents.length === students.length) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    await saveStudents(filteredStudents);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Search students
app.get('/api/students/search/:query', async (req, res) => {
  try {
    const students = await loadStudents();
    const query = req.params.query.toLowerCase();
    
    const filteredStudents = students.filter(student => 
      student.name?.toLowerCase().includes(query) ||
      student.rollNumber?.toLowerCase().includes(query) ||
      student.class?.toLowerCase().includes(query) ||
      student.section?.toLowerCase().includes(query) ||
      student.fatherName?.toLowerCase().includes(query) ||
      student.motherName?.toLowerCase().includes(query)
    );
    
    res.json(filteredStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search students' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Student Information Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 