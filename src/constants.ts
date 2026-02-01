
import type { Course, BlogPost } from './types';

export const COLORS = {
  primary: '#1E2D5A',   // Navy
  secondary: '#76BC21', // Green
  accent: '#00A3E0',    // Light Blue
  background: '#FFFFFF',
  text: '#1e293b',
};

export const INITIAL_COURSES: Course[] = [
  // Placement Track - prioritized per request
  {
    id: 'ds1',
    title: 'Data Science',
    description: 'Comprehensive Data Science program covering statistics, modeling, deep learning and practical ML ops with capstone projects and agentic applications.',
    category: 'Placement',
    duration: '6 months',
    level: 'Intermediate',
    price: '₹79,999',
    instructor: 'Dr. Ananya Rao',
    outcomes: ['Exploratory Data Analysis', 'Supervised & Unsupervised Learning', 'Deep Learning (DL/CV/NLP)', 'MLOps & Deployment', 'AI Agents Integration', 'Excel & PowerBI/Tableau', 'Java for Data Engineering'],
    tools: ['Python', 'pandas', 'numpy', 'scikit-learn', 'TensorFlow/PyTorch', 'Streamlit', 'AWS'],
    image: 'https://images.unsplash.com/photo-1531497865144-046194a1776a?auto=format&fit=crop&q=80&w=1200',
    curriculumModules: [
      { title: 'Programming & Data', description: 'Python ETL (pandas, numpy), matplotlib & plotly; advanced SQL, Excel & PowerBI/Tableau' },
      { title: 'Mathematical Foundations', description: 'Statistics, probability and linear algebra' },
      { title: 'Core Machine Learning', description: 'Supervised & unsupervised methods, feature engineering' },
      { title: 'Deep Learning & NLP/CV', description: 'Transformers, NLP, CV and DL architectures' },
      { title: 'MLOps & Cloud', description: 'Streamlit, AWS deployment, model serving and monitoring' },
      { title: 'Capstone Projects', description: 'Three industry-aligned capstones with real datasets' }
    ],
    whoThisProgramIsFor: ['Aspiring data scientists', 'Engineers seeking ML careers', 'Professionals looking to upskill']
  },
  {
    id: 'da1',
    title: 'Data Analysis',
    description: 'Practical Data Analysis track: Python ETL, pandas, numpy, visualization, SQL and BI tooling — built for fast impact and three capstone projects.',
    category: 'Placement',
    duration: '4 months',
    level: 'Beginner',
    tools: ['Python', 'pandas', 'numpy', 'matplotlib', 'plotly', 'Excel', 'PowerBI', 'Tableau'],
    price: '₹39,999',
    instructor: 'Priya Sharma',
    outcomes: ['Python ETL (pandas)', 'Advanced SQL', 'Visualization (matplotlib/plotly)', 'BI (Excel, PowerBI/Tableau)', '3 Capstone Projects', 'AI Agents basics', 'Java for ETL & Automation'],
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=1200',
    curriculumModules: [
      { title: 'Python ETL & Tools', description: 'pandas, numpy, data cleaning and ETL pipelines,excel' },
      { title: 'Advanced SQL', description: 'Window functions, joins, performance and analytics' },
      { title: 'Visualization & BI', description: 'matplotlib, plotly, BI (Excel, PowerBI/Tableau) ' },
      { title: 'Mathematical Foundations', description: 'Statistics and probability for analysis' },
      { title: 'Applied Capstones', description: 'Three business-focused capstone projects' }
    ],
    whoThisProgramIsFor: ['Business analysts', 'Fresh graduates', 'Career switchers into analytics']
  },
  {
    id: 'pf1',
    title: 'Python Fullstack',
    description: 'End-to-end Python Fullstack track: frontend basics, React, Python backend, Django/FastAPI, system design, DSA fundamentals and AI integrations.',
    category: 'Placement',
    duration: '6 months',
    tools: ['Python', 'Django', 'FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'Aws', 'Git'],

    level: 'Beginner',
    price: '₹59,999',
    instructor: 'Karthik Menon',
    outcomes: ['Frontend (HTML/CSS/JS, Tailwind)', 'React basics', 'Django & FastAPI', 'System Design & DSA', 'AI Integration & Agents', 'Java Backend Fundamentals'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    curriculumModules: [
      { title: 'Web Foundations', description: 'HTML, CSS, JS, Bootstrap, Tailwind' },
      { title: 'React & Next Basics', description: 'React fundamentals and introductory Next.js' },
      { title: 'Backend Essentials', description: 'Python advanced, Django, FastAPI; introduction to Java backend concepts' },
      { title: 'Systems & DSA', description: 'System design principles, architecture and DSA basics' },
      { title: 'Agents & AI Integration', description: 'Agent basics, AI integration patterns and deployment' },
      { title: 'Capstone', description: 'Fullstack capstone with production deployment' }
    ],
    whoThisProgramIsFor: ['Aspiring backend/fullstack engineers', 'Bootcamp grads']
  },
  {
    id: 'java1',
    title: 'Java Backend & Spring',
    description: 'Java backend engineering: core Java, Spring Boot, microservices, SQL, system design, and production-ready APIs.',
    category: 'Placement',
    duration: '6 months',
    level: 'Intermediate',
    price: '₹69,999',
    tools: ['Java', 'Spring Boot', 'Microservices', 'JDBC', 'SQL', 'Docker', 'AWS'],
    instructor: 'Ravi Kumar',
    outcomes: ['Core Java & OOP', 'Spring Boot & REST APIs', 'Microservices & Kafka', 'SQL & Data Modelling', 'System Design', 'Capstone Project'],
    image: 'https://images.unsplash.com/photo-1526378720908-2fc7a37b7d72?auto=format&fit=crop&q=80&w=1200',
    curriculumModules: [
      { title: 'Java Foundations', description: 'Core Java, OOP, concurrency and JVM internals' },
      { title: 'Spring Boot & APIs', description: 'REST API design, Spring Boot, Spring Data' },
      { title: 'Microservices & Integration', description: 'Microservice patterns, Kafka, messaging and service meshes' },
      { title: 'Databases & SQL', description: 'Relational modelling, indexing and performance' },
      { title: 'System Design & DSA', description: 'Architectural patterns and essential algorithms' },
      { title: 'Capstone Project', description: 'Production-grade API service with monitoring and CI/CD' }
    ],
    whoThisProgramIsFor: ['Backend engineers', 'Experienced Java developers looking to upskill for cloud & microservices']
  },
  {
    id: 'aa1',
    title: 'AI Agents',
    description: 'Specialized program to build multi-agent systems, RAGs, chatbots and automated workflows using LangChain, LangGraph and popular agent platforms.',
    category: 'Upskilling',
    duration: '3 months',
    level: 'Advanced',
    tools: ['LangChain', 'LangGraph', 'n8n', 'prompt engineering', 'FastAPI', 'Streamlit'],
    price: '₹49,999',
    instructor: 'Sanjay Iyer',
    outcomes: ['Python & Streamlit', 'FastAPI & APIs', 'LLMs & Prompt Engineering', 'LangChain & LangGraph', 'Crew AI & Multi-Agent Coordination', 'RAGs & Chatbots', 'Workflow Automation (n8n, Zapier, Microsoft Agent)'],
    image: 'https://images.unsplash.com/photo-1526378720908-2fc7a37b7d72?auto=format&fit=crop&q=80&w=1200',
    curriculumModules: [
      { title: 'Agent Foundations', description: 'Python, Streamlit, FastAPI and working with LLMs' },
      { title: 'Prompt Engineering & LLMs', description: 'Advanced prompt patterns and LLM orchestration' },
      { title: 'LangChain & LangGraph', description: 'Tool usage, chains and integrations' },
      { title: 'Multi-Agent Systems & Crew AI', description: 'Designing, orchestrating and coordinating multi-agent systems' },
      { title: 'RAGs, Chatbots & Workflows', description: 'RAG pipelines, chatbots, n8n, Zapier and Microsoft Agent integrations' }
    ],
    whoThisProgramIsFor: ['AI engineers', 'Product teams building agent workflows']
  },

  // Upskilling Track
  {
    id: 'u1',
    title: 'AI Agents Mastery',
    description: 'Learn to build autonomous AI agents that can browse the web, use tools, and solve complex multi-step problems using AutoGPT and LangGraph.',
    category: 'Upskilling',
    duration: '',
    level: 'Advanced',
    price: '$799',
    instructor: 'Alex Rivera',
    outcomes: ['Autonomous Workflows', 'Agentic Architecture', 'Multi-Agent Systems', 'API Orchestration', 'Memory Management'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'u2',
    title: 'Cloud Computing (AWS/Azure)',
    description: 'Upskill your infrastructure knowledge. Learn professional cloud architecture, cost optimization, and serverless scaling on the world\'s leading platforms.',
    category: 'Upskilling',
    duration: '',
    level: 'Intermediate',
    price: '$850',
    instructor: 'Sarah Jenkins',
    outcomes: ['AWS Solutions Arch', 'Azure Fundamentals', 'Cloud Security', 'Kubernetes Ops', 'Cost Optimization'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'u3',
    title: 'Generative AI Foundations',
    description: 'A deep dive into the technology powering ChatGPT. Learn about transformers, diffusion models, and how to implement LLMs in real business use cases.',
    category: 'Upskilling',
    duration: '',
    level: 'Intermediate',
    price: '$699',
    instructor: 'Leo Zhang',
    outcomes: ['Transformer Architecture', 'Prompt Engineering', 'Model Deployment', 'AI Ethics', 'Vector Databases', 'Agent Workflows & RAGs'],
    image: 'https://images.unsplash.com/photo-1684163762274-5bf7e05cc481?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'u4',
    title: 'Cybersecurity Advanced',
    description: 'Protect the digital frontier. Learn professional penetration testing, ethical hacking, and how to defend against AI-driven cyber threats.',
    category: 'Upskilling',
    duration: '',
    level: 'Advanced',
    price: '$950',
    instructor: 'Robert Vance',
    outcomes: ['Ethical Hacking', 'Threat Hunting', 'Network Defense', 'AI Cyber-Security', 'Incident Response'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of AI in the Workplace',
    excerpt: 'Artificial intelligence is no longer a futuristic concept; it is a fundamental tool reshaping how professionals operate across every industry.',
    content: `The landscape of modern work is shifting beneath our feet. As generative models become more sophisticated, the role of the human professional is evolving from a simple executor of tasks to a high-level architect of solutions. At Cirameti Academy, we integrate these tools into our curriculum to ensure our students are not just keeping up with the change, but leading the charge in their respective industries.

We are entering an era of "Augmented Intelligence" where the synergy between human creativity and machine efficiency creates unparalleled productivity. Instead of replacing roles, AI is refining them. Engineers today are increasingly focused on system design and prompt orchestration, while automation handles the repetitive boilerplate code that once consumed hours of valuable development time.

The historical transition from manual research to digital tools like IDEs was significant, but the jump to AI-assisted development is revolutionary. AI agents can now browse the web, debug complex logic, and even suggest architectural improvements in real-time. This shift requires a new breed of professional—one who understands both the underlying fundamentals and the sophisticated tools that amplify their impact.

Looking ahead, the most successful individuals will be those who view learning as a lifelong commitment rather than a destination. The pace of AI evolution means that staying relevant requires constant adaptation. By mastering the core logic and problem-solving skills at Cirameti, our students are uniquely positioned to leverage whatever new technologies emerge on the horizon.`,
    author: 'Cirameti Labs',
    date: '2024-05-10',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    tags: ['AI', 'Workplace', 'Future of Work']
  },
  {
    id: '2',
    title: 'Bridging the Talent Gap in Tech',
    excerpt: 'Why traditional education often fails to meet industry needs and how placement-focused models are solving the problem.',
    content: `The persistent mismatch between academic degrees and job-ready technical proficiency is a growing concern for global enterprises. While universities provide essential theoretical foundations, they often lag behind the rapid pace of production-grade engineering requirements. This "talent gap" creates a bottleneck for innovation, as companies spend months training new hires before they can contribute meaningfully.

Companies today are no longer looking for just certifications; they are looking for "Day 1" value contributors. They need individuals who can navigate complex codebases, understand deployment pipelines, and solve business problems using modern frameworks. This shift in hiring priorities has exposed the limitations of traditional degree programs that prioritize abstract concepts over functional, applied skill.

Institutional-grade academies like Cirameti bridge this gap by simulating real-world engineering environments. We move beyond textbooks to focus on high-reliability outcomes. By immersing students in rigorous peer reviews, deep-dive technical labs, and production-grade projects, we ensure that they develop the muscle memory required for professional excellence.

The long-term impact of closing this talent gap is profound for the global digital economy. As more individuals transition into high-skill roles through outcome-driven education, the barriers to technological progress are lowered. We aren't just training students; we are empowering the next generation of engineers to build the systems that will define our future.`,
    author: 'Academic Board',
    date: '2024-06-15',
    category: 'Careers',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    tags: ['Education', 'Hiring', 'Tech Gap']
  },
  {
    id: '3',
    title: 'The Power of Effective Communication in Tech',
    excerpt: 'Great code isn\'t enough. Discover why the ability to articulate complex technical ideas is the most underrated skill for senior engineers.',
    content: `Engineering is fundamentally a social and collaborative activity, yet the "lone coder" myth persists. In reality, the most impactful software is built by teams that communicate with clarity and empathy. A brilliant engineer who cannot articulate their architectural decisions to stakeholders or mentor their peers effectively becomes a bottleneck in even the most technically advanced organizations.

The cost of poor communication is often measured in project delays, misunderstood requirements, and mounting technical debt. When ideas aren't clearly expressed, team alignment suffers, leading to fragmented development efforts. At Cirameti, we recognize that technical mastery must be balanced with the ability to translate jargon into actionable business insights for non-technical partners.

For senior developers, communication is a strategic lever. The ability to advocate for a specific technology or defend a complex design choice is what separates technical experts from true leaders. We train our students in the art of technical storytelling—teaching them how to build consensus and influence product direction by presenting their ideas with precision and confidence.

Building a culture of clarity within high-performing teams is the final piece of the puzzle. When everyone feels heard and information flows freely, innovation thrives. By prioritizing soft skills as essential competencies, we are cultivating engineers who are not only masters of their craft but also architects of healthy, collaborative, and successful work environments.`,
    author: 'Soft Skills Faculty',
    date: '2024-07-02',
    category: 'Professional Growth',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    tags: ['Communication', 'Leadership', 'Soft Skills']
  },
  {
    id: '4',
    title: 'Why Aptitude is the Foundation of Engineering Success',
    excerpt: 'Languages and frameworks come and go, but core problem-solving ability is the eternal currency of the technology industry.',
    content: `In an industry defined by constant flux, focusing on a single language or framework is a risky strategy. The technologies we use today may be obsolete in five years, but the underlying principles of logic and problem-solving remain eternal. This is why we prioritize "aptitude" as the primary foundation of engineering success—the inherent ability to learn and solve problems regardless of the toolset.

The "half-life" of technical skills is shrinking faster than ever before. To survive and thrive, engineers must be able to pivot between different stacks seamlessly. A student who masters the fundamentals of algorithms, data structures, and system architecture at Cirameti gains the mental flexibility to adapt to whatever new paradigm the future holds.

Testing for logic and reasoning has become a standard practice in elite tech hiring because it is the most reliable predictor of long-term performance. Companies want to see how you think when faced with a problem you've never seen before. By sharpening this cognitive muscle, we prepare our graduates to handle the high-pressure, open-ended challenges of a professional career.

Ultimately, a strong foundation allows for rapid adaptation to future technological shifts. Whether it's moving from traditional web dev to decentralized systems or transitioning into AI-driven automation, the aptitude to learn quickly is the most valuable currency an engineer can possess. At Cirameti, we aren't just teaching you how to code; we are teaching you how to think.`,
    author: 'Technical Director',
    date: '2024-08-12',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=1200',
    status: 'Published',
    tags: ['Aptitude', 'Problem Solving', 'Logic']
  }
];

export const NAVIGATION = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Our Products', children: [
    { name: 'Courses', path: '/courses' },
    { name: 'Job Search', path: '/job-search' },
    { name: 'Free Career Guidance', path: '/free-guidance' }
  ] },
  { name: 'Hire From Us', path: '/hire' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];
