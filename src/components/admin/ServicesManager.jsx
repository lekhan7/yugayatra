import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Plus, Edit2, Trash2, Save, X, Briefcase, Settings, Code, Users, Target } from 'lucide-react'

const ServicesManager = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Briefcase',
    features: ['']
  })
  const [saving, setSaving] = useState(false)

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const iconOptions = [
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Settings', icon: Settings },
    { name: 'Code', icon: Code },
    { name: 'Users', icon: Users },
    { name: 'Target', icon: Target }
  ]

  const defaultServices = [
    {
      id: 'default-1',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: 'Code',
      features: ['React Development', 'Node.js Backend', 'Database Design', 'API Integration']
    },
    {
      id: 'default-2',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      icon: 'Briefcase',
      features: ['iOS Development', 'Android Development', 'React Native', 'Flutter']
    },
    {
      id: 'default-3',
      title: 'Consulting',
      description: 'Expert guidance for your digital transformation',
      icon: 'Users',
      features: ['Technical Strategy', 'Architecture Design', 'Performance Optimization', 'Security Audit']
    }
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      // If no services exist, use default ones
      if (!data || data.length === 0) {
        setServices(defaultServices)
      } else {
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      setServices(defaultServices)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Briefcase',
      features: ['']
    })
    setEditingId(null)
  }

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.length > 0 ? service.features : ['']
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

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description')
      return
    }

    const features = formData.features.filter(feature => feature.trim() !== '')
    if (features.length === 0) {
      alert('Please add at least one feature')
      return
    }

    setSaving(true)
    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        features: features
      }

      if (editingId && !editingId.startsWith('default-')) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingId)

        if (error) throw error

        setServices(prev =>
          prev.map(s =>
            s.id === editingId
              ? { ...s, ...serviceData }
              : s
          )
        )
      } else if (!editingId || editingId.startsWith('default-')) {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert(serviceData)
          .select()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data && data.length > 0) {
          setServices(prev => [data[0], ...prev])
        } else {
          // If table doesn't exist, add to local state
          const newService = {
            id: `local-${Date.now()}`,
            ...serviceData,
            created_at: new Date().toISOString()
          }
          setServices(prev => [newService, ...prev])
        }
      }

      resetForm()
      alert(editingId && !editingId.startsWith('default-') ? 'Service updated successfully!' : 'Service added successfully!')
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error saving service. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (id.startsWith('default-')) {
      alert('Cannot delete default services')
      return
    }

    if (!confirm('Are you sure you want to delete this service?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setServices(prev => prev.filter(s => s.id !== id))
      alert('Service deleted successfully!')
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Error deleting service. Please try again.')
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
                Service Title
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
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {iconOptions.map(option => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Describe your service..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Features
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
              const IconComponent = getIconComponent(service.icon)
              return (
                <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <IconComponent className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      {!service.id.startsWith('default-') && (
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1">
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
