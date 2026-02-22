-- Create alumni-images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'alumni-images', 
  'alumni-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create policies for alumni-images bucket
-- Allow public read access to all images
CREATE POLICY "Public can view alumni images" ON storage.objects
  FOR SELECT USING (bucket_id = 'alumni-images');

-- Allow authenticated users to upload alumni images
CREATE POLICY "Authenticated users can upload alumni images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'alumni-images' AND 
    auth.role() = 'authenticated'
  );

-- Allow authenticated users to update their own alumni images
CREATE POLICY "Authenticated users can update alumni images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'alumni-images' AND 
    auth.role() = 'authenticated'
  );

-- Allow admins to delete alumni images
CREATE POLICY "Admins can delete alumni images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'alumni-images' AND
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );
