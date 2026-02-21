-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    website_url text,
    icon_name text NOT NULL,
    color_gradient text NOT NULL DEFAULT 'from-blue-500 to-cyan-600',
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create project_features table
CREATE TABLE IF NOT EXISTS public.project_features (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    feature_text text NOT NULL,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create project_technologies table
CREATE TABLE IF NOT EXISTS public.project_technologies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    technology_name text NOT NULL,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON public.projects(is_active);
CREATE INDEX IF NOT EXISTS idx_project_features_project_id ON public.project_features(project_id);
CREATE INDEX IF NOT EXISTS idx_project_features_order ON public.project_features(display_order);
CREATE INDEX IF NOT EXISTS idx_project_technologies_project_id ON public.project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_order ON public.project_technologies(display_order);

-- Add updated_at trigger function (create if not exists)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger for projects table
CREATE TRIGGER handle_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects table
-- Public users can only read active projects
CREATE POLICY "Public users can view active projects"
    ON public.projects
    FOR SELECT
    USING (is_active = true);

-- Authenticated users have full access to projects
CREATE POLICY "Authenticated users have full access to projects"
    ON public.projects
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for project_features table
-- Public users can read features of active projects
CREATE POLICY "Public users can view features of active projects"
    ON public.project_features
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = project_features.project_id 
        AND projects.is_active = true
    ));

-- Authenticated users have full access to project_features
CREATE POLICY "Authenticated users have full access to project_features"
    ON public.project_features
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for project_technologies table
-- Public users can read technologies of active projects
CREATE POLICY "Public users can view technologies of active projects"
    ON public.project_technologies
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = project_technologies.project_id 
        AND projects.is_active = true
    ));


-- Authenticated users have full access to project_technologies
CREATE POLICY "Authenticated users have full access to project_technologies"
    ON public.project_technologies
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
