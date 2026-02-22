import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../services/supabase'
import toast from 'react-hot-toast'

export const useRealtimeData = (tableName, initialData = []) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: fetchedData, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      
      setData(fetchedData || [])
      setLastUpdate(new Date())
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err)
      setError(err.message)
      toast.error(`Failed to load ${tableName}`)
    } finally {
      setLoading(false)
    }
  }, [tableName])

  useEffect(() => {
    fetchData()

    // Set up real-time subscription
    const subscription = supabase
      .channel(`${tableName}-changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          console.log(`Real-time update for ${tableName}:`, payload)
          
          // Handle different event types
          switch (payload.eventType) {
            case 'INSERT':
              setData(prev => [payload.new, ...prev])
              toast.success(`New ${tableName.slice(0, -1)} added`)
              break
            case 'UPDATE':
              setData(prev => prev.map(item => 
                item.id === payload.new.id ? payload.new : item
              ))
              toast.success(`${tableName.slice(0, -1)} updated`)
              break
            case 'DELETE':
              setData(prev => prev.filter(item => item.id !== payload.old.id))
              toast.success(`${tableName.slice(0, -1)} deleted`)
              break
          }
          
          setLastUpdate(new Date())
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [tableName, fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch
  }
}

export const useRealtimeStats = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    totalTestimonials: 0,
    totalProjects: 0,
    totalAlumni: 0,
    monthlyGrowth: 0
  })
  const [loading, setLoading] = useState(true)

  const calculateStats = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [applicationsResult, testimonialsResult, projectsResult] = await Promise.all([
        supabase.from('internship_applications').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('projects').select('*')
      ])

      const applications = applicationsResult.data || []
      const testimonials = testimonialsResult.data || []
      const projects = projectsResult.data || []

      // Calculate application stats
      const pending = applications.filter(app => app.status === 'pending' || !app.status).length
      const accepted = applications.filter(app => app.status === 'accepted').length
      const rejected = applications.filter(app => app.status === 'rejected').length
      
      // Calculate monthly growth
      const now = new Date()
      const thisMonth = applications.filter(app => {
        const appDate = new Date(app.created_at)
        return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear()
      }).length
      
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1)
      const lastMonth = applications.filter(app => {
        const appDate = new Date(app.created_at)
        return appDate.getMonth() === lastMonthDate.getMonth() && appDate.getFullYear() === lastMonthDate.getFullYear()
      }).length
      
      const monthlyGrowth = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth * 100) : 0

      setStats({
        totalApplications: applications.length,
        pendingApplications: pending,
        acceptedApplications: accepted,
        rejectedApplications: rejected,
        totalTestimonials: testimonials.length,
        totalProjects: projects.length,
        totalAlumni: accepted,
        monthlyGrowth: parseFloat(monthlyGrowth.toFixed(1))
      })
    } catch (error) {
      console.error('Error calculating stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    calculateStats()

    // Set up real-time subscriptions for all tables
    const applicationsSubscription = supabase
      .channel('applications-stats')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'internship_applications' },
        () => calculateStats()
      )
      .subscribe()

    const testimonialsSubscription = supabase
      .channel('testimonials-stats')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'testimonials' },
        () => calculateStats()
      )
      .subscribe()

    const projectsSubscription = supabase
      .channel('projects-stats')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => calculateStats()
      )
      .subscribe()

    return () => {
      applicationsSubscription.unsubscribe()
      testimonialsSubscription.unsubscribe()
      projectsSubscription.unsubscribe()
    }
  }, [calculateStats])

  return { stats, loading, calculateStats }
}
