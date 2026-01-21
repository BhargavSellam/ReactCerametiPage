
import type { Course, BlogPost, Lead } from './types';

export const COLORS = {
  primary: '#1E2D5A',   // Navy
  secondary: '#76BC21', // Green
  accent: '#00A3E0',    // Light Blue
  background: '#FFFFFF',
  text: '#1e293b',
};

export const INITIAL_COURSES: Course[] = [
  // Placement Track
  {
    id: 'p1',
    title: 'Fullstack Python with AI',
    description: 'Master backend engineering with Python & Django, frontend with React, and integrate advanced AI capabilities into your applications. Includes real-world enterprise projects.',
    category: 'Placement',
    duration: '',
    level: 'Beginner',
    price: '$1,299',
    instructor: 'Dr. Sarah Mitchell',
    outcomes: ['Django & FastAPI', 'React/Next.js', 'LangChain Integration', 'Database Design', 'Cloud Hosting'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'p2',
    title: 'Fullstack Java with AI',
    description: 'The definitive enterprise engineering track. Learn Spring Boot, Microservices, and how to leverage AI for automated testing and code optimization in large-scale systems.',
    category: 'Placement',
    duration: '',
    level: 'Beginner',
    price: '$1,299',
    instructor: 'James Wilson',
    outcomes: ['Spring Boot', 'Microservices Architecture', 'AI-Driven Development', 'Hibernate/JPA', 'Security'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'p3',
    title: 'MERN Stack with AI',
    description: 'Become a master of the modern web. Learn MongoDB, Express, React, and Node.js with a specialized focus on building AI-powered chatbots and interactive intelligent interfaces.',
    category: 'Placement',
    duration: '',
    level: 'Beginner',
    price: '$1,100',
    instructor: 'Elena Rodriguez',
    outcomes: ['React & Redux', 'Node.js/Express', 'AI Chatbot Logic', 'NoSQL Mastery', 'AWS Lambda'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'p4',
    title: 'Data Science with Gen AI',
    description: 'Go beyond traditional analytics. Master Python for data science and learn to implement Generative AI models for synthetic data generation and advanced predictive modeling.',
    category: 'Placement',
    duration: '',
    level: 'Intermediate',
    price: '$1,400',
    instructor: 'Marcus Chen',
    outcomes: ['Predictive Modeling', 'LLM Fine-tuning', 'PyTorch/TensorFlow', 'Advanced Stats', 'NLP Foundations'],
    image: 'https://images.unsplash.com/photo-1551288049-bbda4833878d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'p5',
    title: 'Data Analysis with AI Integration',
    description: 'Transform how businesses make decisions. Learn SQL, Tableau, and PowerBI combined with AI tools to automate reporting and extract deeper hidden insights.',
    category: 'Placement',
    duration: '',
    level: 'Beginner',
    price: '$999',
    instructor: 'Dr. Emily Watson',
    outcomes: ['SQL & Data Cleaning', 'BI Tool Mastery', 'AI Insights Automation', 'Strategic Storytelling', 'Statistical Logic'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
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
    outcomes: ['Transformer Architecture', 'Prompt Engineering', 'Model Deployment', 'AI Ethics', 'Vector Databases'],
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
  { name: 'Courses', path: '/courses' },
  { name: 'Hire From Us', path: '/hire' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];
