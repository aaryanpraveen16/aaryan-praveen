export const navLinks = [
  // { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  // { name: 'Achievements', href: '#achievements' },
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
  // Frontend Technologies
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 92 },
  { name: 'Next.js', level: 88 },
  { name: 'Redux', level: 85 },
  { name: 'Tailwind CSS', level: 95 },
  // { name: 'Material-UI', level: 80 },
  // { name: 'D3.js', level: 75 },
  // { name: 'UI/UX Design', level: 80 },
  { name: 'Figma', level: 80 },
  // Backend Technologies
  { name: 'Node.js', level: 78 },
  { name: 'Express.js', level: 80 },
  // { name: 'FastAPI', level: 82 },
  // { name: 'Spring Boot', level: 76 },

  // Databases & Cloud
  { name: 'MongoDB', level: 85 },
  // { name: 'PostgreSQL', level: 80 },
  // { name: 'Snowflake', level: 75 },
  { name: 'MySQL', level: 82 },
  // { name: 'Pinecone', level: 78 },
  { name: 'AWS (EC2, S3)', level: 80 },

  // DevOps & Tools
  { name: 'Docker', level: 85 },
  { name: 'Kubernetes', level: 75 },
  { name: 'CI/CD', level: 80 },
  // { name: 'Linux', level: 85 },

  // // Machine Learning / AI
  // { name: 'OpenAI APIs', level: 78 },
  // { name: 'Hugging Face', level: 75 },
  // { name: 'Retrieval-Augmented Generation (RAGs)', level: 70 },

  // Other Skills
  // { name: 'WebSockets', level: 80 },
  // { name: 'GraphQL', level: 75 },
];


export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Twitter', url: 'https://twitter.com' },
];

export const achievements = [
  {
    id: 1,
    title: 'Budding Star Award - Flair Labs',
    date: 'June 2023',
    description: 'Awarded for outstanding contributions to software development, security enhancements, and performance optimizations within the organization.',
    icon: 'trophy'
  },
  {
    id: 2,
    title: 'TFC Hackathon - Best AI Solution',
    date: 'November 2022',
    description: 'Developed an AI-powered policy tracking platform, leveraging NLP and semantic search to provide real-time insights on regulatory changes, winning the Best AI Solution award.',
    icon: 'medal'
  },
  {
    id: 3,
    title: 'Government of India Copyright - Research Project',
    date: 'April 2021',
    description: 'Received a **Government of India Copyright** for a research project on parallel computation of special functions using GPU acceleration in MATLAB.',
    icon: 'award'
  }
];


export const education = [
  {
    id: 1,
    degree: 'Master of Science in Software Engineering',
    institution: 'Northeastern University',
    period: '2023 - 2025',
    gpa: '3.6/4.0',
    courses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Object Oriented Design',
      'Design Patterns',
      'Web Development',
      'UI/UX Design'
    ],
    // thesis: 'Optimizing Neural Network Architectures for Real-time Web Applications',
    // achievements: [
    //   'Graduate Research Assistant in the Human-Computer Interaction Lab',
    //   'Teaching Assistant for undergraduate Computer Science courses',
    //   'Winner of the Graduate Student Research Award'
    // ]
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Electronics Engineering',
    institution: 'University of Mumbai',
    period: '2017 - 2021',
    gpa: '3.2/4.0',
    courses: [
      'Computer Networks',
      'Computer Orgasnization & Architecture',
      'Database Systems',
      'IOT'
    ],
    achievements: [
     ' Received Government of India Copyright for Final Year Project: "A Method for Parallel Computation of Chebyshev Polynomials, Error Functions, and Scorer Functions"'
    ]
  }
];

export const workExperience = [
  {
    id: 1,
    position: 'Research Assistant',
    company: 'Northeastern University',
    location: 'Boston, MA',
    period: 'Jan 2025 - Present',
    description: 'Conducting research on microscopic traffic simulation models, focusing on optimizing lane-switching algorithms and traffic flow dynamics.',
    responsibilities: [
      'Reviewed and analyzed microscopic traffic simulation models, including the Intelligent Driver Model (IDM)',
      'Implemented lane-switching algorithms inspired by the MOBIL model to improve traffic flow and reduce congestion',
      'Designed experimental protocols and performed data analysis using NumPy and Matplotlib',
      'Developed a simulation algorithm to enhance traffic dynamics and reduce computational overhead'
    ],
    technologies: ['Python', 'NumPy', 'Matplotlib']
  },
  {
    id: 2,
    position: 'Associate Full Stack Software Engineer',
    company: 'Flair Labs',
    location: 'India',
    period: 'Oct 2021 - Apr 2023',
    description: 'Contributed to the development of scalable frontend and backend solutions for enterprise SaaS applications, focusing on performance, security, and customization.',
    responsibilities: [
      'Developed a frontend library using Lit Elements & Shadow DOM, improving UI performance and reusability',
      'Integrated the frontend library into a React-based SaaS KYC platform for enhanced customization',
      'Containerized microservices using Docker to standardize environments across Dev, Staging, and Production',
      'Designed and optimized database schemas, implementing stored procedures and views',
      'Strengthened Java Spring Boot microservices by mitigating security vulnerabilities'
    ],
    achievements: [
      'Received the Budding Star Award for outstanding contributions and professional growth',
    ],
    technologies: ['React.js', 'JavaScript', 'Spring Boot', 'Typescript', 'MySQL', 'Docker', 'Kubernetes']
  },
  {
    id: 3,
    position: 'Data Analytics Intern',
    company: 'Ramrao Adik Institute of Technology',
    location: 'Navi Mumbai, MH, India',
    period: 'June 2020 - August 2020',
    description: 'Performed exploratory data analysis and developed predictive models to analyze COVID-19 trends, supporting resource allocation for hospitals.',
    responsibilities: [
      'Conducted Exploratory Data Analysis (EDA) on India’s COVID-19 dataset to uncover trends and visualize disease spread',
      'Developed interactive visualizations using Matplotlib and Seaborn for real-time pandemic tracking',
      'Implemented the Holt-Winters time series forecasting model to predict COVID-19 cases',
      'Evaluated model accuracy using Mean Absolute Error (MAE), achieving a 5% error rate'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Time Series Analysis']
  }
];

