import React, { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  // Convenience methods
  const success = (message, duration) => addNotification(message, 'success', duration)
  const error = (message, duration) => addNotification(message, 'error', duration)
  const warning = (message, duration) => addNotification(message, 'warning', duration)
  const info = (message, duration) => addNotification(message, 'info', duration)

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

const NotificationItem = ({ notification, onClose }) => {
  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500 text-white border-green-600'
      case 'error':
        return 'bg-red-500 text-white border-red-600'
      case 'warning':
        return 'bg-yellow-500 text-black border-yellow-600'
      case 'info':
      default:
        return 'bg-blue-500 text-white border-blue-600'
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border
        ${getStyles()}
        min-w-[300px] max-w-md
        animate-slide-in-right
      `}
    >
      <span className="text-xl font-bold">{getIcon()}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default NotificationProvider
