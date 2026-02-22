import { useState, useEffect } from 'react'
import { getAlumni } from '../../services/supabase'

const AlumniTest = () => {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    testAlumniFetch()
  }, [])

  const testAlumniFetch = async () => {
    try {
      setLoading(true)
      const data = await getAlumni()
      setAlumni(data)
      console.log('Alumni data fetched successfully:', data)
    } catch (error) {
      console.error('Error fetching alumni:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Alumni API Test</h2>
        <div className="text-blue-600">Loading alumni data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Alumni API Test</h2>
        <div className="text-red-600">Error: {error}</div>
        <button 
          onClick={testAlumniFetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Alumni API Test</h2>
      
      <div className="mb-4">
        <span className="text-green-600 font-semibold">
          ✓ Successfully fetched {alumni.length} alumni records
        </span>
      </div>

      <div className="space-y-4">
        {alumni.map((person) => (
          <div key={person.id} className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-lg">{person.name}</h3>
            <p className="text-blue-600">{person.role}</p>
            <p className="text-gray-600">{person.company} • {person.location}</p>
            <p className="text-sm text-gray-500">Batch {person.batch}</p>
            
            {person.quote && (
              <blockquote className="mt-2 pl-4 border-l-4 border-blue-500 italic text-gray-700">
                "{person.quote}"
              </blockquote>
            )}
            
            {person.achievements && person.achievements.length > 0 && (
              <div className="mt-2">
                <strong>Achievements:</strong>
                <ul className="list-disc list-inside ml-4">
                  {person.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {person.skills && person.skills.length > 0 && (
              <div className="mt-2">
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              Status: {person.is_active ? 'Active' : 'Inactive'} | 
              Order: {person.display_order} |
              Created: {new Date(person.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlumniTest
