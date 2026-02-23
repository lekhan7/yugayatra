import { useState, createContext, useContext } from 'react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const newToast = { id: Date.now(), message, type }
    setToasts(prev => [...prev, newToast])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
