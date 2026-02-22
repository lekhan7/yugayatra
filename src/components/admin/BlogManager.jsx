import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  FileText, 
  Calendar, 
  Clock,
  Eye,
  EyeOff,
  Upload,
  Star,
  StarOff,
  Hash,
  User,
  Type,
  Image as ImageIcon
} from 'lucide-react'
import { 
  getAllBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  toggleBlogPostActive,
  toggleBlogPostFeatured,
  uploadBlogImage,
  deleteBlogImage,
  supabase
} from '../../services/supabase'
import { useNotification } from '../../context/NotificationContext'

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const { success, error: showError } = useNotification()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'YugaYatra Team',
    category: 'General',
    featured_image: '',
    read_time: 5,
    tags: [''],
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    is_featured: false,
    is_active: true,
    display_order: 0
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const categories = [
    'General', 'Digital Marketing', 'Branding', 'Technology', 'Business', 
    'Design', 'Development', 'Marketing', 'Strategy', 'SEO', 'Social Media'
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const data = await getAllBlogPosts()
      setBlogPosts(data)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'YugaYatra Team',
      category: 'General',
      featured_image: '',
      read_time: 5,
      tags: [''],
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      is_featured: false,
      is_active: true,
      display_order: 0
    })
    setEditingId(null)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value) => {
    const newSlug = generateSlug(value)
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: prev.slug || newSlug,
      meta_title: prev.meta_title || value
    }))
  }

  const handleEdit = (blogPost) => {
    setFormData({
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt || '',
      content: blogPost.content || '',
      author: blogPost.author,
      category: blogPost.category,
      featured_image: blogPost.featured_image || '',
      read_time: blogPost.read_time || 5,
      tags: blogPost.tags && blogPost.tags.length > 0 ? blogPost.tags : [''],
      meta_title: blogPost.meta_title || '',
      meta_description: blogPost.meta_description || '',
      meta_keywords: blogPost.meta_keywords || '',
      is_featured: blogPost.is_featured,
      is_active: blogPost.is_active,
      display_order: blogPost.display_order || 0
    })
    setEditingId(blogPost.id)
  }

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const updateTag = (index, value) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const result = await uploadBlogImage(file)
      setFormData(prev => ({ ...prev, featured_image: result.publicUrl }))
      success('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      showError('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.author || !formData.category) {
      showError('Please fill in all required fields')
      return
    }

    const tags = formData.tags.filter(tag => tag.trim() !== '')

    setSaving(true)
    try {
      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        featured_image: formData.featured_image,
        read_time: formData.read_time,
        tags: tags,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        meta_keywords: formData.meta_keywords,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        display_order: formData.display_order
      }

      if (editingId) {
        // Update existing blog post
        const updatedPost = await updateBlogPost(editingId, blogData)
        setBlogPosts(prev =>
          prev.map(post =>
            post.id === editingId ? updatedPost : post
          )
        )
        success('Blog post updated successfully!')
      } else {
        // Create new blog post
        const newPost = await createBlogPost(blogData)
        setBlogPosts(prev => [newPost, ...prev])
        success('Blog post added successfully!')
      }

      resetForm()
    } catch (error) {
      console.error('Error saving blog post:', error)
      showError('Error saving blog post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      await deleteBlogPost(id)
      setBlogPosts(prev => prev.filter(post => post.id !== id))
      success('Blog post deleted successfully!')
    } catch (error) {
      console.error('Error deleting blog post:', error)
      showError('Error deleting blog post. Please try again.')
    }
  }

  const handleToggleActive = async (id, isActive) => {
    try {
      const updatedPost = await toggleBlogPostActive(id, isActive)
      setBlogPosts(prev =>
        prev.map(post =>
          post.id === id ? updatedPost : post
        )
      )
      success(`Blog post ${isActive ? 'activated' : 'deactivated'} successfully!`)
    } catch (error) {
      console.error('Error toggling blog post status:', error)
      showError('Error updating blog post status. Please try again.')
    }
  }

  const handleToggleFeatured = async (id, isFeatured) => {
    try {
      const updatedPost = await toggleBlogPostFeatured(id, isFeatured)
      setBlogPosts(prev =>
        prev.map(post =>
          post.id === id ? updatedPost : post
        )
      )
      success(`Blog post ${isFeatured ? 'featured' : 'unfeatured'} successfully!`)
    } catch (error) {
      console.error('Error toggling featured status:', error)
      showError('Error updating featured status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage blog posts and insights</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter blog post title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Author name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of the blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Full blog post content..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Read Time (minutes)
              </label>
              <input
                type="number"
                value={formData.read_time}
                onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="5"
                min="1"
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

            <div className="flex items-center space-x-4">
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="blog-image-upload"
              />
              <label
                htmlFor="blog-image-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                <ImageIcon size={16} />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              </label>
              {formData.featured_image && (
                <img
                  src={formData.featured_image}
                  alt="Featured image preview"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Tag name"
                />
                {formData.tags.length > 1 && (
                  <button
                    onClick={() => removeTag(index)}
                    className="px-3 py-2 bg-accent-gold text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addTag}
              className="mt-2 px-4 py-2 bg-accent-dark text-white rounded-lg hover:bg-green-700"
            >
              Add Tag
            </button>
          </div>

          {/* SEO Fields */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="SEO title (optional)"
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
                  placeholder="SEO description (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="keyword1, keyword2, keyword3 (optional)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-accent-main text-white rounded-lg hover:bg-accent-dark disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : (editingId ? 'Update' : 'Add')} Blog Post</span>
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

      {/* Blog Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Blog Posts ({blogPosts.length})
          </h2>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No blog posts yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add your first blog post using the form above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {blogPosts.map((blogPost) => (
              <div key={blogPost.id} className={`border ${blogPost.is_active ? 'border-gray-200 dark:border-gray-700' : 'border-accent-gold/30 dark:border-red-700'} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 ${blogPost.is_active ? 'bg-accent-light/20 dark:bg-accent-dark/60/20' : 'bg-accent-gold/20 dark:bg-accent-gold/20'} rounded-lg`}>
                    <FileText className={blogPost.is_active ? 'text-accent-main dark:text-accent-light/60' : 'text-accent-gold dark:text-accent-gold/80'} size={24} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(blogPost)}
                      className="p-2 text-accent-main hover:bg-accent-light/10 dark:text-accent-light/60 dark:hover:bg-accent-dark/60/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(blogPost.id, !blogPost.is_featured)}
                      className="p-2 text-accent-gold hover:bg-yellow-50 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                      title={blogPost.is_featured ? 'Unfeature' : 'Feature'}
                    >
                      {blogPost.is_featured ? <StarOff size={16} /> : <Star size={16} />}
                    </button>
                    <button
                      onClick={() => handleToggleActive(blogPost.id, !blogPost.is_active)}
                      className="p-2 text-accent-gold hover:bg-yellow-50 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                      title={blogPost.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {blogPost.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(blogPost.id)}
                      className="p-2 text-accent-gold hover:bg-accent-gold/10 dark:text-accent-gold/80 dark:hover:bg-accent-gold/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${blogPost.is_active ? 'bg-accent-main/20 text-accent-dark dark:bg-accent-dark/20 dark:text-accent-light' : 'bg-accent-gold/20 text-red-800 dark:bg-accent-gold/20 dark:text-accent-gold/80'}`}>
                    {blogPost.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {blogPost.is_featured && (
                    <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-accent-gold/20 text-accent-gold dark:bg-accent-gold/20 dark:text-accent-gold/80">
                      Featured
                    </span>
                  )}
                  <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                    {blogPost.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blogPost.title}
                </h3>
                
                {blogPost.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {blogPost.excerpt}
                  </p>
                )}

                {blogPost.featured_image && (
                  <img
                    src={blogPost.featured_image}
                    alt={blogPost.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <User className="w-3 h-3 mr-1" />
                  <span>{blogPost.author}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{blogPost.read_time} min read</span>
                </div>

                {blogPost.tags && blogPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {blogPost.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                    {blogPost.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{blogPost.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {blogPost.published_at && (
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(blogPost.published_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogManager
