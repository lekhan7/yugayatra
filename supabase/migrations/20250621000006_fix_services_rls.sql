-- Fix RLS policies for services table
-- Drop existing policies and recreate with proper admin access

-- Drop existing policies
DROP POLICY IF EXISTS "Public users can view active services" ON public.services;
DROP POLICY IF EXISTS "Admin users have full access to services" ON public.services;

-- Create improved RLS policies
-- Public users can only read active services
CREATE POLICY "Public users can view active services"
    ON public.services
    FOR SELECT
    USING (is_active = true);

-- Admin users have full access - check against admins table instead of JWT metadata
CREATE POLICY "Admin users have full access to services"
    ON public.services
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.admins 
            WHERE admins.email = auth.email()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admins 
            WHERE admins.email = auth.email()
        )
    );

-- Alternative: Allow any authenticated user to manage services (less secure but simpler)
-- Uncomment the following lines if the above doesn't work and you want to allow any authenticated user

/*
DROP POLICY IF EXISTS "Admin users have full access to services" ON public.services;

CREATE POLICY "Authenticated users have full access to services"
    ON public.services
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
*/
