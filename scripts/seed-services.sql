-- Seed data for services table
-- Run this script after creating the services table to populate it with initial data

INSERT INTO public.services (
    title, 
    slug, 
    short_description, 
    icon_name, 
    icon_bg_color, 
    features, 
    technologies, 
    apply_enabled, 
    display_order, 
    is_active,
    meta_title,
    meta_description
) VALUES 
(
    'Full-Stack Development',
    'full-stack-development',
    'End-to-end web and mobile application development with cutting-edge technologies.',
    'Code',
    'from-blue-500 to-blue-600',
    ARRAY[
        'React, Vue.js, Angular development',
        'Node.js, Python, Java backend',
        'RESTful APIs and GraphQL',
        'Database design and optimization',
        'Cloud deployment and DevOps'
    ],
    ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    true,
    1,
    true,
    'Full-Stack Development Services | Professional Web & Mobile Apps',
    'Professional full-stack development services covering frontend, backend, APIs, and deployment using modern technologies.'
),
(
    'UI/UX Design',
    'ui-ux-design',
    'Beautiful, intuitive designs that captivate users and drive engagement.',
    'Palette',
    'from-purple-500 to-purple-600',
    ARRAY[
        'User research and analysis',
        'Wireframing and prototyping',
        'Visual design and branding',
        'Responsive design',
        'Design systems and components'
    ],
    ARRAY['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer'],
    true,
    2,
    true,
    'UI/UX Design Services | User-Centered Design Solutions',
    'Expert UI/UX design services creating beautiful, intuitive interfaces that engage users and drive business results.'
),
(
    'Digital Marketing',
    'digital-marketing',
    'Strategic marketing solutions to boost your online presence and growth.',
    'TrendingUp',
    'from-green-500 to-green-600',
    ARRAY[
        'Search Engine Optimization (SEO)',
        'Content marketing strategy',
        'Social media management',
        'PPC advertising campaigns',
        'Analytics and reporting'
    ],
    ARRAY['Google Analytics', 'SEMrush', 'HubSpot', 'Facebook Ads', 'Google Ads'],
    true,
    3,
    true,
    'Digital Marketing Services | SEO, Social Media & PPC',
    'Comprehensive digital marketing services including SEO, social media, content marketing, and paid advertising.'
),
(
    'Consulting',
    'consulting',
    'Expert guidance to transform your business with digital innovation.',
    'Users',
    'from-accent-main to-blue-600',
    ARRAY[
        'Digital transformation strategy',
        'Technology roadmap planning',
        'Process optimization',
        'Team training and development',
        'Project management consulting'
    ],
    ARRAY['Agile', 'Scrum', 'JIRA', 'Confluence', 'Miro'],
    true,
    4,
    true,
    'Technology Consulting Services | Digital Transformation Experts',
    'Expert technology consulting services for digital transformation, strategy planning, and business process optimization.'
),
(
    'Data Analytics',
    'data-analytics',
    'Transform your data into actionable insights with advanced analytics.',
    'Database',
    'from-red-500 to-red-600',
    ARRAY[
        'Data visualization dashboards',
        'Business intelligence reporting',
        'Predictive analytics',
        'Data warehousing',
        'Real-time analytics'
    ],
    ARRAY['Tableau', 'Power BI', 'Python', 'R', 'SQL'],
    true,
    5,
    true,
    'Data Analytics Services | Business Intelligence Solutions',
    'Professional data analytics services transforming raw data into actionable business insights and intelligence.'
),
(
    'Cloud Solutions',
    'cloud-solutions',
    'Scalable cloud infrastructure and migration services.',
    'Cloud',
    'from-cyan-500 to-cyan-600',
    ARRAY[
        'Cloud migration services',
        'Infrastructure as code',
        'Cloud security and compliance',
        'Cost optimization',
        'Multi-cloud strategies'
    ],
    ARRAY['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes'],
    true,
    6,
    true,
    'Cloud Solutions Services | AWS, Azure & GCP Expertise',
    'Expert cloud solutions for migration, infrastructure, security, and optimization across AWS, Azure, and Google Cloud.'
),
(
    'Mobile Development',
    'mobile-development',
    'Native and cross-platform mobile applications for iOS and Android.',
    'Smartphone',
    'from-indigo-500 to-indigo-600',
    ARRAY[
        'iOS and Android native apps',
        'React Native development',
        'Flutter applications',
        'App store optimization',
        'Mobile app maintenance'
    ],
    ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
    true,
    7,
    true,
    'Mobile Development Services | iOS & Android App Development',
    'Professional mobile app development services for native iOS, Android, and cross-platform applications.'
),
(
    'Web Solutions',
    'web-solutions',
    'Custom web applications tailored to your business needs.',
    'Globe',
    'from-pink-500 to-pink-600',
    ARRAY[
        'Custom web applications',
        'E-commerce solutions',
        'Content management systems',
        'Progressive web apps',
        'Web application security'
    ],
    ARRAY['React', 'Next.js', 'Django', 'Laravel', 'Magento'],
    true,
    8,
    true,
    'Web Solutions Services | Custom Web Application Development',
    'Custom web application development services including e-commerce, CMS, PWA, and enterprise solutions.'
);
