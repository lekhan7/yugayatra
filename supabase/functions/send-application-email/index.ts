import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  fullName: string
  role: string
  status: 'accepted' | 'rejected'
  companyName?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, fullName, role, status, companyName = "YugYatra" }: EmailRequest = await req.json()

    if (!to || !fullName || !role || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Resend with API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const resend = new Resend(resendApiKey)

    // Prepare email content based on status
    const emailContent = status === 'accepted' 
      ? {
          subject: 'Internship Application Approved 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #10b981; margin-bottom: 20px;">Congratulations!</h2>
              
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>We are pleased to inform you that your application for the <strong>${role}</strong> internship has been <span style="color: #10b981; font-weight: bold;">accepted</span>.</p>
              
              <p>Our team was impressed with your skills and motivation. We will contact you shortly with the next steps.</p>
              
              <p style="margin-top: 30px;"><strong>Welcome aboard!</strong></p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p>Best regards,<br>
                <strong>${companyName}</strong> Team</p>
              </div>
            </div>
          `
        }
      : {
          subject: 'Internship Application Update',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #6b7280; margin-bottom: 20px;">Application Update</h2>
              
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>Thank you for applying for the <strong>${role}</strong> internship position.</p>
              
              <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
              
              <p>We truly appreciate your interest and encourage you to apply again in the future.</p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p>Best wishes,<br>
                <strong>${companyName}</strong> Team</p>
              </div>
            </div>
          `
        }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'noreply@yugyatra.com', // Update this with your verified domain
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Email sent successfully:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-application-email function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
