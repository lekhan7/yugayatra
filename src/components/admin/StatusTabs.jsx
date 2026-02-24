const StatusTabs = ({ activeTab, setActiveTab, stats }) => {
  const tabs = [
    { id: 'pending', label: 'Pending', count: stats.pending, color: 'yellow' },
    { id: 'accepted', label: 'Accepted', count: stats.accepted, color: 'green' },
    { id: 'rejected', label: 'Rejected', count: stats.rejected, color: 'red' }
  ]

  const getTabClasses = (tabId, color) => {
    const isActive = activeTab === tabId
    const baseClasses = 'px-6 py-3 font-medium text-sm rounded-lg transition-all duration-200 flex items-center space-x-2'
    
    if (isActive) {
      switch (color) {
        case 'yellow':
          return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700`
        case 'green':
          return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700`
        case 'red':
          return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700`
        default:
          return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700`
      }
    } else {
      return `${baseClasses} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700`
    }
  }

  const getCountClasses = (color) => {
    switch (color) {
      case 'yellow':
        return 'bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white'
      case 'green':
        return 'bg-green-500 text-white dark:bg-green-600 dark:text-white'
      case 'red':
        return 'bg-red-500 text-white dark:bg-red-600 dark:text-white'
      default:
        return 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={getTabClasses(tab.id, tab.color)}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCountClasses(tab.color)}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StatusTabs
