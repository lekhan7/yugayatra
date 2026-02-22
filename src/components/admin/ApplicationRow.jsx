import { Check, X, Eye } from 'lucide-react'

const ApplicationRow = ({ application, onUpdateStatus, onViewResume }) => {
  const getStatusBadge = (status) => {
    const statusColor = {
      pending: 'bg-accent-gold/20 text-accent-gold dark:bg-accent-gold dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
      accepted: 'bg-accent-main/20 text-accent-dark dark:bg-accent-dark dark:text-green-200 border-accent-main/30 dark:border-accent-dark',
      rejected: 'bg-accent-gold/20 text-red-800 dark:bg-accent-gold dark:text-red-200 border-accent-gold/30 dark:border-accent-gold'
    }

    return (
      <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${statusColor[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const currentStatus = application.status || 'pending'

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {application.full_name}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.phone}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {application.role}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(currentStatus)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onViewResume(application.resume_url)}
          disabled={!application.resume_url}
          className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded transition-colors ${
            application.resume_url
              ? 'bg-accent-light/20 text-accent-dark/80 hover:bg-accent-light/30 dark:bg-accent-dark/60 dark:text-accent-light/30 dark:hover:bg-accent-dark/80'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
          }`}
        >
          <Eye size={14} className="mr-1" />
          View Resume
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          {currentStatus === 'pending' ? (
            <>
              <button
                onClick={() => onUpdateStatus(application.id, 'accepted')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded bg-accent-main/20 text-accent-dark hover:bg-green-200 dark:bg-accent-dark dark:text-green-200 dark:hover:bg-accent-dark transition-colors"
              >
                <Check size={14} className="mr-1" />
                Accept
              </button>
              <button
                onClick={() => onUpdateStatus(application.id, 'rejected')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded bg-accent-gold/20 text-red-800 hover:bg-red-200 dark:bg-accent-gold dark:text-red-200 dark:hover:bg-accent-gold transition-colors"
              >
                <X size={14} className="mr-1" />
                Reject
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No actions available
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

export default ApplicationRow
