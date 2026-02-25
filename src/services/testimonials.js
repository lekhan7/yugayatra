import { supabase } from './supabase'



// Submit a new testimonial

export const submitTestimonial = async (testimonialData) => {

  try {

    const { data, error } = await supabase

      .from('testimonials')

      .insert([testimonialData])

      .select()

      .single()



    if (error) throw error

    return { success: true, data }

  } catch (error) {

    console.error('Error submitting testimonial:', error)

    return { success: false, error: error.message }

  }

}



// Get approved testimonials for public display

export const getApprovedTestimonials = async () => {

  try {

    const { data, error } = await supabase

      .from('testimonials')

      .select('*')

      .eq('status', 'accepted')

      .order('created_at', { ascending: false })



    if (error) {

      // If table doesn't exist or other error, return empty array

      if (error.code === 'PGRST116') {

        return { success: true, data: [] }

      }

      throw error

    }

    

    return { success: true, data: data || [] }

  } catch (error) {

    console.error('Error fetching approved testimonials:', error)

    return { success: false, error: error.message, data: [] }

  }

}



// Get all testimonials for admin (with status filtering)

export const getAllTestimonials = async (status = null) => {

  try {

    let query = supabase

      .from('testimonials')

      .select('*')

      .order('created_at', { ascending: false })



    if (status && status !== 'all') {

      query = query.eq('status', status)

    }



    const { data, error } = await query



    if (error) {

      // If table doesn't exist, return empty array

      if (error.code === 'PGRST116') {

        return { success: true, data: [] }

      }

      throw error

    }

    

    return { success: true, data: data || [] }

  } catch (error) {

    console.error('Error fetching testimonials:', error)

    return { success: false, error: error.message, data: [] }

  }

}



// Update testimonial status (approve/reject)

export const updateTestimonialStatus = async (id, status) => {

  try {

    const { data, error } = await supabase

      .from('testimonials')

      .update({ 

        status,

        updated_at: new Date().toISOString()

      })

      .eq('id', id)

      .select()

      .single()



    if (error) throw error

    return { success: true, data }

  } catch (error) {

    console.error('Error updating testimonial status:', error)

    return { success: false, error: error.message }

  }

}



// Delete testimonial

export const deleteTestimonial = async (id) => {

  try {

    const { error } = await supabase

      .from('testimonials')

      .delete()

      .eq('id', id)



    if (error) throw error

    return { success: true }

  } catch (error) {

    console.error('Error deleting testimonial:', error)

    return { success: false, error: error.message }

  }

}



// Subscribe to real-time testimonial updates for admin

export const subscribeToTestimonials = (callback) => {

  const subscription = supabase

    .channel('testimonials_changes')

    .on(

      'postgres_changes',

      {

        event: '*',

        schema: 'public',

        table: 'testimonials'

      },

      (payload) => callback(payload)

    )

    .subscribe()



  return () => supabase.removeChannel(subscription)

}

