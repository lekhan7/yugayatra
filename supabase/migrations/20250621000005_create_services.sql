-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    short_description text NOT NULL,
    icon_name text NOT NULL,
    icon_bg_color text NOT NULL DEFAULT 'from-blue-500 to-blue-600',
    features text[] DEFAULT '{}',
    technologies text[] DEFAULT '{}',
    apply_enabled boolean DEFAULT true,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    meta_title text,
    meta_description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public users can only read active services
CREATE POLICY "Public users can view active services"
    ON public.services
    FOR SELECT
    USING (is_active = true);

-- Admin users (role=admin in JWT metadata) have full CRUD access
CREATE POLICY "Admin users have full access to services"
    ON public.services
    FOR ALL
    USING (
        auth.jwt() ->> 'role' = 'admin'
    )
    WITH CHECK (
        auth.jwt() ->> 'role' = 'admin'
    );
