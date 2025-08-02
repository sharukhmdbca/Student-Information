import React from 'react'
import { 
  User, 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Users as UsersIcon,
  GraduationCap,
  UserCheck,
  Clock
} from 'lucide-react'

const StudentInfoDisplay = ({ studentData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateAge = (dateString) => {
    if (!dateString) return null
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const age = calculateAge(studentData.dateOfBirth)

  return (
    <div className="space-y-6">
      {/* Student Header Card */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {studentData.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Class {studentData.class} - Section {studentData.section}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Roll No: {studentData.rollNumber}
              </span>
              {age && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Age: {age} years
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <UserCheck className="w-4 h-4" />
            {studentData.gender}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="card">
          <h3 className="section-title">
            <User className="w-5 h-5 text-primary-600" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900 font-medium">{studentData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Roll Number</label>
                <p className="text-gray-900 font-medium">{studentData.rollNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Class</label>
                <p className="text-gray-900 font-medium">Class {studentData.class}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Section</label>
                <p className="text-gray-900 font-medium">Section {studentData.section}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Gender</label>
                <p className="text-gray-900 font-medium">{studentData.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-gray-900 font-medium">{formatDate(studentData.dateOfBirth)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div className="card">
          <h3 className="section-title">
            <UsersIcon className="w-5 h-5 text-primary-600" />
            Parent Information
          </h3>
          <div className="space-y-6">
            {/* Father's Information */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-3">Father's Details</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{studentData.fatherName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{studentData.fatherContact}</span>
                </div>
                {studentData.fatherEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{studentData.fatherEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mother's Information */}
            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-3">Mother's Details</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{studentData.motherName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{studentData.motherContact}</span>
                </div>
                {studentData.motherEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{studentData.motherEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Guardian's Information */}
            {studentData.guardianName && (
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-3">Guardian's Details</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{studentData.guardianName}</p>
                  </div>
                  {studentData.guardianContact && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{studentData.guardianContact}</span>
                    </div>
                  )}
                  {studentData.guardianEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{studentData.guardianEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="card">
        <h3 className="section-title">
          <MapPin className="w-5 h-5 text-primary-600" />
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Current Address
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {studentData.currentAddress ? (
                <p className="text-gray-900 whitespace-pre-line">{studentData.currentAddress}</p>
              ) : (
                <p className="text-gray-500 italic">Not provided</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              Permanent Address
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {studentData.permanentAddress ? (
                <p className="text-gray-900 whitespace-pre-line">{studentData.permanentAddress}</p>
              ) : (
                <p className="text-gray-500 italic">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Student Information Summary</h3>
            <p className="text-sm text-gray-600">All information has been successfully saved</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{studentData.name ? '✓' : '✗'}</div>
            <div className="text-gray-600">Personal Info</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{studentData.fatherName && studentData.motherName ? '✓' : '✗'}</div>
            <div className="text-gray-600">Parent Details</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{studentData.currentAddress || studentData.permanentAddress ? '✓' : '✗'}</div>
            <div className="text-gray-600">Address</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{studentData.dateOfBirth ? '✓' : '✗'}</div>
            <div className="text-gray-600">Birth Date</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoDisplay 