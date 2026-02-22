import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Users, 
  Briefcase,
  Mail,
  Linkedin,
  Twitter,
  ExternalLink,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react'
import { 
  getTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember, 
  toggleTeamMemberActive,
  supabase
} from '../../services/supabase'
import { useNotification } from '../../context/NotificationContext'

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const { success, error: showError } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    email: '',
    linkedin_url: '',
    twitter_url: '',
    image_url: '',
    display_order: 0,
    is_active: true
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const data = await getTeamMembers()
      setTeamMembers(data)
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      email: '',
      linkedin_url: '',
      twitter_url: '',
      image_url: '',
      display_order: 0,
      is_active: true
    })
    setEditingId(null)
  }

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      email: member.email || '',
      linkedin_url: member.linkedin_url || '',
      twitter_url: member.twitter_url || '',
      image_url: member.image_url || '',
      display_order: member.display_order,
      is_active: member.is_active
    })
    setEditingId(member.id)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `team/${fileName}`

      const { data, error } = await supabase.storage
        .from('team-images')
        .upload(filePath, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('team-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image_url: publicUrlData.publicUrl }))
      success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      showError('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.position) {
      showError('Please fill in all required fields')
      return
    }

    setSaving(true)
    try {
      const memberData = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        email: formData.email,
        linkedin_url: formData.linkedin_url,
        twitter_url: formData.twitter_url,
        image_url: formData.image_url,
        display_order: formData.display_order,
        is_active: formData.is_active
      }

      if (editingId) {
        // Update existing team member
        const updatedMember = await updateTeamMember(editingId, memberData)
        setTeamMembers(prev =>
          prev.map(member =>
            member.id === editingId ? updatedMember : member
          )
        )
        success('Team member updated successfully!')
      } else {
        // Create new team member
        const newMember = await createTeamMember(memberData)
        setTeamMembers(prev => [...prev, newMember])
        success('Team member added successfully!')
      }

      resetForm()
    } catch (error) {
      console.error('Error saving team member:', error)
      showError('Error saving team member. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return
    }

    try {
      await deleteTeamMember(id)
      setTeamMembers(prev => prev.filter(member => member.id !== id))
      success('Team member deleted successfully!')
    } catch (error) {
      console.error('Error deleting team member:', error)
      showError('Error deleting team member. Please try again.')
    }
  }

  const handleToggleActive = async (id, isActive) => {
    try {
      const updatedMember = await toggleTeamMemberActive(id, isActive)
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === id ? updatedMember : member
        )
      )
      success(`Team member ${isActive ? 'activated' : 'deactivated'} successfully!`)
    } catch (error) {
      console.error('Error toggling team member status:', error)
      showError('Error updating team member status. Please try again.')
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage team member profiles and information</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Team Member' : 'Add New Team Member'}
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
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="CEO, Founder"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Brief description about the team member..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="john@example.com"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter_url: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://twitter.com/username"
              />
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
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>
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
              Active (visible on website)
            </label>
          </div>
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : (editingId ? 'Update' : 'Add')} Team Member</span>
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

      {/* Team Members List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Team Members ({teamMembers.length})
          </h2>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No team members yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add your first team member using the form above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {teamMembers.map((member) => (
              <div key={member.id} className={`border ${member.is_active ? 'border-gray-200 dark:border-gray-700' : 'border-red-200 dark:border-red-700'} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 ${member.is_active ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20'} rounded-lg`}>
                    <Users className={member.is_active ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'} size={24} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(member.id, !member.is_active)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                      title={member.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {member.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${member.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                    {member.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
                  {member.position}
                </p>

                {member.bio && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}

                {member.image_url && (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}

                <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                      <Linkedin size={12} className="mr-1" />
                      LinkedIn
                    </a>
                  )}
                  {member.twitter_url && (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 flex items-center">
                      <Twitter size={12} className="mr-1" />
                      Twitter
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gray-800 flex items-center">
                      <Mail size={12} className="mr-1" />
                      Email
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

export default TeamManager
