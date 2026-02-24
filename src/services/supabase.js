import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions - Note: Contact forms now use Web3 Forms instead of Supabase

export const submitCareerApplication = async (formData) => {
  const { data, error } = await supabase
    .from('careers')
    .insert([formData])
  
  if (error) throw error
  return data
}

export const submitInternshipApplication = async (formData) => {
  const { data, error } = await supabase
    .from('internship_applications')
    .insert([formData])
 
  if (error) throw error
  return data
}

export const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getBlogBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const uploadFile = async (file, bucket, path) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)
  
  if (error) throw error
  return data
}

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

export const createSignedUrl = async (bucket, path, expiresIn = 60) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)
  
  if (error) throw error
  return data.signedUrl
}

export const uploadResume = async (file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = fileName // Only filename, no nested folder

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file)

  if (error) throw error

  // Generate public URL
  const { data: publicUrlData } = supabase
    .storage
    .from('resumes')
    .getPublicUrl(filePath)

  return {
    path: filePath,
    fileName: fileName,
    publicUrl: publicUrlData.publicUrl
  }
}

// Authentication functions
export const signInAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  
  // Check if user is admin
  const isAdmin = await checkAdminAccess(email)
  if (!isAdmin) {
    await signOutAdmin()
    throw new Error('Access denied. Admin privileges required.')
  }
  
  return data
}

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const checkAdminAccess = async (email) => {
  const { data, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', email)
    .maybeSingle()
  
  if (error) throw error
  return data !== null
}

// Verify current user is admin
export const verifyAdminAccess = async () => {
  try {
    const user = await getCurrentUser()
    if (!user || !user.email) {
      throw new Error('No authenticated user found')
    }
    
    const isAdmin = await checkAdminAccess(user.email)
    if (!isAdmin) {
      throw new Error('Admin access required')
    }
    
    return true
  } catch (error) {
    console.error('Admin verification failed:', error)
    throw error
  }
}

// Services functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

export const getServiceBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) throw error
  return data
}

// Admin services CRUD functions
export const getAllServices = async () => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

export const createService = async (serviceData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('services')
    .insert([serviceData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateService = async (id, serviceData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('services')
    .update(serviceData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteService = async (id) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}

export const toggleServiceActive = async (id, isActive) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('services')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Alumni functions
export const getAlumni = async () => {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

// Admin alumni CRUD functions
export const getAllAlumni = async () => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

export const createAlumni = async (alumniData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('alumni')
    .insert([alumniData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateAlumni = async (id, alumniData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('alumni')
    .update(alumniData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteAlumni = async (id) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('alumni')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}

export const toggleAlumniActive = async (id, isActive) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('alumni')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Blog functions
export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getBlogPostBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error) throw error
  return data
}

export const getFeaturedBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3)
  
  if (error) throw error
  return data
}

export const getBlogPostsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Admin blog CRUD functions
export const getAllBlogPosts = async () => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const createBlogPost = async (blogData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([blogData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateBlogPost = async (id, blogData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(blogData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteBlogPost = async (id) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}

export const toggleBlogPostActive = async (id, isActive) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const toggleBlogPostFeatured = async (id, isFeatured) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ is_featured: isFeatured })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Blog image upload functions
export const uploadBlogImage = async (file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = fileName

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file)

  if (error) throw error

  // Generate public URL
  const { data: publicUrlData } = supabase
    .storage
    .from('blog-images')
    .getPublicUrl(filePath)

  return {
    path: filePath,
    fileName: fileName,
    publicUrl: publicUrlData.publicUrl
  }
}

export const deleteBlogImage = async (filePath) => {
  const { data, error } = await supabase.storage
    .from('blog-images')
    .remove([filePath])

  if (error) throw error
  return data
}

// Team members functions
export const getTeamMembers = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

// Admin team CRUD functions
export const getAllTeamMembers = async () => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

export const createTeamMember = async (memberData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('team_members')
    .insert([memberData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateTeamMember = async (id, memberData) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('team_members')
    .update(memberData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteTeamMember = async (id) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}

export const toggleTeamMemberActive = async (id, isActive) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('team_members')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Project requests functions
export const submitProjectRequest = async (requestData) => {
  const { data, error } = await supabase
    .from('project_requests')
    .insert([requestData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getProjectRequests = async () => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('project_requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateProjectRequestStatus = async (id, status, adminNotes = null) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const updateData = { status }
  if (adminNotes !== null) {
    updateData.admin_notes = adminNotes
  }
  
  const { data, error } = await supabase
    .from('project_requests')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteProjectRequest = async (id) => {
  // Verify admin access first
  await verifyAdminAccess()
  
  const { data, error } = await supabase
    .from('project_requests')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return data
}
