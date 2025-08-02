import React, { useState, useEffect } from 'react'
import StudentInfoForm from './components/StudentInfoForm'
import StudentInfoDisplay from './components/StudentInfoDisplay'
import { Users, GraduationCap, UserCheck, Database, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import StudentAPI from './services/api'

function App() {
  const [studentData, setStudentData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiStatus, setApiStatus] = useState('checking')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Check API health on component mount
  useEffect(() => {
    checkAPIHealth()
  }, [])

  // Auto-refresh connection every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (apiStatus === 'disconnected') {
        checkAPIHealth()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [apiStatus])

  const checkAPIHealth = async () => {
    try {
      await StudentAPI.healthCheck()
      setApiStatus('connected')
      setError(null) // Clear any previous network errors
    } catch (error) {
      setApiStatus('disconnected')
      console.log('API not available, running in local mode')
    }
  }

  const handleRefreshConnection = async () => {
    setIsRefreshing(true)
    setError(null)
    
    try {
      await checkAPIHealth()
    } catch (error) {
      setError('Failed to connect to server. Please check your network connection.')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleFormSubmit = async (data) => {
    setLoading(true)
    setError(null)
    
    try {
      if (apiStatus === 'connected') {
        if (studentData?.id) {
          // Update existing student
          const updatedStudent = await StudentAPI.updateStudent(studentData.id, data)
          setStudentData(updatedStudent)
        } else {
          // Create new student
          const newStudent = await StudentAPI.createStudent(data)
          setStudentData(newStudent)
        }
      } else {
        // Local mode - just update state
        setStudentData(data)
      }
      setIsEditing(false)
    } catch (error) {
      setError('Failed to save student information. Please try again.')
      console.error('Error saving student:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleClear = () => {
    setStudentData(null)
    setIsEditing(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Student Information Management
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage comprehensive student information including personal details, 
            academic records, parent information, and contact details.
          </p>
          
                     {/* API Status Indicator */}
           <div className="mt-4 flex items-center justify-center gap-2">
             {apiStatus === 'checking' && (
               <div className="flex items-center gap-2 text-blue-600">
                 <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-sm">Checking API connection...</span>
               </div>
             )}
             {apiStatus === 'connected' && (
               <div className="flex items-center gap-2 text-green-600">
                 <Wifi className="w-4 h-4" />
                 <span className="text-sm">Connected to Database</span>
               </div>
             )}
             {apiStatus === 'disconnected' && (
               <div className="flex items-center gap-2 text-orange-600">
                 <WifiOff className="w-4 h-4" />
                 <span className="text-sm">Running in Local Mode</span>
                 <button
                   onClick={handleRefreshConnection}
                   disabled={isRefreshing}
                   className="flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                 >
                   {isRefreshing ? (
                     <>
                       <RefreshCw className="w-3 h-3 animate-spin" />
                       Refreshing...
                     </>
                   ) : (
                     <>
                       <RefreshCw className="w-3 h-3" />
                       Refresh
                     </>
                   )}
                 </button>
               </div>
             )}
           </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
              {error.includes('Network') || error.includes('connection') ? (
                <button
                  onClick={handleRefreshConnection}
                  disabled={isRefreshing}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Retry
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!studentData || isEditing ? (
            <div className="card animate-fade-in">
              <div className="section-title">
                <Users className="w-6 h-6 text-primary-600" />
                Student Information Form
              </div>
              <StudentInfoForm 
                onSubmit={handleFormSubmit}
                initialData={studentData}
                onCancel={isEditing ? () => setIsEditing(false) : handleClear}
                loading={loading}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="section-title">
                  <UserCheck className="w-6 h-6 text-primary-600" />
                  Student Information Display
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleEdit}
                    className="btn-secondary"
                  >
                    Edit Information
                  </button>
                  <button 
                    onClick={handleClear}
                    className="btn-secondary"
                  >
                    Add New Student
                  </button>
                </div>
              </div>
              <StudentInfoDisplay studentData={studentData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 