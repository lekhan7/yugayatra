# EmailJS Email Integration Setup

## Overview
This application now includes automatic email sending functionality for:
- Internship application approvals using EmailJS service
- Project request approvals using EmailJS service

## Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_EMAILJS_PUBLIC_KEY=ILkAUZ-VN8UndJpaz
VITE_EMAILJS_SERVICE_ID=service_wf6euii
VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID=template_internship_acceptance
VITE_EMAILJS_PROJECT_TEMPLATE_ID=template_project_acceptance
```

## How to Get EmailJS Credentials

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a FREE account
3. Create an Email Service with ID: `service_wf6euii`
4. Create Email Templates (see templates below)
5. Copy your Public Key from the dashboard
6. Replace the placeholder values in your `.env` file

## Email Functionality

### Internship Applications:
- **Accept Button**: Updates status to 'accepted' + sends email to applicant
- **Reject Button**: Updates status to 'rejected' (no email sent)

### Project Requests:
- **Accept Button**: Updates status to 'accepted' + sends email to client
- **Reject Button**: Updates status to 'rejected' (no email sent)

## How It Works

### EmailJS FREE Plan:
- `service_id`: Your EmailJS service ID
- `template_id`: Your EmailJS template ID  
- `public_key`: Your EmailJS public key
- `template_params`: Dynamic data for the template

### Email Delivery:
- Email is sent directly to the address specified in template parameters
- No CC fields or PRO features required
- Direct delivery to recipient's email address

## Email Template Setup

### Template 1: Internship Acceptance

**Template ID:** `template_internship_acceptance`

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

**Template Variables:**
- `{{fullName}}` - Applicant's full name
- `{{role}}` - Internship role
- `{{email}}` - Applicant's email (if needed in template)

### Template 2: Project Request Acceptance

**Template ID:** `template_project_acceptance`

**Subject:**
```
Great News! Your Project Request Has Been Approved
```

**Email Body:**
```
Hi {{name}},

We're thrilled to inform you that your project request "{{project_name}}" has been reviewed and approved!

Project Details:
- Title: {{project_name}}
- Description: {{project_description}}
- Budget Range: {{budget_range}}
- Timeline: {{timeline}}
- Contact: {{phone}}

Our team is excited to work with you on this project. We'll be in touch soon to discuss the next steps and schedule a consultation call.

Thank you for choosing YugaYatra for your project!

Best regards,
Team YugaYatra
```

**Template Variables:**
- `{{name}}` - Client's full name
- `{{email}}` - Client's email
- `{{project_name}}` - Project title
- `{{project_description}}` - Project description
- `{{phone}}` - Client's phone number
- `{{budget_range}}` - Budget range
- `{{timeline}}` - Expected timeline

## Template Parameter Mapping

### Internship Applications:
- `fullName` → `{{fullName}}` in template
- `role` → `{{role}}` in template  
- `email` → `{{email}}` in template
- `subject` → Email subject line
- **Template ID:** `VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID`

### Project Requests:
- `name` → `{{name}}` in template
- `email` → `{{email}}` in template
- `project_name` → `{{project_name}}` in template
- `project_description` → `{{project_description}}` in template
- `phone` → `{{phone}}` in template
- `budget_range` → `{{budget_range}}` in template
- `timeline` → `{{timeline}}` in template
- `subject` → Email subject line
- **Template ID:** `VITE_EMAILJS_PROJECT_TEMPLATE_ID`

## Error Handling
- If email sending fails, application/request status is still updated
- Warning toast is shown for email failures
- Detailed error logging for debugging

## Security
- Public key is stored in environment variable (not exposed in code)
- No sensitive information is logged to console
- Proper error handling prevents data leakage

## Testing
To test the functionality:
1. Ensure you have valid EmailJS credentials
2. Create a test application/project request
3. Click "Accept" button
4. Check browser console for logs
5. Verify email is received by recipient

## Troubleshooting

### If emails show variable names instead of actual values:
1. **Check Template Variables**: Ensure your EmailJS template uses `{{variableName}}` not `${variableName}`
2. **Verify Parameter Names**: The code sends specific parameter names, template should use matching `{{parameterName}}`
3. **Check Template Setup**: Follow the "Email Template Setup" section above exactly
4. **Test Parameters**: Check browser console for parameter logs

### If emails aren't reaching recipients:
1. **Check Credentials**: Verify your EmailJS service ID, template ID, and public key
2. **Check Console**: Look for error messages in browser console
3. **Check Spam**: Recipients should check spam/junk folders
4. **Verify Email**: Ensure recipient's email address is correct

### Common Issues:
- **Invalid Credentials**: Double-check your EmailJS setup
- **Template Not Found**: Ensure template ID is correct
- **Variable Mismatch**: Template variables must match parameter names exactly
- **Rate Limiting**: EmailJS has generous free tier limits
- **Spam Filters**: Ask recipients to check spam folders

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
