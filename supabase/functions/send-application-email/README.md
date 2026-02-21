# Send Application Email Function

This Supabase Edge Function sends email notifications to internship applicants when their application status is updated.

## Setup Instructions

### 1. Install Resend Dependency

The function uses Resend for email sending. First, create a Resend account at https://resend.com

### 2. Set Environment Variables

In your Supabase project dashboard, go to Settings > Edge Functions and add these environment variables:

```
RESEND_API_KEY=your_resend_api_key_here
```

### 3. Verify Your Domain

In Resend dashboard, add and verify your sending domain (e.g., yugyatra.com). Update the `from` field in `index.ts` to use your verified domain.

### 4. Deploy the Function

```bash
supabase functions deploy send-application-email
```

## Email Templates

The function includes two email templates:

### Acceptance Email
- Subject: "Internship Application Approved 🎉"
- Professional congratulatory message
- Includes applicant name and role

### Rejection Email  
- Subject: "Internship Application Update"
- Professional rejection message
- Encourages future applications

## Usage

The function is called automatically when an admin accepts or rejects an application in the admin panel.

## Error Handling

- Email failures don't prevent status updates
- Errors are logged for debugging
- Graceful degradation if email service is unavailable

## Security

- Uses Supabase authentication
- API keys stored securely in environment
- CORS headers configured for web access
