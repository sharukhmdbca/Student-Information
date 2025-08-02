const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Student Information Management System...\n');

// Start the backend server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

// Wait a moment for server to start, then start frontend
setTimeout(() => {
  console.log('\n🌐 Starting frontend development server...\n');
  
  const frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    cwd: __dirname
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    server.kill('SIGINT');
    frontend.kill('SIGINT');
    process.exit();
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
    server.kill('SIGINT');
  });
}, 2000);

server.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

console.log('📊 Backend server starting on http://localhost:5000');
console.log('🌐 Frontend will start on http://localhost:3000');
console.log('📋 API Health check: http://localhost:5000/api/health\n'); 