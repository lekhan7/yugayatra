-- Add storage policies for certificates bucket
-- Allow authenticated users to upload to certificates bucket
CREATE POLICY "Authenticated users can upload certificates" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'certificates' 
    AND auth.role() = 'authenticated'
    AND (name LIKE 'generated/%' OR name LIKE 'qr/%')
  );

-- Allow authenticated users to update certificates in storage
CREATE POLICY "Authenticated users can update certificates" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'certificates' 
    AND auth.role() = 'authenticated'
    AND (name LIKE 'generated/%' OR name LIKE 'qr/%')
  );

-- Allow public access to read certificates
CREATE POLICY "Public can read certificates" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'certificates'
    AND (name LIKE 'generated/%' OR name LIKE 'qr/%')
  );

-- Allow authenticated users to delete certificates
CREATE POLICY "Authenticated users can delete certificates" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'certificates' 
    AND auth.role() = 'authenticated'
    AND (name LIKE 'generated/%' OR name LIKE 'qr/%')
  );
