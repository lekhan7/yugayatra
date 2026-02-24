// Test file for Web3 Forms functionality
import { submitContactForm } from '../src/services/web3forms.js'

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+91 98765 43210',
  company: 'Test Company',
  message: 'This is a test message from Web3 Forms integration.'
}

// Test function
const testWeb3Forms = async () => {
  try {
    console.log('Testing Web3 Forms submission...')
    const result = await submitContactForm(testData)
    console.log('✅ Web3 Forms test successful:', result)
    return true
  } catch (error) {
    console.error('❌ Web3 Forms test failed:', error)
    return false
  }
}

export default testWeb3Forms
