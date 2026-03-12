import { Check, X, Eye } from 'lucide-react'

const ApplicationRow = ({ application, onUpdateStatus, onViewResume }) => {
  const getStatusBadge = (status) => {
    const statusColor = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
      accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-700'
    }

    return (
      <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${statusColor[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const currentStatus = application.status || 'pending'

  // Debug: Log the status to console
  console.log('Application Status:', application.id, currentStatus)

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700">
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {application.full_name}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.email}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.phone}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.role}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {getStatusBadge(currentStatus)}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button
          onClick={() => onViewResume(application.resume_url)}
          disabled={!application.resume_url}
          className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded transition-colors ${
            application.resume_url
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          <Eye size={14} className="mr-1" />
          View Resume
        </button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        {/* Debug: Show status temporarily */}
        <div className="text-xs text-purple-600 mb-1">Status: {currentStatus}</div>
        <div className="flex space-x-2">
          {currentStatus === 'pending' ? (
            <>
              <button
                onClick={() => onUpdateStatus(application.id, 'accepted')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Check size={14} className="mr-1" />
                Accept
              </button>
              <button
                onClick={() => onUpdateStatus(application.id, 'rejected')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <X size={14} className="mr-1" />
                Reject
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No actions available ({currentStatus})
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

export default ApplicationRow
