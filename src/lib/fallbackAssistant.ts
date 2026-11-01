/**
 * Lightweight client-side assistant for environments where WebGPU is not supported
 * (e.g., older mobile browsers, devices without GPU adapters, or restricted webviews).
 * Provides immediate, accurate answers about Aaryan Praveen with zero memory overhead
 * and zero network weight downloads.
 */

interface FAQResponse {
  keywords: string[];
  response: string;
}

const FAQ_KNOWLEDGE_BASE: FAQResponse[] = [
  {
    keywords: ['project', 'work sample', 'portfolio', 'built', 'app'],
    response: `Here are Aaryan's top featured projects:

- **PoliSightsAI** (Civic Tech Hackathon Winner): Automated real-time policy intelligence tracker using NLP, vector search (Pinecone), FastAPI, and React.
- **NimbleDev**: In-browser cloud IDE sandbox featuring live preview execution, terminal CLI, Docker containerization, and WebSockets.
- **Freeway Simulator**: Swarm traffic dynamics simulator modeling 100+ autonomous vehicles using MOBIL and IDM lane-changing algorithms.
- **CoinGuard**: HD cryptocurrency wallet supporting Solana and Ethereum with client-side key derivation.
- **PledgePilot & CureConnect**: Crowdfunding analytics platform (D3.js) and healthcare monitoring system.`
  },
  {
    keywords: ['polisight', 'policy', 'hackathon'],
    response: `**PoliSightsAI** won *Best AI Solution* at the TFC Civic Tech Hackathon (Feb 2025). It is an automated policy tracking platform for small businesses using React, FastAPI, NLP classification, OpenAI Embeddings, Pinecone vector search, and Snowflake.`
  },
  {
    keywords: ['nimble', 'ide', 'sandbox'],
    response: `**NimbleDev** is an interactive in-browser cloud IDE and development sandbox. It features session-aware state management, a live preview sandbox, file tree, and a terminal CLI powered by React, TypeScript, Node.js, WebSockets, and Docker.`
  },
  {
    keywords: ['freeway', 'traffic', 'simulation', 'mobil', 'idm'],
    response: `**Freeway Simulator** ([freeway-simulator.vercel.app](https://freeway-simulator.vercel.app)) models real-time vehicle flow dynamics with 100+ autonomous agents using the Intelligent Driver Model (IDM) and MOBIL lane-switching algorithms in React, TypeScript, and Python.`
  },
  {
    keywords: ['coinguard', 'crypto', 'wallet', 'web3', 'solana', 'ethereum'],
    response: `**CoinGuard** is a client-side Hierarchical Deterministic (HD) cryptocurrency wallet supporting Ethereum and Solana, built with React, Node.js, Solana web3.js, and Ethereum ethers.`
  },
  {
    keywords: ['pledgepilot', 'pledge', 'crowdfunding'],
    response: `**PledgePilot** ([pledgepilot-olg9.onrender.com](https://pledgepilot-olg9.onrender.com)) is an innovative crowdfunding platform designed for hobbyists and creators to launch and manage campaigns with dynamic D3.js data visualizations and gamified rewards.`
  },
  {
    keywords: ['experience', 'job', 'work', 'career', 'role', 'company', 'flair', 'northeastern'],
    response: `Aaryan has **2.5+ years of software engineering experience**:

1. **Research Assistant** — Northeastern University (Jan 2025 – Present | Boston, MA):
   - Microscopic traffic simulation models and multi-agent swarm optimization (IDM/MOBIL).
   - Commended by Professor Sergey Aityan for algorithm design and research reliability.

2. **Associate Full Stack Software Engineer** — Flair Labs (Oct 2021 – Apr 2023 | Mumbai, India):
   - Built modular UI libraries with Lit Elements & Shadow DOM for a SaaS KYC platform.
   - Hardened Java Spring Boot microservices and containerized workflows with Docker.
   - Awarded the *Budding Star Award* (June 2023); commended by Founder Daljeet Malhotra.

3. **Founder & Lead Developer** — ehi sleepwear (Dec 2025 – Present):
   - Direct-to-consumer e-commerce brand with custom Shopify CLI and Liquid storefront.`
  },
  {
    keywords: ['education', 'degree', 'university', 'college', 'school', 'gpa', 'study', 'master', 'bachelor'],
    response: `Aaryan's educational background:

- **Master of Science in Software Engineering Systems**
  *Northeastern University, Boston, MA* (2023 – May 2025) | **GPA: 3.6 / 4.0**
- **Bachelor of Engineering in Electronics Engineering**
  *University of Mumbai, India* (2017 – Aug 2021) | **GPA: 3.2 / 4.0**`
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'phone', 'linkedin', 'github', 'connect'],
    response: `You can reach Aaryan directly through:

- **Email**: [aaryan.praveen@gmail.com](mailto:aaryan.praveen@gmail.com)
- **LinkedIn**: [linkedin.com/in/aaryanpraveen](https://www.linkedin.com/in/aaryanpraveen/)
- **GitHub**: [github.com/aaryanpraveen16](https://github.com/aaryanpraveen16)
- **Location**: Open to relocation and remote opportunities worldwide.`
  },
  {
    keywords: ['skill', 'stack', 'technology', 'tech', 'languages', 'react', 'python', 'java', 'typescript'],
    response: `Aaryan's primary technical skills:

- **Languages**: TypeScript, JavaScript, Java, Python, C++, SQL, HTML/CSS.
- **Frontend**: React, Next.js, Redux, Lit Elements, Tailwind CSS, Material-UI, D3.js.
- **Backend & APIs**: Java Spring Boot, Node.js, Express, FastAPI, REST, GraphQL, WebSockets.
- **AI & Systems**: WebLLM, RAG, Model Context Protocol (MCP), Pinecone, Ollama, NumPy.
- **DevOps & Cloud**: Docker, Kubernetes, AWS, NGINX, CI/CD, Linux.`
  },
  {
    keywords: ['award', 'achievement', 'honor', 'patent', 'copyright'],
    response: `Key awards and intellectual property:

- **Best AI Solution Winner** — TFC Civic Tech Hackathon (Feb 2025) for PoliSightsAI.
- **Budding Star Award** — Flair Labs (June 2023) for full-stack engineering excellence.
- **Government of India Registered Copyright** (April 2021) for research on GPU-accelerated parallel computation.`
  },
  {
    keywords: ['hobby', 'interest', 'motorcycle', 'bike', 'personal', 'himalaya', 'gaming'],
    response: `Outside of programming, Aaryan is passionate about:

- **Motorcycling**: Rides and maintains a 349cc Royal Enfield Meteor 350 cruiser.
- **Fitness & Adventure**: 5-day running split and high-altitude trekking in the Himalayas.
- **Hardware & Gaming**: Custom PC thermal curve tuning, Apex Legends, and Resident Evil.`
  },
  {
    keywords: ['about', 'who is', 'bio', 'summary', 'overview'],
    response: `**Aaryan Praveen** is a Full-Stack Software Engineer & AI Systems Developer with 2.5+ years of experience across scalable web architectures, microservices, and AI engineering. He holds an MS in Software Engineering Systems from Northeastern University and is open to full-time roles and collaborations.`
  }
];

/**
 * Returns a matched response based on user input, or a friendly general guide.
 */
export function getFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase().trim();

  // Check keyword matches in order
  for (const item of FAQ_KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => query.includes(kw))) {
      return item.response;
    }
  }

  // Default fallback answer
  return `I'm currently running in **Lightweight Mode** (since WebGPU is unavailable on this device).

I can answer questions about:
- **Projects**: PoliSightsAI, NimbleDev, Freeway Simulator, CoinGuard
- **Experience**: Northeastern Research Assistant, Flair Labs, ehi sleepwear
- **Education**: MS at Northeastern, BS at Mumbai University
- **Contact & Skills**: How to get in touch, technical stack, and awards

Feel free to ask any question or reach Aaryan directly at [aaryan.praveen@gmail.com](mailto:aaryan.praveen@gmail.com)!`;
}

/**
 * Simulates smooth streaming chunks for the lightweight assistant
 * to preserve the dynamic chat experience without needing a GPU.
 */
export async function* streamFallbackResponse(userPrompt: string): AsyncGenerator<string> {
  const fullText = getFallbackResponse(userPrompt);
  const words = fullText.split(' ');

  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? '' : ' ') + words[i];
    yield chunk;
    // Small natural delay between words
    await new Promise((resolve) => setTimeout(resolve, 18));
  }
}
