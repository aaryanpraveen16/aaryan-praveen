import PolySightsAI from "../assets/polySightsAI.jpg"
import NimbleDev from "../assets/nimble-dev.png"
import CoinGuard from "../assets/coinguard.jpg"
import Daljeet from "../assets/Daljeet.jpeg"
import Nirmal from "../assets/Nirmal.jpeg"
import CureConnect from "../assets/cure-connect.png"
import PledgePilot from "../assets/pledge-pilot.jpg"

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
    title: 'PoliSightsAI',
    description: 'An AI-powered platform that helps small businesses track and analyze regulatory changes in real-time using NLP and vector search.',
    image: PolySightsAI,
    tags: ['React', 'FastAPI', 'OpenAI', 'Airflow', 'Snowflake', 'MongoDB'],
    githubUrl: 'https://github.com/TFC-Civic-Tech-Hackathon/PoliSightsAI',
    fullDescription: 'PoliSightsAI is a comprehensive AI-powered platform designed to help small businesses stay informed about regulatory changes that could impact their operations. The platform leverages advanced Natural Language Processing (NLP) and vector search technologies to monitor, analyze, and deliver real-time insights on policy changes across various industries and jurisdictions. Built with a modern tech stack including React for the frontend, FastAPI for the backend API, and integrated with OpenAI\'s language models for intelligent content analysis.',
    features: [
      'Real-time policy monitoring and alerts',
      'AI-powered content analysis and summarization',
      'Industry-specific regulatory tracking',
      'Interactive dashboard with data visualization',
      'Automated report generation',
      'Multi-jurisdiction coverage'
    ],
    // liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'NimbleDev',
    description: 'A WebSocket-powered interactive development environment with a CLI, file tree, and live preview for seamless coding and debugging.',
    image: NimbleDev,
    tags: ['React', 'Node.js', 'Express', 'Docker', 'Kubernetes', 'WebSockets'],
    githubUrl: 'https://github.com/aaryanpraveen16/Nimble-Dev',
    fullDescription: 'NimbleDev is a cloud-based interactive development environment that provides developers with a seamless coding experience through real-time collaboration and instant feedback. The platform features a WebSocket-powered architecture that enables live code synchronization, collaborative editing, and immediate preview updates. Built with containerization in mind, NimbleDev ensures consistent development environments across different machines and deployment scenarios.',
    features: [
      'Real-time collaborative coding',
      'Integrated terminal and CLI tools',
      'Live file tree navigation',
      'Instant preview and hot reloading',
      'Docker containerization support',
      'Kubernetes orchestration ready',
      'Multi-language syntax highlighting',
      'Integrated debugging tools'
    ],
    // liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'CoinGuard',
    description: 'A hierarchical deterministic (HD) cryptocurrency wallet supporting Ethereum & Solana with secure key management and transactions.',
    image: CoinGuard,
    tags: ['React', 'Node.js', 'Solana', 'Ethereum', 'Blockchain', 'Web3'],
    githubUrl: 'https://github.com/aaryanpraveen16/CoinGuard',
    fullDescription: 'CoinGuard is a sophisticated cryptocurrency wallet application that implements hierarchical deterministic (HD) wallet functionality for both Ethereum and Solana blockchains. The application prioritizes security through advanced cryptographic techniques while maintaining an intuitive user interface for managing digital assets. Built with modern web technologies and blockchain integration libraries, CoinGuard provides users with a secure and reliable platform for cryptocurrency transactions.',
    features: [
      'Hierarchical Deterministic (HD) wallet support',
      'Multi-blockchain compatibility (Ethereum & Solana)',
      'Secure private key management',
      'Transaction history and tracking',
      'Real-time balance updates',
      'QR code generation for addresses',
      'Backup and recovery mechanisms',
      'Hardware wallet integration support'
    ],
    // liveUrl: 'https://example.com',
  },
  {
    id: 4,
    title: 'CureConnect – Health Monitoring & Management App',
    description: 'Designed a health monitoring app that integrates with wearable devices to track health metrics, manage prescriptions, and ensure user-friendly navigation.',
    image: CureConnect,
    tags: ['Figma', 'UX Research', 'Prototyping', 'Information Architecture'],
    fullDescription: 'CureConnect is a comprehensive health monitoring and management application designed to bridge the gap between patients, healthcare providers, and wearable technology. The project focused on creating an intuitive user experience that seamlessly integrates with various health monitoring devices while providing actionable insights and medication management features. The design process involved extensive user research, prototyping, and iterative testing to ensure accessibility and usability across different user demographics.',
    features: [
      'Wearable device integration',
      'Real-time health metrics tracking',
      'Prescription and medication management',
      'Appointment scheduling and reminders',
      'Health trend analysis and visualization',
      'Emergency contact integration',
      'Multi-platform responsive design',
      'Accessibility-focused user interface'
    ],
    // githubUrl: 'https://github.com/', (if applicable)
    // liveUrl: 'https://example.com',
  },
  {
    id: 5,
    title: 'PledgePilot',
    description: 'A crowdfunding platform enabling hobbyists to efficiently launch and manage campaigns. Integrated dynamic data visualization and gamified rewards to enhance user engagement.',
    image: PledgePilot,
    tags: ['React.js', 'Material-UI', 'D3.js', 'Redux', 'MongoDB'],
    githubUrl: 'https://github.com/aaryanpraveen16/pledgepilot',
    fullDescription: 'PledgePilot is an innovative crowdfunding platform specifically designed for hobbyists and creative individuals looking to bring their projects to life. The platform combines traditional crowdfunding mechanics with gamification elements and advanced data visualization to create an engaging experience for both project creators and backers. Built with a focus on user experience and data-driven insights, PledgePilot helps users make informed decisions about their investments and project support.',
    features: [
      'Campaign creation and management tools',
      'Dynamic data visualization with D3.js',
      'Gamified reward systems',
      'Real-time funding progress tracking',
      'Social sharing and promotion tools',
      'Secure payment processing',
      'Project discovery and filtering',
      'Backer engagement features'
    ],
    // liveUrl: 'https://example.com',
  },
  {
    id: 6,
    title: 'Freeway Simulator',
    description: 'A freeway traffic simulator designed to model real-time vehicle dynamics with multiple agents, focusing on congestion control and lane changing behavior.',
    image: '/lovable-uploads/f045809d-9255-4b2e-877b-f4c5dea44284.png',
    tags: ['React', 'TypeScript', 'Python'],
    githubUrl: 'https://github.com/aaryanpraveen16/freeway-simulator',
    liveUrl: 'https://freeway-simulator.vercel.app/',
    fullDescription: 'Freeway Simulator is a sophisticated traffic simulation tool developed as part of ongoing research at Northeastern University. The simulator models real-time vehicle dynamics with multiple agents to study and analyze traffic flow patterns, congestion control mechanisms, and lane changing behaviors. This work-in-progress tool applies probabilistic behavior models and safe-distance algorithms to create realistic traffic scenarios that help researchers understand and optimize traffic management strategies.',
    features: [
      'Real-time vehicle dynamics modeling',
      'Multi-agent simulation with 100+ vehicles',
      'Probabilistic behavior modeling',
      'Safe-distance algorithm implementation',
      'Congestion control analysis',
      'Lane changing behavior studies',
      'Traffic flow optimization research',
      'Simulation logging and data analysis'
    ],
  }
];


export const testimonials = [
  {
    id: 1,
    name: 'Nirmal Parmar',
    role: 'SDE 2 at Fynd Jio',
    content: "Aaryan is the kind of engineer you want on your team when you're dealing with complex problems that require both deep technical expertise and sharp debugging skills. I've seen him methodically break down intricate issues, often identifying solutions faster than expected. His ability to approach challenges with a structured mindset makes him a valuable asset in high-stakes situations. Beyond his technical acumen, Aaryan is a strong communicator who articulates his thoughts clearly and collaborates seamlessly across teams. He doesn't just solve problems, he makes sure everyone understands the reasoning behind his solutions. That level of clarity and confidence is rare and it makes working with him both productive and rewarding.",
    avatar: Nirmal,
  },
  {
    id: 2,
    name: 'Daljeet Malhotra',
    role: 'Founder and Director at Flair Labs',
    content: "As a Software Engineer, Aaryan has served Flair Labs, where I have observed him working. Prima facie, Aaryan is a diligent professional, committed to his deliverables, quality and team-causes. He is open to solving complex problems without any hesitation. He is an explorer and sees through challenges with confidence. Observing him communicate is reassuring about his confidence and knowhow. He speaks with conviction and is very respectful. Aaryan is an ambitious soul, aiming high and more importantly, has a plan. He has already firmed up as a software engineer and I see his leadership traits unfolding. I wish Aaryan the very best and am confident to see him succeeding all along his career.",
    avatar: Daljeet,
  },
  // {
  //   id: 3,
  //   name: 'Emily Rodriguez',
  //   role: 'Marketing Director',
  //   content: 'I was impressed by both the technical expertise and creative input. They not only built exactly what we needed but also suggested improvements we hadn\'t thought of.',
  //   avatar: 'https://i.pravatar.cc/150?img=5',
  // },
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

  // Machine Learning / AI
  // { name: 'OpenAI APIs', level: 78 },
  // { name: 'Hugging Face', level: 75 },
  // { name: 'Retrieval-Augmented Generation (RAGs)', level: 70 },

  // Other Skills
  // { name: 'WebSockets', level: 80 },
  // { name: 'GraphQL', level: 75 },
];


export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/aaryanpraveen16' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aaryanpraveen/' },
  // { name: 'Twitter', url: 'https://twitter.com' },
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
    date: 'Feb 2025',
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
