# Web3Forms Email Integration Setup

## Overview
This application now includes automatic email sending functionality when an admin accepts an internship application using Web3Forms API.

## Environment Variables
Add the following environment variable to your `.env` file:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_actual_web3forms_access_key_here
```

## How to Get Web3Forms Access Key

1. Go to [Web3Forms](https://web3forms.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your Access Key from the dashboard
5. Replace `your_actual_web3forms_access_key_here` with your actual access key

## Email Functionality

### When Accept Button is Clicked:
1. ✅ Application status is updated to 'accepted' in Supabase
2. ✅ Professional HTML email is sent to the applicant
3. ✅ Success toast message is shown

### When Reject Button is Clicked:
1. ✅ Application status is updated to 'rejected' in Supabase
2. ❌ NO email is sent (as requested)

## Email Content
The email includes:
- Professional HTML formatting
- Applicant's full name and applied role
- Congratulations message
- "What's Next" section with next steps
- Company branding and signature

## Error Handling
- If email sending fails, the application status is still updated
- Warning toast is shown: "Application Accepted but Email Failed"
- Detailed error logging for debugging

## Security
- Access key is stored in environment variable (not exposed in code)
- No sensitive information is logged to console
- Proper error handling prevents data leakage

## Testing
To test the functionality:
1. Ensure you have a valid Web3Forms access key
2. Create a test application or use existing one
3. Click "Accept" button
4. Check browser console for logs
5. Verify email is received by applicant

## Support
For issues with Web3Forms, visit their documentation at https://web3forms.com/docs/
