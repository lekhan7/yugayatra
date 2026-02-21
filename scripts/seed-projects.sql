-- Seed projects data
-- This will populate the projects tables with the initial data from the hardcoded ProjectsSection

-- Insert projects
INSERT INTO public.projects (name, category, description, website_url, icon_name, color_gradient, display_order, is_active) VALUES
('GateBell.in', 'IoT, Web App', 'A smart visitor management system designed to streamline office operations by automating guest check-ins, enhancing security, and providing real-time analytics for office administrators.', 'https://gatebell.in', 'Bell', 'from-blue-500 to-cyan-600', 0, true),
('SchoolDekho.in', 'EdTech, Location-based', 'A comprehensive platform for parents and students to find and compare schools nearby based on location, ratings, facilities, and educational offerings, making the school selection process easier and more informed.', 'https://schooldekho.in', 'School', 'from-green-500 to-emerald-600', 1, true),
('FoodCaravan.in', 'FoodTech, Web App', 'An online food delivery platform that connects local customers with nearby restaurants, offering a seamless ordering experience with real-time tracking and personalized recommendations.', 'https://foodcaravan.in', 'Utensils', 'from-orange-500 to-red-600', 2, true),
('SatyaPandey.com', 'Portfolio, Blog', 'A personal portfolio and blog for Satya Pandey, showcasing professional achievements, projects, and thought leadership articles on technology, design, and innovation.', 'https://satyapandey.com', 'User', 'from-purple-500 to-pink-600', 3, true),
('MyPressWala.in', 'Media, SaaS', 'A SaaS platform for businesses to distribute press releases and news updates, providing tools for creating, scheduling, and analyzing the reach of media content across multiple channels.', 'https://mypresswala.in', 'Newspaper', 'from-indigo-500 to-blue-600', 4, true),
('12thFailJobs.com', 'Job Portal, EdTech', 'A job portal dedicated to freshers and students with a 12th pass qualification, offering access to entry-level job opportunities, career guidance, and resume-building tools.', 'https://12thfailjobs.com', 'Briefcase', 'from-teal-500 to-cyan-600', 5, true),
('TheBrightLearn.in', 'EdTech, LMS', 'An online learning management system (LMS) for students and professionals, offering courses, quizzes, and progress tracking to support continuous learning and skill development.', 'https://thebrightlearn.in', 'BookOpen', 'from-yellow-500 to-orange-600', 6, true),
('MyDivorce.in', 'LegalTech, Consultation', 'A comprehensive online platform providing legal assistance and guidance for divorce proceedings, offering expert consultation, document preparation, and step-by-step support throughout the legal process.', 'https://mydivorce.in', 'Scale', 'from-slate-500 to-gray-600', 7, true)
ON CONFLICT (id) DO NOTHING;

-- Get the project IDs for inserting features and technologies
-- Note: In a real scenario, you'd want to get these IDs dynamically, but for seeding we can use a subquery

-- Insert features for GateBell.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Automated visitor registration and check-in process', 0 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Real-time notifications for office staff', 1 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Integration with IoT-enabled doorbells', 2 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Detailed visitor logs and analytics dashboard', 3 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for GateBell.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'React', 0 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Node.js', 1 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'MQTT', 2 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'AWS IoT', 3 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'MongoDB', 4 FROM public.projects WHERE name = 'GateBell.in'
ON CONFLICT (id) DO NOTHING;

-- Insert features for SchoolDekho.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Location-based school search with interactive map', 0 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Detailed school profiles with photos and virtual tours', 1 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Parent reviews and ratings system', 2 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'School comparison tool for informed decision making', 3 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for SchoolDekho.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'React', 0 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Express', 1 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'MongoDB', 2 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Google Maps API', 3 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Cloudinary', 4 FROM public.projects WHERE name = 'SchoolDekho.in'
ON CONFLICT (id) DO NOTHING;

-- Insert features for FoodCaravan.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'User-friendly interface for browsing menus', 0 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Real-time order tracking with GPS', 1 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Personalized restaurant and dish recommendations', 2 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Secure payment gateway integration', 3 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for FoodCaravan.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Next.js', 0 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Express', 1 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'PostgreSQL', 2 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Firebase', 3 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Stripe', 4 FROM public.projects WHERE name = 'FoodCaravan.in'
ON CONFLICT (id) DO NOTHING;

-- Insert features for SatyaPandey.com
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Responsive portfolio showcasing projects', 0 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Blog section with rich text formatting', 1 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'SEO optimization for better visibility', 2 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Contact form for inquiries', 3 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for SatyaPandey.com
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Gatsby', 0 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'GraphQL', 1 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Tailwind CSS', 2 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Contentful', 3 FROM public.projects WHERE name = 'SatyaPandey.com'
ON CONFLICT (id) DO NOTHING;

-- Insert features for MyPressWala.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Press release creation with templates', 0 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Distribution to major news outlets', 1 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Analytics for tracking media reach', 2 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Scheduling and automated publishing', 3 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for MyPressWala.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Vue.js', 0 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Laravel', 1 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'MySQL', 2 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Google Analytics API', 3 FROM public.projects WHERE name = 'MyPressWala.in'
ON CONFLICT (id) DO NOTHING;

-- Insert features for 12thFailJobs.com
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Job listings tailored for 12th pass candidates', 0 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Resume builder with templates', 1 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Career advice and interview preparation resources', 2 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Employer dashboard for posting jobs', 3 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for 12thFailJobs.com
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Angular', 0 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Django', 1 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'SQLite', 2 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'AWS S3', 3 FROM public.projects WHERE name = '12thFailJobs.com'
ON CONFLICT (id) DO NOTHING;

-- Insert features for TheBrightLearn.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Interactive courses with video and text content', 0 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Quizzes and assessments for knowledge checks', 1 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Progress tracking and certificates of completion', 2 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Discussion forums for peer interaction', 3 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for TheBrightLearn.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'React', 0 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Ruby on Rails', 1 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'PostgreSQL', 2 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'AWS CloudFront', 3 FROM public.projects WHERE name = 'TheBrightLearn.in'
ON CONFLICT (id) DO NOTHING;

-- Insert features for MyDivorce.in
INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Expert legal consultation and guidance', 0 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Document preparation and filing assistance', 1 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Step-by-step divorce process guidance', 2 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_features (project_id, feature_text, display_order)
SELECT id, 'Confidential and secure case management', 3 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

-- Insert technologies for MyDivorce.in
INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'React', 0 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Node.js', 1 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'MongoDB', 2 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'Stripe', 3 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.project_technologies (project_id, technology_name, display_order)
SELECT id, 'AWS', 4 FROM public.projects WHERE name = 'MyDivorce.in'
ON CONFLICT (id) DO NOTHING;
