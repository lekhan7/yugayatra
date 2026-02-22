-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'YugaYatra Team',
  category TEXT NOT NULL DEFAULT 'General',
  featured_image TEXT,
  read_time INTEGER DEFAULT 5, -- in minutes
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_is_active ON blog_posts(is_active);
CREATE INDEX idx_blog_posts_is_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_display_order ON blog_posts(display_order);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for different operations

-- Public read access for active blog posts
CREATE POLICY "Public can view active blog posts" ON blog_posts
  FOR SELECT USING (is_active = true);

-- Admin full access for all operations
CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.email()
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create trigger for auto-setting published_at when post becomes active
CREATE OR REPLACE FUNCTION handle_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Set published_at when post becomes active and published_at is not set
  IF NEW.is_active = true AND OLD.is_active = false AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_blog_posts_published_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_published_at();

-- Insert sample data
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, read_time, tags, is_active) VALUES
(
  'Future of E-commerce: Trends and Predictions',
  'future-of-ecommerce-trends-predictions',
  'Explore the latest trends shaping the future of online retail, from AI-powered personalization to sustainable shopping practices.',
  'The e-commerce landscape is rapidly evolving with new technologies and changing consumer behaviors. In this comprehensive guide, we explore the key trends that will define the future of online retail, including AI-powered personalization, augmented reality shopping experiences, sustainable commerce practices, and the rise of social commerce. Learn how these trends will impact businesses and consumers alike.',
  'YugaYatra Retail (OPC) Pvt Ltd Team',
  'Digital Marketing',
  5,
  ARRAY['E-commerce', 'Digital Trends', 'Retail', 'Technology'],
  true
),
(
  'Digital Marketing Strategies for 2024',
  'digital-marketing-strategies-2024',
  'Discover the most effective digital marketing strategies that will help your business thrive in the competitive online landscape.',
  'As we navigate through 2024, digital marketing continues to evolve with new platforms, technologies, and consumer expectations. This article covers the essential strategies every business should implement, including content marketing, social media engagement, SEO optimization, email marketing automation, and data-driven decision making. Stay ahead of the competition with these proven approaches.',
  'Marketing Team',
  'Digital Marketing',
  7,
  ARRAY['Marketing', 'Strategy', 'SEO', 'Social Media'],
  true
),
(
  'Building Strong Brand Presence Online',
  'building-strong-brand-presence-online',
  'Learn how to establish and maintain a powerful brand presence that resonates with your target audience and drives business growth.',
  'In today''s digital world, building a strong brand presence is crucial for business success. This comprehensive guide covers everything from brand identity and positioning to online reputation management and customer engagement strategies. Discover how to create a consistent brand voice, leverage visual branding, and build meaningful connections with your audience across digital platforms.',
  'Brand Strategy Team',
  'Branding',
  6,
  ARRAY['Branding', 'Strategy', 'Marketing', 'Identity'],
  true
);
