import emailjs from '@emailjs/browser'

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

export const sendInternshipAcceptanceEmail = async (application) => {
  try {
    console.log('🚀 Sending internship acceptance email:', {
      email: application.email,
      name: application.full_name,
      role: application.role
    })

    const templateParams = {
      fullName: application.full_name,
      email: application.email,
      role: application.role,
      subject: 'Congratulations! Your Internship Application Has Been Approved',
      reply_to: application.email
    }

    console.log('🧪 Testing internship email parameters:', templateParams)

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID,
      templateParams
    )

    console.log('✅ Internship acceptance email sent successfully:', response)
    return { success: true, response }

  } catch (error) {
    console.error('❌ Error sending internship acceptance email:', error)
    throw new Error(`Failed to send internship acceptance email: ${error.message}`)
  }
}

export const sendProjectAcceptanceEmail = async (projectRequest) => {
  try {
    console.log('🚀 Sending project acceptance email:', {
      email: projectRequest.email,
      projectTitle: projectRequest.project_title
    })

const templateParams = {
  clientName: projectRequest.name,
  projectTitle: projectRequest.project_title,
  email: projectRequest.email,
  project_description: projectRequest.project_description,
  phone: projectRequest.phone || 'Not provided',
  budget_range: projectRequest.budget_range || 'Not specified',
  timeline: projectRequest.timeline || 'Not specified',
  subject: 'Great News! Your Project Request Has Been Approved',
  reply_to: projectRequest.email
}

    console.log('🧪 Testing project email parameters:', templateParams)

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_PROJECT_TEMPLATE_ID,
      templateParams
    )

    console.log('✅ Project acceptance email sent successfully:', response)
    return { success: true, response }

  } catch (error) {
    console.error('❌ Error sending project acceptance email:', error)
    throw new Error(`Failed to send project acceptance email: ${error.message}`)
  }
}

export const validateEmailConfig = () => {
  const required = [
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_SERVICE_ID', 
    'VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID',
    'VITE_EMAILJS_PROJECT_TEMPLATE_ID'
  ]
  
  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.error('❌ Missing EmailJS environment variables:', missing)
    return false
  }
  
  console.log('✅ EmailJS configuration validated')
  return true
}
