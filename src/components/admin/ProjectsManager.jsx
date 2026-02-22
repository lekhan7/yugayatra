import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../services/supabase'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Globe,
  Briefcase,
  Users,
  Code,
  Palette,
  TrendingUp,
  ShoppingBag,
  FileText,
  Zap,
  Bell,
  School,
  Utensils,
  BookOpen,
  Newspaper,
  GraduationCap,
  Scale,
  Calendar
} from 'lucide-react'

const iconOptions = [
  { name: 'Bell', icon: Bell },
  { name: 'School', icon: School },
  { name: 'Utensils', icon: Utensils },
  { name: 'User', icon: Users },
  { name: 'Newspaper', icon: Newspaper },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Scale', icon: Scale },
  { name: 'Globe', icon: Globe },
  { name: 'Code', icon: Code },
  { name: 'Palette', icon: Palette },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'ShoppingBag', icon: ShoppingBag },
  { name: 'FileText', icon: FileText },
  { name: 'Zap', icon: Zap },
  { name: 'Calendar', icon: Calendar }
]

const colorOptions = [
  { name: 'Blue to Cyan', value: 'from-accent-dark/100 to-cyan-600' },
  { name: 'Green to Emerald', value: 'from-accent-main to-emerald-600' },
  { name: 'Orange to Red', value: 'from-accent-gold to-accent-dark' },
  { name: 'Purple to Pink', value: 'from-accent-main to-accent-gold' },
  { name: 'Indigo to Blue', value: 'from-accent-main to-accent-main' },
  { name: 'Teal to Cyan', value: 'from-teal-500 to-cyan-600' },
  { name: 'Yellow to Orange', value: 'from-accent-gold to-orange-600' },
  { name: 'Slate to Gray', value: 'from-slate-500 to-gray-600' }
]

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    website_url: '',
    icon_name: 'Bell',
    color_gradient: 'from-accent-dark/100 to-cyan-600',
    display_order: 0,
    is_active: true
  })
  const [features, setFeatures] = useState([''])
  const [technologies, setTechnologies] = useState([''])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (projectsError) throw projectsError

      // Fetch features and technologies for each project
      const projectsWithDetails = await Promise.all(
        projectsData.map(async (project) => {
          const [{ data: featuresData }, { data: technologiesData }] = await Promise.all([
            supabase
              .from('project_features')
              .select('*')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true }),
            supabase
              .from('project_technologies')
              .select('*')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true })
          ])

          return {
            ...project,
            features: featuresData?.map(f => f.feature_text) || [],
            technologies: technologiesData?.map(t => t.technology_name) || []
          }
        })
      )

      setProjects(projectsWithDetails)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(opt => opt.name === iconName)
    return icon ? icon.icon : Globe
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const projectData = {
        ...formData,
        display_order: parseInt(formData.display_order)
      }

      let projectResult
      if (editingProject) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
          .select()
          .single()

        if (error) throw error
        projectResult = data
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single()

        if (error) throw error
        projectResult = data
      }

      // Handle features
      if (editingProject) {
        // Delete existing features
        await supabase
          .from('project_features')
          .delete()
          .eq('project_id', editingProject.id)
      }

      const validFeatures = features.filter(f => f.trim() !== '')
      if (validFeatures.length > 0) {
        await supabase
          .from('project_features')
          .insert(
            validFeatures.map((feature, index) => ({
              project_id: projectResult.id,
              feature_text: feature,
              display_order: index
            }))
          )
      }

      // Handle technologies
      if (editingProject) {
        // Delete existing technologies
        await supabase
          .from('project_technologies')
          .delete()
          .eq('project_id', editingProject.id)
      }

      const validTechnologies = technologies.filter(t => t.trim() !== '')
      if (validTechnologies.length > 0) {
        await supabase
          .from('project_technologies')
          .insert(
            validTechnologies.map((tech, index) => ({
              project_id: projectResult.id,
              technology_name: tech,
              display_order: index
            }))
          )
      }

      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      category: project.category,
      description: project.description,
      website_url: project.website_url || '',
      icon_name: project.icon_name,
      color_gradient: project.color_gradient,
      display_order: project.display_order,
      is_active: project.is_active
    })
    setFeatures(project.features.length > 0 ? project.features : [''])
    setTechnologies(project.technologies.length > 0 ? project.technologies : [''])
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await supabase.from('projects').delete().eq('id', id)
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleToggleActive = async (id, isActive) => {
    try {
      await supabase
        .from('projects')
        .update({ is_active: isActive })
        .eq('id', id)
      fetchProjects()
    } catch (error) {
      console.error('Error toggling project status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      website_url: '',
      icon_name: 'Bell',
      color_gradient: 'from-accent-dark/100 to-cyan-600',
      display_order: 0,
      is_active: true
    })
    setFeatures([''])
    setTechnologies([''])
    setEditingProject(null)
    setShowAddForm(false)
  }

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures.length > 0 ? newFeatures : [''])
  }
  const updateFeature = (index, value) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const addTechnology = () => setTechnologies([...technologies, ''])
  const removeTechnology = (index) => {
    const newTechnologies = technologies.filter((_, i) => i !== index)
    setTechnologies(newTechnologies.length > 0 ? newTechnologies : [''])
  }
  const updateTechnology = (index, value) => {
    const newTechnologies = [...technologies]
    newTechnologies[index] = value
    setTechnologies(newTechnologies)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-accent-main text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., EdTech, SaaS"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Icon
                    </label>
                    <select
                      value={formData.icon_name}
                      onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color Theme
                    </label>
                    <select
                      value={formData.color_gradient}
                      onChange={(e) => setFormData({ ...formData, color_gradient: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
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
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Features
                  </label>
                  {features.map((feature, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      {features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-accent-gold hover:bg-accent-gold/10 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-accent-main hover:text-accent-dark dark:text-accent-light/60 text-sm font-medium"
                  >
                    + Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies
                  </label>
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                        placeholder="Enter technology"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      {technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="p-2 text-accent-gold hover:bg-accent-gold/10 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="text-accent-main hover:text-accent-dark dark:text-accent-light/60 text-sm font-medium"
                  >
                    + Add Technology
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-gray-300 text-accent-main focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-accent-main text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors"
                  >
                    <Save size={16} />
                    <span>{editingProject ? 'Update' : 'Save'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Briefcase size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first project</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-accent-main text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {projects.map((project) => {
            const IconComponent = getIconComponent(project.icon_name)
            return (
              <div key={project.id} className={`border ${project.is_active ? 'border-gray-200 dark:border-gray-700' : 'border-accent-gold/30 dark:border-red-700'} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 ${project.is_active ? 'bg-accent-light/20 dark:bg-accent-dark/60/20' : 'bg-accent-gold/20 dark:bg-accent-gold/20'} rounded-lg`}>
                    <IconComponent className={project.is_active ? 'text-accent-main dark:text-accent-light/60' : 'text-accent-gold dark:text-accent-gold/80'} size={24} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-accent-main hover:bg-accent-light/10 dark:text-accent-light/60 dark:hover:bg-accent-dark/60/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(project.id, !project.is_active)}
                      className="p-2 text-accent-gold hover:bg-yellow-50 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                      title={project.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {project.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-accent-gold hover:bg-accent-gold/10 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${project.is_active ? 'bg-accent-main/20 text-accent-dark dark:bg-accent-dark/20 dark:text-accent-light' : 'bg-accent-gold/20 text-red-800 dark:bg-accent-gold/20 dark:text-accent-gold/80'}`}>
                    {project.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                    Order: {project.display_order}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {project.category}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                
                {project.features && project.features.length > 0 && (
                  <div className="space-y-1 mb-4">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent-main rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                    {project.features.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{project.features.length - 2} more features
                      </div>
                    )}
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {project.website_url && (
                  <div className="text-xs text-accent-main dark:text-accent-light/60 truncate">
                    🌐 {project.website_url}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProjectsManager
