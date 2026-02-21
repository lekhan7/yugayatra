# EmailJS Email Integration Setup

## Overview
This application now includes automatic email sending functionality when an admin accepts an internship application using EmailJS service.

## Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_EMAILJS_PUBLIC_KEY=ILkAUZ-VN8UndJpaz
VITE_EMAILJS_SERVICE_ID=template_dbhoswn
VITE_EMAILJS_TEMPLATE_ID=service_wf6euii
```

## How to Get EmailJS Credentials

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a FREE account
3. Create an Email Service with ID: `template_dbhoswn`
4. Create an Email Template with ID: `service_wf6euii`
5. Copy your Public Key from the dashboard
6. Replace the placeholder values in your `.env` file

## Email Functionality

### When Accept Button is Clicked:
1. ✅ Application status is updated to 'accepted' in Supabase
2. ✅ Email is sent using EmailJS FREE plan directly to applicant
3. ✅ Success toast message is shown

### When Reject Button is Clicked:
1. ✅ Application status is updated to 'rejected' in Supabase
2. ❌ NO email is sent (as requested)

## How It Works

### EmailJS FREE Plan:
- `service_id`: Your EmailJS service ID
- `template_id`: Your EmailJS template ID  
- `public_key`: Your EmailJS public key
- `template_params`: Dynamic data for the template

### Email Delivery:
- Email is sent directly to the address specified in template parameters
- No CC fields or PRO features required
- Direct delivery to applicant's email address

## Email Content
The email includes:
- Professional formatting with emojis
- Applicant's full name and applied role
- Congratulations message with impressive formatting
- "Next Steps" section with clear instructions
- Company branding and signature
- Email appears in TWO sections within message content

## Error Handling
- If email sending fails, application status is still updated
- Warning toast is shown for email failures
- Detailed error logging for debugging

## Security
- Public key is stored in environment variable (not exposed in code)
- No sensitive information is logged to console
- Proper error handling prevents data leakage

## Testing
To test the functionality:
1. Ensure you have valid EmailJS credentials
2. Create a test application or use existing one
3. Click "Accept" button
4. Check browser console for logs
5. Verify email is received by applicant

## Troubleshooting

### If emails aren't reaching applicants:
1. **Check Credentials**: Verify your EmailJS service ID, template ID, and public key
2. **Check Console**: Look for error messages in browser console
3. **Check Spam**: Applicant should check spam/junk folders
4. **Verify Email**: Ensure applicant's email address is correct

### Common Issues:
- **Invalid Credentials**: Double-check your EmailJS setup
- **Template Not Found**: Ensure template ID is correct
- **Rate Limiting**: EmailJS has generous free tier limits
- **Spam Filters**: Ask applicants to check spam folders

## Request Format
The implementation uses the following EmailJS API format:

```javascript
emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  TEMPLATE_PARAMS,
  PUBLIC_KEY
)
```

## Support
For issues with EmailJS, visit their documentation at https://www.emailjs.com/docs/
