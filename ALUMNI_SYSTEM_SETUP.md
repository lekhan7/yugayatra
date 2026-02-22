# Alumni Management System Setup Guide

This document provides step-by-step instructions to set up the Alumni Management System for YugaYatra.

## Overview

The Alumni Management System allows you to:
- Control alumni data from the admin portal
- Add, edit, and delete alumni profiles
- Upload alumni photos
- Manage skills, achievements, and social media links
- Display alumni dynamically on the website

## Database Setup

### Step 1: Run the SQL Script

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `scripts/setup-alumni-database.sql`
4. Click **Run** to execute the script

This will create:
- `alumni` table with all necessary fields
- `alumni-images` storage bucket
- Row Level Security (RLS) policies
- Sample alumni data for testing

### Step 2: Verify Setup

After running the script, you should see:
- A new `alumni` table in your database
- A new `alumni-images` bucket in Storage
- Sample alumni records in the table

## Frontend Integration

### Files Created/Modified

#### New Files:
- `src/components/admin/AlumniManager.jsx` - Admin interface for managing alumni
- `src/components/test/AlumniTest.jsx` - Test component for API verification
- `scripts/setup-alumni-database.sql` - Database setup script

#### Modified Files:
- `src/services/supabase.js` - Added alumni CRUD functions
- `src/components/sections/AlumniSection.jsx` - Updated to use dynamic data
- `src/context/ContentContext.jsx` - Updated to use database functions

### Step 3: Add AlumniManager to Admin Panel

To add the Alumni Manager to your admin panel, import it in your admin routes:

```jsx
import AlumniManager from '../components/admin/AlumniManager'

// Add to your admin routing
<Route path="/admin/alumni" element={<AlumniManager />} />
```

### Step 4: Test the Implementation

1. Start your development server
2. Navigate to the admin panel
3. Go to the alumni management page
4. Try adding, editing, and deleting alumni records
5. Check the main website to see alumni displayed dynamically

## Features

### Admin Panel Features
- **Full CRUD Operations**: Create, read, update, delete alumni
- **Image Upload**: Upload and manage alumni photos
- **Dynamic Fields**: Add/remove skills and achievements
- **Social Media Links**: Manage LinkedIn and GitHub profiles
- **Status Control**: Activate/deactivate alumni profiles
- **Display Order**: Control the order of alumni display

### Frontend Features
- **Dynamic Loading**: Alumni data fetched from database
- **Loading States**: Proper loading and error handling
- **Fallback Images**: Default avatars when no image is uploaded
- **Responsive Design**: Works on all screen sizes
- **Social Links**: Clickable LinkedIn and GitHub links

## Database Schema

### Alumni Table Structure

```sql
CREATE TABLE alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT,
  batch TEXT NOT NULL,
  quote TEXT,
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  linkedin TEXT,
  github TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Bucket

- **Name**: `alumni-images`
- **Public**: Yes
- **File Size Limit**: 5MB
- **Allowed Types**: JPEG, PNG, WebP, GIF

## API Functions

### Public Functions
- `getAlumni()` - Fetch all active alumni

### Admin Functions
- `getAllAlumni()` - Fetch all alumni (including inactive)
- `createAlumni(data)` - Create new alumni record
- `updateAlumni(id, data)` - Update existing alumni
- `deleteAlumni(id)` - Delete alumni record
- `toggleAlumniActive(id, isActive)` - Activate/deactivate alumni

## Security

### Row Level Security (RLS)

The system implements RLS policies to ensure:
- **Public Access**: Anyone can view active alumni
- **Admin Access**: Only authenticated admins can manage alumni
- **Image Access**: Public can view images, authenticated users can upload

### Admin Verification

All admin functions verify the user is an admin by checking the `admins` table.

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify Supabase URL and keys in `.env`
   - Check network connectivity

2. **Permission Errors**
   - Ensure RLS policies are correctly set up
   - Verify admin user exists in `admins` table

3. **Image Upload Issues**
   - Check storage bucket permissions
   - Verify file size and type limits

4. **Empty Alumni List**
   - Check if alumni records have `is_active = true`
   - Verify database connection

### Testing

Use the `AlumniTest` component to verify API connectivity:
```jsx
import AlumniTest from './components/test/AlumniTest'
<AlumniTest />
```

## Next Steps

1. **Run the database setup script**
2. **Add AlumniManager to admin routes**
3. **Test the functionality**
4. **Customize the UI/UX as needed**
5. **Add any additional fields required**

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify database setup in Supabase dashboard
3. Test with the AlumniTest component
4. Review the implementation files for any customizations needed
