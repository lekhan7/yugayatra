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
