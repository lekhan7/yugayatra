import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Save, Eye, Edit2, FileText, Home, Info, Mail, Phone } from 'lucide-react'

const ContentManager = () => {
  const [content, setContent] = useState({})
  const [editingSection, setEditingSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'contact', label: 'Contact Section', icon: Mail },
    { id: 'footer', label: 'Footer', icon: Phone }
  ]

  const defaultContent = {
    hero: {
      title: 'Welcome to YugYatra',
      subtitle: 'Your journey to excellence starts here',
      description: 'We provide amazing opportunities for growth and learning',
      buttonText: 'Get Started'
    },
    about: {
      title: 'About Us',
      content: 'We are a leading organization dedicated to empowering individuals through quality education and practical experience.',
      mission: 'Our mission is to bridge the gap between academic knowledge and industry requirements.',
      vision: 'To create a world where every individual has access to quality learning opportunities.'
    },
    contact: {
      title: 'Contact Us',
      email: 'info@yugyatra.com',
      phone: '+91 1234567890',
      address: '123 Main Street, City, State 12345',
      description: 'Get in touch with us for any inquiries or support.'
    },
    footer: {
      copyright: '© 2024 YugYatra. All rights reserved.',
      socialLinks: {
        facebook: 'https://facebook.com/yugyatra',
        twitter: 'https://twitter.com/yugyatra',
        linkedin: 'https://linkedin.com/company/yugyatra'
      }
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data && data.length > 0) {
        const contentMap = {}
        data.forEach(item => {
          contentMap[item.section] = item.content
        })
        setContent({ ...defaultContent, ...contentMap })
      } else {
        setContent(defaultContent)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (section) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          section,
          content: content[section],
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'section'
        })

      if (error) throw error
      
      setEditingSection(null)
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateNestedContent = (section, nestedField, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value
        }
      }
    }))
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage website content across all sections</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon
          const isEditing = editingSection === section.id
          
          return (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="text-accent-main" size={24} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.label}
                    </h2>
                  </div>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveContent(section.id)}
                          disabled={saving}
                          className="flex items-center space-x-2 px-4 py-2 bg-accent-dark text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          <Save size={16} />
                          <span>{saving ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={() => setEditingSection(null)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingSection(section.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-accent-main text-white rounded-lg hover:bg-accent-dark"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {section.id === 'hero' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hero Title
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.hero?.title || ''}
                          onChange={(e) => updateContent('hero', 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.hero?.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hero Subtitle
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.hero?.subtitle || ''}
                          onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.hero?.subtitle}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hero Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={content.hero?.description || ''}
                          onChange={(e) => updateContent('hero', 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.hero?.description}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Text
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.hero?.buttonText || ''}
                          onChange={(e) => updateContent('hero', 'buttonText', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.hero?.buttonText}</p>
                      )}
                    </div>
                  </div>
                )}

                {section.id === 'about' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        About Title
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.about?.title || ''}
                          onChange={(e) => updateContent('about', 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.about?.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        About Content
                      </label>
                      {isEditing ? (
                        <textarea
                          value={content.about?.content || ''}
                          onChange={(e) => updateContent('about', 'content', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.about?.content}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mission
                      </label>
                      {isEditing ? (
                        <textarea
                          value={content.about?.mission || ''}
                          onChange={(e) => updateContent('about', 'mission', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.about?.mission}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vision
                      </label>
                      {isEditing ? (
                        <textarea
                          value={content.about?.vision || ''}
                          onChange={(e) => updateContent('about', 'vision', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.about?.vision}</p>
                      )}
                    </div>
                  </div>
                )}

                {section.id === 'contact' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Title
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.contact?.title || ''}
                          onChange={(e) => updateContent('contact', 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.contact?.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={content.contact?.email || ''}
                          onChange={(e) => updateContent('contact', 'email', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.contact?.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={content.contact?.phone || ''}
                          onChange={(e) => updateContent('contact', 'phone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.contact?.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.contact?.address || ''}
                          onChange={(e) => updateContent('contact', 'address', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.contact?.address}</p>
                      )}
                    </div>
                  </div>
                )}

                {section.id === 'footer' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Copyright Text
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={content.footer?.copyright || ''}
                          onChange={(e) => updateContent('footer', 'copyright', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.footer?.copyright}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Facebook URL
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={content.footer?.socialLinks?.facebook || ''}
                          onChange={(e) => updateNestedContent('footer', 'socialLinks', 'facebook', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.footer?.socialLinks?.facebook}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Twitter URL
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={content.footer?.socialLinks?.twitter || ''}
                          onChange={(e) => updateNestedContent('footer', 'socialLinks', 'twitter', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.footer?.socialLinks?.twitter}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn URL
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={content.footer?.socialLinks?.linkedin || ''}
                          onChange={(e) => updateNestedContent('footer', 'socialLinks', 'linkedin', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{content.footer?.socialLinks?.linkedin}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContentManager
