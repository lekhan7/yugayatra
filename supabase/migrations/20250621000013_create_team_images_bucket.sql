-- Create team-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'team-images', 
    'team-images', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- RLS Policies for team-images bucket
-- Note: storage.objects table should already have RLS enabled by default in Supabase

-- Public read access for team images
CREATE POLICY "Public read access for team images" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'team-images'
    );

-- Admin insert access for team images
CREATE POLICY "Admin insert access for team images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'team-images' AND
        (
            -- Supabase auth check for admin users
            auth.role() = 'authenticated' AND
            auth.email() = 'admin@gmail.com'
        )
    );

-- Admin update access for team images
CREATE POLICY "Admin update access for team images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'team-images' AND
        (
            -- Supabase auth check for admin users
            auth.role() = 'authenticated' AND
            auth.email() = 'admin@gmail.com'
        )
    );

-- Admin delete access for team images
CREATE POLICY "Admin delete access for team images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'team-images' AND
        (
            -- Supabase auth check for admin users
            auth.role() = 'authenticated' AND
            auth.email() = 'admin@gmail.com'
        )
    );
