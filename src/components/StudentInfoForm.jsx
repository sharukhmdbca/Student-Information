import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { 
  User, 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Users as UsersIcon,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const StudentInfoForm = ({ onSubmit, initialData, onCancel, loading }) => {
  const [startDate, setStartDate] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialData || {}
  })

  // Watch form values for real-time validation
  const watchedValues = watch()

  useEffect(() => {
    if (initialData?.dateOfBirth) {
      setStartDate(new Date(initialData.dateOfBirth))
    }
  }, [initialData])

  const validateForm = (data) => {
    const errors = {}
    
    // Required field validations
    if (!data.name?.trim()) errors.name = 'Name is required'
    if (!data.rollNumber?.trim()) errors.rollNumber = 'Roll Number is required'
    if (!data.class) errors.class = 'Class is required'
    if (!data.section) errors.section = 'Section is required'
    if (!data.gender) errors.gender = 'Gender is required'
    if (!startDate) errors.dateOfBirth = 'Date of Birth is required'
    
    // Parent details validation
    if (!data.fatherName?.trim()) errors.fatherName = 'Father\'s name is required'
    if (!data.motherName?.trim()) errors.motherName = 'Mother\'s name is required'
    if (!data.fatherContact?.trim()) errors.fatherContact = 'Father\'s contact is required'
    if (!data.motherContact?.trim()) errors.motherContact = 'Mother\'s contact is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data.fatherEmail && !emailRegex.test(data.fatherEmail)) {
      errors.fatherEmail = 'Invalid email format'
    }
    if (data.motherEmail && !emailRegex.test(data.motherEmail)) {
      errors.motherEmail = 'Invalid email format'
    }
    if (data.guardianEmail && !emailRegex.test(data.guardianEmail)) {
      errors.guardianEmail = 'Invalid email format'
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (data.fatherContact && !phoneRegex.test(data.fatherContact.replace(/\s/g, ''))) {
      errors.fatherContact = 'Invalid phone number'
    }
    if (data.motherContact && !phoneRegex.test(data.motherContact.replace(/\s/g, ''))) {
      errors.motherContact = 'Invalid phone number'
    }
    if (data.guardianContact && !phoneRegex.test(data.guardianContact.replace(/\s/g, ''))) {
      errors.guardianContact = 'Invalid phone number'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onSubmitForm = (data) => {
    if (!validateForm(data)) return
    
    const formData = {
      ...data,
      dateOfBirth: startDate?.toISOString().split('T')[0]
    }
    
    onSubmit(formData)
  }

  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  const sections = ['A', 'B', 'C', 'D', 'E', 'F']
  const genders = ['Male', 'Female', 'Other']

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name')}
              className={`form-input ${formErrors.name ? 'border-red-500' : ''}`}
              placeholder="Enter full name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roll Number *
            </label>
            <input
              type="text"
              {...register('rollNumber')}
              className={`form-input ${formErrors.rollNumber ? 'border-red-500' : ''}`}
              placeholder="Enter roll number"
            />
            {formErrors.rollNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.rollNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class *
            </label>
            <select
              {...register('class')}
              className={`form-select ${formErrors.class ? 'border-red-500' : ''}`}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
            {formErrors.class && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.class}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section *
            </label>
            <select
              {...register('section')}
              className={`form-select ${formErrors.section ? 'border-red-500' : ''}`}
            >
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
            {formErrors.section && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.section}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              {...register('gender')}
              className={`form-select ${formErrors.gender ? 'border-red-500' : ''}`}
            >
              <option value="">Select Gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
            {formErrors.gender && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.gender}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className={`form-input ${formErrors.dateOfBirth ? 'border-red-500' : ''}`}
              placeholderText="Select date of birth"
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              dateFormat="dd/MM/yyyy"
            />
            {formErrors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.dateOfBirth}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UsersIcon className="w-5 h-5 text-primary-600" />
          Parent Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name *
            </label>
            <input
              type="text"
              {...register('fatherName')}
              className={`form-input ${formErrors.fatherName ? 'border-red-500' : ''}`}
              placeholder="Enter father's name"
            />
            {formErrors.fatherName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.fatherName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Contact *
            </label>
            <input
              type="tel"
              {...register('fatherContact')}
              className={`form-input ${formErrors.fatherContact ? 'border-red-500' : ''}`}
              placeholder="Enter father's contact number"
            />
            {formErrors.fatherContact && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.fatherContact}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Email
            </label>
            <input
              type="email"
              {...register('fatherEmail')}
              className={`form-input ${formErrors.fatherEmail ? 'border-red-500' : ''}`}
              placeholder="Enter father's email"
            />
            {formErrors.fatherEmail && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.fatherEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Name *
            </label>
            <input
              type="text"
              {...register('motherName')}
              className={`form-input ${formErrors.motherName ? 'border-red-500' : ''}`}
              placeholder="Enter mother's name"
            />
            {formErrors.motherName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.motherName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Contact *
            </label>
            <input
              type="tel"
              {...register('motherContact')}
              className={`form-input ${formErrors.motherContact ? 'border-red-500' : ''}`}
              placeholder="Enter mother's contact number"
            />
            {formErrors.motherContact && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.motherContact}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Email
            </label>
            <input
              type="email"
              {...register('motherEmail')}
              className={`form-input ${formErrors.motherEmail ? 'border-red-500' : ''}`}
              placeholder="Enter mother's email"
            />
            {formErrors.motherEmail && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.motherEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian's Name
            </label>
            <input
              type="text"
              {...register('guardianName')}
              className="form-input"
              placeholder="Enter guardian's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian's Contact
            </label>
            <input
              type="tel"
              {...register('guardianContact')}
              className={`form-input ${formErrors.guardianContact ? 'border-red-500' : ''}`}
              placeholder="Enter guardian's contact number"
            />
            {formErrors.guardianContact && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.guardianContact}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guardian's Email
            </label>
            <input
              type="email"
              {...register('guardianEmail')}
              className={`form-input ${formErrors.guardianEmail ? 'border-red-500' : ''}`}
              placeholder="Enter guardian's email"
            />
            {formErrors.guardianEmail && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {formErrors.guardianEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          Address Information
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Address
            </label>
            <textarea
              {...register('currentAddress')}
              rows="3"
              className="form-input"
              placeholder="Enter current address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permanent Address
            </label>
            <textarea
              {...register('permanentAddress')}
              rows="3"
              className="form-input"
              placeholder="Enter permanent address"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {isSubmitting || loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {loading ? 'Saving to Database...' : 'Saving...'}
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              {initialData ? 'Update Information' : 'Save Information'}
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default StudentInfoForm 