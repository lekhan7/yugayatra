import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Users, 
  MapPin, 
  Calendar, 
  Award,
  Building,
  ExternalLink,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react'
import { 
  getAllAlumni, 
  createAlumni, 
  updateAlumni, 
  deleteAlumni, 
  toggleAlumniActive,
  supabase
} from '../../services/supabase'
import { useNotification } from '../../context/NotificationContext'

const AlumniManager = () => {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const { success, error: showError } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: '',
    image: '',
    batch: '',
    quote: '',
    achievements: [''],
    skills: [''],
    linkedin: '',
    github: '',
    display_order: 0,
    is_active: true
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const data = await getAllAlumni()
      setAlumni(data)
    } catch (error) {
      console.error('Error fetching alumni:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      location: '',
      image: '',
      batch: '',
      quote: '',
      achievements: [''],
      skills: [''],
      linkedin: '',
      github: '',
      display_order: 0,
      is_active: true
    })
    setEditingId(null)
  }

  const handleEdit = (alumniItem) => {
    setFormData({
      name: alumniItem.name,
      role: alumniItem.role,
      company: alumniItem.company,
      location: alumniItem.location,
      image: alumniItem.image || '',
      batch: alumniItem.batch,
      quote: alumniItem.quote || '',
      achievements: alumniItem.achievements.length > 0 ? alumniItem.achievements : [''],
      skills: alumniItem.skills.length > 0 ? alumniItem.skills : [''],
      linkedin: alumniItem.linkedin || '',
      github: alumniItem.github || '',
      display_order: alumniItem.display_order,
      is_active: alumniItem.is_active
    })
    setEditingId(alumniItem.id)
  }

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }))
  }

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  const updateAchievement = (index, value) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) => i === index ? value : achievement)
    }))
  }

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }))
  }

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const updateSkill = (index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `alumni/${fileName}`

      const { data, error } = await supabase.storage
        .from('alumni-images')
        .upload(filePath, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('alumni-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image: publicUrlData.publicUrl }))
      success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      showError('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.company || !formData.location || !formData.batch) {
      showError('Please fill in all required fields')
      return
    }

    const achievements = formData.achievements.filter(achievement => achievement.trim() !== '')
    const skills = formData.skills.filter(skill => skill.trim() !== '')

    setSaving(true)
    try {
      const alumniData = {
        name: formData.name,
        role: formData.role,
        company: formData.company,
        location: formData.location,
        image: formData.image,
        batch: formData.batch,
        quote: formData.quote,
        achievements: achievements,
        skills: skills,
        linkedin: formData.linkedin,
        github: formData.github,
        display_order: formData.display_order,
        is_active: formData.is_active
      }

      if (editingId) {
        // Update existing alumni
        const updatedAlumni = await updateAlumni(editingId, alumniData)
        setAlumni(prev =>
          prev.map(a =>
            a.id === editingId ? updatedAlumni : a
          )
        )
        success('Alumni updated successfully!')
      } else {
        // Create new alumni
        const newAlumni = await createAlumni(alumniData)
        setAlumni(prev => [...prev, newAlumni])
        success('Alumni added successfully!')
      }

      resetForm()
    } catch (error) {
      console.error('Error saving alumni:', error)
      showError('Error saving alumni. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this alumni record?')) {
      return
    }

    try {
      await deleteAlumni(id)
      setAlumni(prev => prev.filter(a => a.id !== id))
      success('Alumni deleted successfully!')
    } catch (error) {
      console.error('Error deleting alumni:', error)
      showError('Error deleting alumni. Please try again.')
    }
  }

  const handleToggleActive = async (id, isActive) => {
    try {
      const updatedAlumni = await toggleAlumniActive(id, isActive)
      setAlumni(prev =>
        prev.map(a =>
          a.id === id ? updatedAlumni : a
        )
      )
      success(`Alumni ${isActive ? 'activated' : 'deactivated'} successfully!`)
    } catch (error) {
      console.error('Error toggling alumni status:', error)
      showError('Error updating alumni status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alumni Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage alumni profiles and success stories</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Alumni' : 'Add New Alumni'}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Tech Company"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Bangalore, India"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Batch Year *
              </label>
              <input
                type="text"
                value={formData.batch}
                onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                <Upload size={16} />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              </label>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quote
            </label>
            <textarea
              value={formData.quote}
              onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Inspirational quote from the alumni..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Achievements
            </label>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Achievement description"
                />
                {formData.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAchievement}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Achievement
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Skill name"
                />
                {formData.skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSkill}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Skill
            </button>
          </div>
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : (editingId ? 'Update' : 'Add')} Alumni</span>
          </button>
          
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Alumni List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Alumni ({alumni.length})
          </h2>
        </div>

        {alumni.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No alumni yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add your first alumni using the form above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {alumni.map((alumniItem) => (
              <div key={alumniItem.id} className={`border ${alumniItem.is_active ? 'border-gray-200 dark:border-gray-700' : 'border-red-200 dark:border-red-700'} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 ${alumniItem.is_active ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20'} rounded-lg`}>
                    <Users className={alumniItem.is_active ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'} size={24} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(alumniItem)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(alumniItem.id, !alumniItem.is_active)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                      title={alumniItem.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {alumniItem.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(alumniItem.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${alumniItem.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                    {alumniItem.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                    Batch {alumniItem.batch}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {alumniItem.name}
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">
                  {alumniItem.role}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {alumniItem.company}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{alumniItem.location}</span>
                </div>

                {alumniItem.image && (
                  <img
                    src={alumniItem.image}
                    alt={alumniItem.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                
                {alumniItem.achievements && alumniItem.achievements.length > 0 && (
                  <div className="space-y-1 mb-3">
                    {alumniItem.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{achievement}</span>
                      </div>
                    ))}
                    {alumniItem.achievements.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{alumniItem.achievements.length - 2} more achievements
                      </span>
                    )}
                  </div>
                )}

                {alumniItem.skills && alumniItem.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {alumniItem.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {alumniItem.skills.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{alumniItem.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {alumniItem.linkedin && (
                    <a href={alumniItem.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      LinkedIn
                    </a>
                  )}
                  {alumniItem.github && (
                    <a href={alumniItem.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlumniManager
