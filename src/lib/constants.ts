export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, cart functionality, and payment processing.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['Next.js', 'Node.js', 'Stripe', 'MongoDB'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'AI Image Generator',
    description: 'An application that generates images based on text prompts using machine learning models.',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['React', 'Python', 'TensorFlow', 'OpenAI API'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    content: 'Working with this developer was a fantastic experience. Their attention to detail and ability to transform our ideas into a functional and beautiful website exceeded our expectations.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Startup Founder',
    content: 'Extremely professional and skilled. They delivered our project on time and was always responsive to our feedback. We\'ll definitely work together on future projects.',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    content: 'I was impressed by both the technical expertise and creative input. They not only built exactly what we needed but also suggested improvements we hadn\'t thought of.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 92 },
  { name: 'Next.js', level: 88 },
  { name: 'Node.js', level: 78 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'UI/UX Design', level: 80 },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Twitter', url: 'https://twitter.com' },
];

export const achievements = [
  {
    id: 1,
    title: 'Outstanding Developer Award',
    date: 'June 2023',
    description: 'Recognized for exceptional contributions to the team\'s success and technical innovation during the company-wide recognition event.',
    icon: 'trophy'
  },
  {
    id: 2,
    title: 'Best Mobile App Design',
    date: 'November 2022',
    description: 'Won first place in the annual design competition for creating an intuitive and accessible mobile banking application interface.',
    icon: 'medal'
  },
  {
    id: 3,
    title: 'Open Source Contributor',
    date: '2021 - Present',
    description: 'Active contributor to several major open-source projects with over 50 merged pull requests and recognition from the community.',
    icon: 'award'
  },
  {
    id: 4,
    title: 'Hackathon Winner',
    date: 'October 2021',
    description: 'Led a team of four to victory in the 48-hour hackathon, developing an innovative solution for local community challenges.',
    icon: 'trophy'
  },
  {
    id: 5,
    title: 'Technical Paper Publication',
    date: 'May 2021',
    description: 'Published research paper on modern web architecture patterns in the International Journal of Web Engineering.',
    icon: 'award'
  },
  {
    id: 6,
    title: 'Distinguished Speaker',
    date: 'March 2020',
    description: 'Featured speaker at three major tech conferences, presenting on front-end architecture and performance optimization.',
    icon: 'medal'
  }
];

export const education = [
  {
    id: 1,
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    period: '2018 - 2020',
    gpa: '3.9/4.0',
    courses: [
      'Advanced Algorithms',
      'Machine Learning',
      'Human-Computer Interaction',
      'Database Systems',
      'Distributed Systems',
      'Computer Vision',
      'Natural Language Processing',
      'Cloud Computing'
    ],
    thesis: 'Optimizing Neural Network Architectures for Real-time Web Applications',
    achievements: [
      'Graduate Research Assistant in the Human-Computer Interaction Lab',
      'Teaching Assistant for undergraduate Computer Science courses',
      'Winner of the Graduate Student Research Award'
    ]
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'University of California, Berkeley',
    period: '2014 - 2018',
    gpa: '3.8/4.0',
    courses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Software Engineering',
      'Web Development',
      'Computer Networks',
      'Artificial Intelligence',
      'Mobile Application Development',
      'UI/UX Design Principles'
    ],
    achievements: [
      'Dean\'s List for all semesters',
      'President of the Computer Science Students Association',
      'Winner of the Undergraduate Innovation Challenge',
      'Internship at Google during junior year'
    ]
  }
];

export const workExperience = [
  {
    id: 1,
    position: 'Senior Frontend Developer',
    company: 'TechInnovate Inc.',
    location: 'San Francisco, CA',
    period: 'Jan 2022 - Present',
    description: 'Leading the frontend development team responsible for creating and maintaining the company\'s flagship product, a SaaS platform serving over 500,000 users.',
    responsibilities: [
      'Architect and implement scalable frontend solutions using React and TypeScript',
      'Lead code reviews and technical discussions to ensure high code quality',
      'Collaborate with UX designers to transform wireframes into user-friendly interfaces',
      'Optimize application performance and ensure cross-browser compatibility',
      'Mentor junior developers and conduct technical interviews'
    ],
    achievements: [
      'Reduced application load time by 45% through code optimization and lazy loading techniques',
      'Implemented a component library that increased development speed by 30%',
      'Led the successful migration from legacy codebase to modern React architecture'
    ],
    technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Jest', 'GraphQL']
  },
  {
    id: 2,
    position: 'Frontend Developer',
    company: 'DataViz Solutions',
    location: 'Seattle, WA',
    period: 'Mar 2020 - Dec 2021',
    description: 'Worked in an agile team developing interactive data visualization tools for enterprise clients in the finance and healthcare sectors.',
    responsibilities: [
      'Developed responsive user interfaces with React and D3.js',
      'Built reusable components and libraries for future use',
      'Implemented complex charts and interactive dashboards',
      'Collaborated with backend developers to integrate APIs',
      'Participated in sprint planning and retrospective meetings'
    ],
    achievements: [
      'Created a visualization framework that reduced development time for new charts by 60%',
      'Improved accessibility compliance to WCAG AA standards across all products'
    ],
    technologies: ['React', 'JavaScript', 'D3.js', 'SASS', 'Webpack', 'RESTful APIs']
  },
  {
    id: 3,
    position: 'Web Developer Intern',
    company: 'CreativeWeb Agency',
    location: 'Boston, MA',
    period: 'May 2019 - Aug 2019',
    description: 'Assisted in developing websites and web applications for clients across various industries during a summer internship.',
    responsibilities: [
      'Implemented responsive layouts using HTML, CSS, and JavaScript',
      'Fixed bugs and improved existing features',
      'Assisted senior developers with larger projects',
      'Created content management systems using WordPress',
      'Participated in client meetings to gather requirements'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'WordPress', 'PHP']
  }
];
