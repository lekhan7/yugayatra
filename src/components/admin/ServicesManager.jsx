import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe,
  Briefcase,
  Settings,
  Target,
  Eye,
  EyeOff
} from 'lucide-react'
import { 
  getAllServices, 
  createService, 
  updateService, 
  deleteService, 
  toggleServiceActive 
} from '../../services/supabase'
import { useNotification } from '../../context/NotificationContext'

const ServicesManager = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const { success, error: showError } = useNotification()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    icon_name: 'Code',
    icon_bg_color: 'from-blue-500 to-blue-600',
    features: [''],
    technologies: [''],
    apply_enabled: true,
    display_order: 0,
    is_active: true,
    meta_title: '',
    meta_description: ''
  })
  const [saving, setSaving] = useState(false)

  const iconOptions = [
    { name: 'Code', icon: Code },
    { name: 'Palette', icon: Palette },
    { name: 'TrendingUp', icon: TrendingUp },
    { name: 'Users', icon: Users },
    { name: 'Database', icon: Database },
    { name: 'Cloud', icon: Cloud },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Globe', icon: Globe },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Settings', icon: Settings },
    { name: 'Target', icon: Target }
  ]

  const colorOptions = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-cyan-500 to-cyan-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-accent-main to-blue-600'
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getAllServices()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      icon_name: 'Code',
      icon_bg_color: 'from-blue-500 to-blue-600',
      features: [''],
      technologies: [''],
      apply_enabled: true,
      display_order: 0,
      is_active: true,
      meta_title: '',
      meta_description: ''
    })
    setEditingId(null)
  }

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      slug: service.slug,
      short_description: service.short_description,
      icon_name: service.icon_name,
      icon_bg_color: service.icon_bg_color,
      features: service.features.length > 0 ? service.features : [''],
      technologies: service.technologies.length > 0 ? service.technologies : [''],
      apply_enabled: service.apply_enabled,
      display_order: service.display_order,
      is_active: service.is_active,
      meta_title: service.meta_title || '',
      meta_description: service.meta_description || ''
    })
    setEditingId(service.id)
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }))
  }

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }

  const updateTechnology = (index, value) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((tech, i) => i === index ? value : tech)
    }))
  }

  const handleSave = async () => {
    if (!formData.title || !formData.short_description) {
      showError('Please fill in title and description')
      return
    }

    const features = formData.features.filter(feature => feature.trim() !== '')
    const technologies = formData.technologies.filter(tech => tech.trim() !== '')

    if (features.length === 0) {
      showError('Please add at least one feature')
      return
    }

    setSaving(true)
    try {
      const serviceData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        short_description: formData.short_description,
        icon_name: formData.icon_name,
        icon_bg_color: formData.icon_bg_color,
        features: features,
        technologies: technologies,
        apply_enabled: formData.apply_enabled,
        display_order: formData.display_order,
        is_active: formData.is_active,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description
      }

      if (editingId) {
        // Update existing service
        const updatedService = await updateService(editingId, serviceData)
        setServices(prev =>
          prev.map(s =>
            s.id === editingId ? updatedService : s
          )
        )
        success('Service updated successfully!')
      } else {
        // Create new service
        const newService = await createService(serviceData)
        setServices(prev => [...prev, newService])
        success('Service added successfully!')
      }

      resetForm()
    } catch (error) {
      console.error('Error saving service:', error)
      showError('Error saving service. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return
    }

    try {
      await deleteService(id)
      setServices(prev => prev.filter(s => s.id !== id))
      success('Service deleted successfully!')
    } catch (error) {
      console.error('Error deleting service:', error)
      showError('Error deleting service. Please try again.')
    }
  }

  const handleToggleActive = async (id, isActive) => {
    try {
      const updatedService = await toggleServiceActive(id, isActive)
      setServices(prev =>
        prev.map(s =>
          s.id === id ? updatedService : s
        )
      )
      success(`Service ${isActive ? 'activated' : 'deactivated'} successfully!`)
    } catch (error) {
      console.error('Error toggling service status:', error)
      showError('Error updating service status. Please try again.')
    }
  }

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(opt => opt.name === iconName)
    return icon ? icon.icon : Briefcase
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Services Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage services offered by your organization</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Web Development"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="web-development"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description *
            </label>
            <textarea
              value={formData.short_description}
              onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of your service..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <select
                value={formData.icon_name}
                onChange={(e) => setFormData(prev => ({ ...prev, icon_name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {iconOptions.map(option => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon Background Color
              </label>
              <select
                value={formData.icon_bg_color}
                onChange={(e) => setFormData(prev => ({ ...prev, icon_bg_color: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {colorOptions.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="apply_enabled"
                checked={formData.apply_enabled}
                onChange={(e) => setFormData(prev => ({ ...prev, apply_enabled: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="apply_enabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Apply Button Enabled
              </label>
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
              Features *
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Feature description"
                />
                {formData.features.length > 1 && (
                  <button
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addFeature}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies
            </label>
            {formData.technologies.map((tech, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateTechnology(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Technology name"
                />
                {formData.technologies.length > 1 && (
                  <button
                    onClick={() => removeTechnology(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addTechnology}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Technology
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="SEO meta title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="SEO meta description"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : (editingId ? 'Update' : 'Add')} Service</span>
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

      {/* Services List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Services ({services.length})
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No services yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add your first service using the form above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon_name)
              return (
                <div key={service.id} className={`border ${service.is_active ? 'border-gray-200 dark:border-gray-700' : 'border-red-200 dark:border-red-700'} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 ${service.is_active ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20'} rounded-lg`}>
                      <IconComponent className={service.is_active ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'} size={24} />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleActive(service.id, !service.is_active)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                        title={service.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {service.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${service.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                      {service.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                      Order: {service.display_order}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {service.short_description}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{service.features.length - 3} more features
                        </span>
                      )}
                    </div>
                  )}

                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{service.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {service.apply_enabled ? '✓ Apply enabled' : '✗ Apply disabled'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesManager
