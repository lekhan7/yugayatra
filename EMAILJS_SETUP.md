# EmailJS Email Integration Setup

## Overview
This application now includes automatic email sending functionality when an admin accepts an internship application using EmailJS service.

## Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_EMAILJS_PUBLIC_KEY=ILkAUZ-VN8UndJpaz
VITE_EMAILJS_SERVICE_ID=service_wf6euii
VITE_EMAILJS_TEMPLATE_ID=template_dbhoswn
```

## How to Get EmailJS Credentials

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a FREE account
3. Create an Email Service with ID: `service_wf6euii`
4. Create an Email Template with ID: `template_dbhoswn`
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

## Email Template Setup

### EmailJS Template Content:
Create an EmailJS template with the following content and variables:

**Subject:**
```
Congratulations! Your Internship Application Has Been Approved
```

**Email Body:**
```
Hi {{fullName}},

We're excited to inform you that your application for the {{role}} Internship has been successfully reviewed and approved.

Best regards,
Team YugaYatra
```

**Important Template Variables:**
- `{{fullName}}` - Will be replaced with applicant's full name
- `{{role}}` - Will be replaced with the internship role
- `{{email}}` - Will be replaced with applicant's email (if needed in template)

### Template Variable Mapping:
The code sends these parameters to EmailJS:
- `fullName` → `{{fullName}}` in template
- `role` → `{{role}}` in template  
- `email` → `{{email}}` in template
- `subject` → Email subject line

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

### If emails show `${fullName}` instead of actual name:
1. **Check Template Variables**: Ensure your EmailJS template uses `{{fullName}}` not `${fullName}`
2. **Verify Parameter Names**: The code sends `fullName` parameter, template should use `{{fullName}}`
3. **Check Template Setup**: Follow the "Email Template Setup" section above exactly
4. **Test Parameters**: Check browser console for "🧪 Testing email parameters" logs

### If emails aren't reaching applicants:
1. **Check Credentials**: Verify your EmailJS service ID, template ID, and public key
2. **Check Console**: Look for error messages in browser console
3. **Check Spam**: Applicant should check spam/junk folders
4. **Verify Email**: Ensure applicant's email address is correct

### Common Issues:
- **Invalid Credentials**: Double-check your EmailJS setup
- **Template Not Found**: Ensure template ID is correct
- **Variable Mismatch**: Template variables must match parameter names exactly
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
