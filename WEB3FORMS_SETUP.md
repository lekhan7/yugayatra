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
2. Sign up for a FREE account
3. Navigate to your dashboard
4. Copy your Access Key from the dashboard
5. Replace `your_actual_web3forms_access_key_here` with your actual access key

## Email Functionality

### When Accept Button is Clicked:
1. ✅ Application status is updated to 'accepted' in Supabase
2. ✅ Email is sent using Web3Forms FREE plan
3. ✅ Success toast message is shown

### When Reject Button is Clicked:
1. ✅ Application status is updated to 'rejected' in Supabase
2. ❌ NO email is sent (as requested)

## How It Works

### Web3Forms FREE Plan:
- `email` parameter: Sets recipient email address
- `access_key`: Your Web3Forms access key
- `subject`: Email subject line
- `from_name`: Sender name
- `message`: Email content (plain text)

### Email Delivery:
- Email is sent to the address specified in `email` field
- You receive the email at your registered Web3Forms account email
- Applicant receives the email directly

## Email Content
The email includes:
- Plain text format (compatible with FREE plan)
- Applicant's full name and applied role
- Congratulations message
- "Next Steps" section
- Company signature

## Error Handling
- If email sending fails, the application status is still updated
- Warning toast is shown for email failures
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

## Troubleshooting

### If emails aren't reaching applicants:
1. **Check Access Key**: Verify your access key is correct
2. **Check Console**: Look for error messages in browser console
3. **Check Spam**: Applicant should check spam/junk folders
4. **Verify Email**: Ensure applicant email address is correct

### Common Issues:
- **Invalid Access Key**: Double-check your Web3Forms access key
- **Rate Limiting**: Wait if you get 429 errors (too many requests)
- **Spam Filters**: Ask applicants to check spam folders
- **Wrong Email**: Verify the applicant's email address is correct

## Request Format
The implementation uses the following Web3Fields FREE plan compatible format:

```json
{
  "access_key": "your_access_key",
  "email": "applicant@example.com",
  "subject": "🎉 Internship Application Approved!",
  "from_name": "YugaYatra Retail (OPC) Pvt Ltd",
  "message": "Plain text email content..."
}
```

## Support
For issues with Web3Forms, visit their documentation at https://web3forms.com/docs/
