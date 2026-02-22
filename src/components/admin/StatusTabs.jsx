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
          return `${baseClasses} bg-accent-gold/20 text-accent-gold dark:bg-accent-gold dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800`
        case 'green':
          return `${baseClasses} bg-accent-main/20 text-accent-dark dark:bg-accent-dark dark:text-green-200 border border-accent-main/30 dark:border-accent-dark`
        case 'red':
          return `${baseClasses} bg-accent-gold/20 text-red-800 dark:bg-accent-gold dark:text-red-200 border border-accent-gold/30 dark:border-accent-gold`
        default:
          return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`
      }
    } else {
      return `${baseClasses} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700`
    }
  }

  const getCountClasses = (color) => {
    switch (color) {
      case 'yellow':
        return 'bg-yellow-200 text-accent-gold dark:bg-accent-gold dark:text-yellow-200'
      case 'green':
        return 'bg-green-200 text-accent-dark dark:bg-accent-dark dark:text-green-200'
      case 'red':
        return 'bg-red-200 text-red-800 dark:bg-accent-gold dark:text-red-200'
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
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
