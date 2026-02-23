import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Loader2, Upload, X, FileText } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { submitInternshipApplication, uploadResume } from '../services/supabase'
import FormInput from '../components/FormInput'

const InternshipApply = () => {
  const navigate = useNavigate()
  const { role: roleParam } = useParams()

  const role = useMemo(() => (roleParam ? decodeURIComponent(roleParam) : ''), [roleParam])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    education: '',
    experience: '',
    skills: ''
  })

  const [resumeFile, setResumeFile] = useState(null)
  const [resumeError, setResumeError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' })
  const [formError, setFormError] = useState('')
  const [errors, setErrors] = useState({})

  const showToast = (message, type = 'success') => {
    setToast({ open: true, message, type })
    window.setTimeout(() => {
      setToast((t) => ({ ...t, open: false }))
    }, 3500)
  }

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    setResumeError('')
    
    if (!file) {
      setResumeFile(null)
      return
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setResumeError('Please upload a PDF, DOC, or DOCX file')
      setResumeFile(null)
      return
    }

    // Check file size (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setResumeError('File must be under 5MB')
      setResumeFile(null)
      return
    }

    setResumeFile(file)
  }

  const removeResume = () => {
    setResumeFile(null)
    setResumeError('')
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'

    const emailValue = formData.email.trim()
    if (!emailValue) nextErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(emailValue)) nextErrors.email = 'Enter a valid email address.'

    const phoneValue = formData.phone.trim()
    const phoneDigits = phoneValue.replace(/\D/g, '')
    if (!phoneValue) nextErrors.phone = 'Phone is required.'
    else if (phoneDigits.length < 10 || phoneDigits.length > 15) nextErrors.phone = 'Phone must be 10–15 digits.'

    if (!role && !formData.role.trim()) nextErrors.role = 'Role is required.'

    if (!formData.education.trim()) nextErrors.education = 'Education is required.'
    if (!formData.skills.trim()) nextErrors.skills = 'Skills are required.'

    if (!resumeFile) {
      setResumeError('Resume is required')
      return false
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0 && !resumeError
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setFormError('')
    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Step 1: Upload resume
      let resumeData = null
      if (resumeFile) {
        resumeData = await uploadResume(resumeFile)
      }

      // Step 2: Submit application with resume data
      const payload = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: role || formData.role.trim(),
        education: formData.education.trim(),
        experience: formData.experience.trim() || '',
        skills: formData.skills.trim(),
        resume_url: resumeData?.publicUrl || '',
        resume_filename: resumeData?.fileName || '',
        status: 'pending'
      }

      await submitInternshipApplication(payload)

      setIsSubmitted(true)
      showToast('Application submitted successfully!', 'success')

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        education: '',
        experience: '',
        skills: ''
      })
      setResumeFile(null)
    } catch (err) {
      setFormError(err?.message || 'Failed to submit application. Please try again.')
      showToast('Submission failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-olive-100/20 pt-24 pb-16 overflow-x-hidden">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/90 backdrop-blur-xl border border-olive-200/50 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-olive-200/50">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm font-medium text-olive-700 hover:text-olive-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="mt-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-olive-900">
                Internship Application
              </h1>
              <p className="mt-2 text-olive-700">
                Join our team and kickstart your career
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="bg-olive-50/80 backdrop-blur-xl border border-olive-200/50 shadow-xl rounded-2xl p-8 text-center">
                <CheckCircle className="w-14 h-14 text-olive-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-olive-800">Submitted</h2>
                <p className="mt-2 text-olive-700">
                  We received your application. We’ll reach out soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-olive-900">Personal Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <FormInput
                        id="fullName"
                        label="Full Name"
                        required
                        value={formData.fullName}
                        onChange={(e) => setField('fullName', e.target.value)}
                        placeholder="John Doe"
                        type="text"
                        autoComplete="name"
                        error={errors.fullName}
                      />
                    </div>

                    <div>
                      <FormInput
                        id="email"
                        label="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setField('email', e.target.value)}
                        placeholder="john@example.com"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        error={errors.email}
                      />
                    </div>

                    <div>
                      <FormInput
                        id="phone"
                        label="Phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        error={errors.phone}
                      />
                    </div>

                    <FormInput
                      id="role"
                      label="Role"
                      required
                      value={role || formData.role}
                      readOnly={Boolean(role)}
                      onChange={role ? undefined : (e) => setField('role', e.target.value)}
                      type="text"
                      className="sm:col-span-2"
                      inputClassName={role ? 'bg-white/30' : undefined}
                      error={errors.role}
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-olive-900">Background</h2>

                  <div className="grid grid-cols-1 gap-4">
                    <FormInput
                      id="education"
                      label="Education"
                      required
                      value={formData.education}
                      onChange={(e) => setField('education', e.target.value)}
                      placeholder="B.Tech CSE, 2025"
                      type="text"
                      autoComplete="organization-title"
                      error={errors.education}
                    />

                    <FormInput
                      id="experience"
                      label="Experience (optional)"
                      as="textarea"
                      value={formData.experience}
                      onChange={(e) => setField('experience', e.target.value)}
                      rows={3}
                      placeholder="Internships, projects, part-time work..."
                    />

                    <FormInput
                      id="skills"
                      label="Skills"
                      required
                      value={formData.skills}
                      onChange={(e) => setField('skills', e.target.value)}
                      placeholder="React, Node.js, Figma..."
                      type="text"
                      error={errors.skills}
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-olive-900">Resume Upload</h2>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-olive-900">
                      Upload Resume (PDF/DOC/DOCX - Max 5MB) <span className="text-olive-700">*</span>
                    </label>
                    
                    {!resumeFile ? (
                      <div className="relative">
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="resume"
                          className="flex items-center justify-center w-full p-6 border-2 border-dashed border-olive-300 rounded-lg cursor-pointer hover:border-olive-500 transition-colors bg-olive-50/50"
                        >
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-olive-400" />
                            <p className="text-sm text-olive-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-olive-500 mt-1">
                              PDF, DOC, DOCX (MAX. 5MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-olive-100/50 border border-olive-300 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-olive-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-olive-900">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-olive-600">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeResume}
                          className="text-olive-700 hover:text-olive-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {resumeError && (
                      <p className="text-sm text-olive-700">{resumeError}</p>
                    )}
                  </div>
                </section>

                {formError ? (
                  <div className="bg-olive-100/50 border border-olive-300/50 rounded-lg p-4">
                    <p className="text-olive-700 text-sm">{formError}</p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-olive-600 to-olive-500 text-white px-8 py-4 rounded-xl font-semibold shadow-[0_16px_40px_rgba(141,154,58,0.25)] hover:shadow-[0_18px_50px_rgba(141,154,58,0.35)] transform hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {toast.open && (
          <div className="fixed top-6 right-6 z-50">
            <div
              className={`px-4 py-3 rounded-xl shadow-xl border backdrop-blur text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-olive-100/90 border-olive-300/50 text-olive-800'
                  : 'bg-olive-100/90 border-olive-300/50 text-olive-700'
              }`}
            >
              {toast.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InternshipApply
