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
    skills: '',
    motivation: ''
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
        motivation: formData.motivation.trim() || '',
        resume_url: resumeData?.path || '',
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
        skills: '',
        motivation: ''
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
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-blue-50 dark:from-text-main dark:via-text-main dark:to-text-main pt-24 pb-16 overflow-x-hidden">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-card-bg/60 dark:bg-card-bg/10 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-border-light/70 dark:border-white/10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm font-medium text-text-light hover:text-accent-main transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="mt-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-text-main dark:text-white">
                Internship Application
              </h1>
              <p className="mt-2 text-text-light dark:text-white/70">
                Join our team and kickstart your career
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Submitted</h2>
                <p className="mt-2 text-green-700 dark:text-green-400">
                  We received your application. We’ll reach out soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-text-main dark:text-white">Personal Information</h2>

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
                  <h2 className="text-lg font-semibold text-text-main dark:text-white">Background</h2>

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
                  <h2 className="text-lg font-semibold text-text-main dark:text-white">About</h2>

                  <FormInput
                    id="motivation"
                    label="About / Motivation (optional)"
                    as="textarea"
                    value={formData.motivation}
                    onChange={(e) => setField('motivation', e.target.value)}
                    rows={4}
                    placeholder="Why do you want to join this internship?"
                  />
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-text-main dark:text-white">Resume Upload</h2>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-text-main dark:text-white">
                      Upload Resume (PDF/DOC/DOCX - Max 5MB) <span className="text-red-500">*</span>
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
                          className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white/50 dark:bg-gray-800/50"
                        >
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              PDF, DOC, DOCX (MAX. 5MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeResume}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {resumeError && (
                      <p className="text-sm text-red-600 dark:text-red-400">{resumeError}</p>
                    )}
                  </div>
                </section>

                {formError ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-400 text-sm">{formError}</p>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-[0_16px_40px_rgba(26,110,199,0.25)] hover:shadow-[0_18px_50px_rgba(26,110,199,0.35)] transform hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
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
                  ? 'bg-green-50/90 border-green-200 text-green-900'
                  : 'bg-red-50/90 border-red-200 text-red-900'
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
