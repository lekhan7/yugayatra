import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#f3f4f6',
          border: '1px solid #374151',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#f3f4f6',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#f3f4f6',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#f3f4f6',
          },
        },
      }}
    />
  )
}

export default ToastProvider
