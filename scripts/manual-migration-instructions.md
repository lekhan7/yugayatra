# Manual Migration Instructions

## Project Requests Table Setup

Since automated migration failed, please run the following SQL manually in your Supabase dashboard:

### Step 1: Go to Supabase Dashboard
1. Navigate to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to the SQL Editor

### Step 2: Run the Migration SQL

Copy and execute the following SQL in the SQL Editor:

```sql
-- Create project_requests table
CREATE TABLE IF NOT EXISTS project_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_title TEXT NOT NULL,
    project_description TEXT NOT NULL,
    budget_range TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for inserts (public submissions)
CREATE POLICY "Anyone can insert project requests" ON project_requests
    FOR INSERT WITH CHECK (true);

-- Create policy for selects (admin only)
CREATE POLICY "Admins can view all project requests" ON project_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.email()
        )
    );

-- Create policy for updates (admin only)
CREATE POLICY "Admins can update project requests" ON project_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.email()
        )
    );

-- Create policy for deletes (admin only)
CREATE POLICY "Admins can delete project requests" ON project_requests
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admins 
            WHERE admins.email = auth.email()
        )
    );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_requests_updated_at 
    BEFORE UPDATE ON project_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Verify Table Creation

After running the SQL, verify the table was created by running:

```sql
SELECT * FROM project_requests LIMIT 1;
```

### Step 4: Test the System

1. Go to your website
2. Click "Start Your Project" button in the testimonials section
3. Fill out and submit the form
4. Check that the data appears in the project_requests table
5. Log in to admin panel and verify you can see the request under "Project Requests"

## EmailJS Template Setup

Don't forget to set up your EmailJS template with these variables:

### Template Variables:
- `{{name}}` - Client's full name
- `{{email}}` - Client's email
- `{{project_name}}` - Project title
- `{{project_description}}` - Project description
- `{{phone}}` - Client's phone number
- `{{budget_range}}` - Budget range
- `{{timeline}}` - Expected timeline

### Email Template Content:
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

## Troubleshooting

If you encounter issues:

1. **Table not created**: Make sure you're running the SQL with the correct permissions
2. **RLS policies failing**: Ensure the `admins` table exists and has your email
3. **Email not sending**: Check EmailJS configuration in your `.env` file
4. **Form not working**: Check browser console for JavaScript errors

## Complete System Flow

1. User clicks "Start Your Project" → Opens modal form
2. User submits form → Data saved to `project_requests` table
3. Admin sees request in admin panel under "Project Requests"
4. Admin clicks "Accept" → Status updated + Email sent to user
5. User receives approval email with project details
