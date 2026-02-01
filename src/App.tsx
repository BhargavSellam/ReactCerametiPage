import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, ChevronLeft, ChevronDown, Clock, Award, CheckCircle, Check, Shield, Star, Tv, LayoutDashboard, MessageCircle, Handshake, ClipboardCheck, FileText, Users, Compass, Zap, Target, Activity, Globe, MessageSquare, GraduationCap, Linkedin, Loader2, Phone, TrendingUp
} from 'lucide-react';
import { INITIAL_COURSES, INITIAL_BLOGS, NAVIGATION } from './constants';
import type { Course, BlogPost, Lead, User } from './types';
import siteLogo from './for-website.png';

// Curriculum Data Structure
const CURRICULA: Record<string, { duration: string; modules: { title: string; points: string[] }[] }> = {
  'p1': {
    duration: '',
    modules: [
      { title: 'Python Foundations', points: ['Python and Advanced Python Mastery', 'SQL Fundamentals & Operations'] },
      { title: 'Core Engineering', points: ['Data Related Modules', 'System Design Foundations', 'DSA Basics & Problem Solving'] },
      { title: 'Frontend Development', points: ['React.js Essentials', 'Next.js Basics for Modern Web'] },
      { title: 'Backend Development', points: ['Django Framework Mastery', 'FastAPI for High-Performance APIs'] },
      { title: 'AI Implementation', points: ['AI Integration with Full Stack Applications'] }
    ]
  },
  'p2': {
    duration: '',
    modules: [
      { title: 'Java Foundations', points: ['Java and Advanced Java Concepts', 'SQL (Relational & Non-Relational Databases)'] },
      { title: 'Core Engineering', points: ['System Design Architectures', 'DSA Basics & Strategic Problem Solving'] },
      { title: 'Frontend Development', points: ['React.js Essentials', 'Next.js Basics for Modern Web'] },
      { title: 'Backend Development', points: ['Spring Framework Mastery', 'SpringBoot API Engineering'] },
      { title: 'AI Implementation', points: ['AI Integration with Full Stack Applications'] }
    ]
  },
  'p3': {
    duration: '',
    modules: [
      { title: 'Web Foundations', points: ['Advanced JavaScript Core', 'SQL (Relational & Non-Relational Databases)'] },
      { title: 'Core Engineering', points: ['System Design Architectures', 'DSA Basics & Strategic Problem Solving'] },
      { title: 'Frontend Development', points: ['React.js Essentials', 'Next.js Basics for Modern Web'] },
      { title: 'Backend & Storage', points: ['Node.js & Express.js Engineering', 'MongoDB Database Management'] },
      { title: 'AI Implementation', points: ['AI Integration with Full Stack Applications'] }
    ]
  },
  'p4': {
    duration: '',
    modules: [
      { title: 'Programming & Data', points: ['Python and Advanced Python', 'SQL Mastery'] },
      { title: 'Mathematical Foundations', points: ['Statistics & Probability', 'Linear Algebra'] },
      { title: 'Analytics Ecosystem', points: ['Excel Proficiency', 'Power BI Dashboards'] },
      { title: 'Traditional AI', points: ['Machine Learning Foundations', 'Traditional AI Methodologies'] },
      { title: 'Neural Systems', points: ['Deep Learning Architectures'] },
      { title: 'NLP Mastery', points: ['Natural Language Processing'] },
      { title: 'Generative AI', points: ['GenAI Concepts & Implementation'] },
      { title: 'Agentic Workflows', points: ['AI Agents'] }
    ]
  },
  'p5': {
    duration: '',
    modules: [
      { title: 'Programming & Data', points: ['Python and Advanced Python', 'SQL Mastery'] },
      { title: 'Mathematical Foundations', points: ['Statistics & Probability'] },
      { title: 'Analytics Ecosystem', points: ['Excel Proficiency', 'Power BI Dashboards'] },
      { title: 'Modern Intelligence', points: ['GenAI Integration'] },
      { title: 'Automation', points: ['AI Agents Development'] }
    ]
  },
  'u1': {
    duration: '',
    modules: [
      { title: 'Agentic Design Patterns', points: ['Zero-Shot & Few-Shot Reasoning', 'ReAct & Chain-of-Thought Logic', 'Tool-Use & Function Calling'] },
      { title: 'Multi-Agent Orchestration', points: ['LangGraph & State Management', 'CrewAI Framework Mastery', 'Agentic Workflows vs Sequential'] },
      { title: 'Memory & Long-term Context', points: ['Persistent Memory Systems', 'Knowledge Graph Integration', 'Vector Search Retrieval'] }
    ]
  },
  'u3': {
    duration: '',
    modules: [
      { title: 'Architecture of LLMs', points: ['Attention Mechanism Deep Dive', 'Encoder-Decoder Models', 'Transformer Block Theory'] },
      { title: 'Retrieval Augmented Generation', points: ['Building RAG Pipelines', 'Document Ingestion & Chunking', 'Hybrid Search Strategies'] },
      { title: 'Model Optimization', points: ['Quantization (QLoRA)', 'PEFT Fine-tuning Techniques', 'Deployment with vLLM/Ollama'] }
    ]
  },
  'ds1': {
    duration: '6 months',
    modules: [
      { title: 'Programming & Data', points: ['Python ETL (pandas, numpy)', 'matplotlib & plotly', 'Advanced SQL'] },
      { title: 'Mathematical Foundations', points: ['Statistics & probability', 'Linear algebra'] },
      { title: 'Core Machine Learning', points: ['Supervised & unsupervised learning', 'Feature engineering', 'Model evaluation'] },
      { title: 'Deep Learning & NLP/CV', points: ['Transformers & attention', 'NLP pipelines', 'Computer Vision models'] },
      { title: 'MLOps & Deployment', points: ['Streamlit apps', 'AWS deployment', 'Model serving & monitoring'] },
      { title: 'Capstone Projects', points: ['Three industry-aligned capstones with real datasets'] }
    ]
  },
  'da1': {
    duration: '4 months',
    modules: [
      { title: 'Python ETL & Tools', points: ['pandas', 'numpy', 'ETL pipelines'] },
      { title: 'Advanced SQL', points: ['Window functions', 'Performance tuning', 'Analytics'] },
      { title: 'Visualization & BI', points: ['matplotlib', 'plotly', 'PowerBI', 'Tableau'] },
      { title: 'Mathematical Foundations', points: ['Statistics', 'Probability'] },
      { title: 'Applied Capstones', points: ['Three business-focused capstone projects'] }
    ]
  },
  'pf1': {
    duration: '6 months',
    modules: [
      { title: 'Web Foundations', points: ['HTML, CSS, JS', 'Bootstrap & Tailwind'] },
      { title: 'React & Next Basics', points: ['React fundamentals', 'Intro to Next.js'] },
      { title: 'Backend Essentials', points: ['Python backend (Django & FastAPI)', 'Intro to Java backend'] },
      { title: 'Systems & DSA', points: ['System design principles', 'DSA basics'] },
      { title: 'Agents & AI Integration', points: ['Agent basics', 'AI integration patterns'] },
      { title: 'Fullstack Capstone', points: ['Deploy a production-ready application'] }
    ]
  },
  'java1': {
    duration: '6 months',
    modules: [
      { title: 'Java Foundations', points: ['Core Java & OOP', 'Concurrency & JVM internals'] },
      { title: 'Spring Boot & APIs', points: ['REST API design', 'Spring Boot & Spring Data'] },
      { title: 'Microservices & Integration', points: ['Microservice patterns', 'Kafka & messaging'] },
      { title: 'Databases & SQL', points: ['Relational modelling', 'Indexing & performance'] },
      { title: 'System Design & Capstone', points: ['Architectural patterns', 'Production API project'] }
    ]
  },
  'aa1': {
    duration: '3 months',
    modules: [
      { title: 'Agent Foundations', points: ['Python & Streamlit', 'FastAPI', 'LLM usage'] },
      { title: 'Prompt Engineering & LLMs', points: ['Prompt patterns', 'LLM orchestration'] },
      { title: 'LangChain & LangGraph', points: ['Chains, tools & integrations'] },
      { title: 'Multi-Agent Systems', points: ['CrewAI & multi-agent coordination', 'Agent orchestration patterns'] },
      { title: 'RAGs, Chatbots & Workflows', points: ['RAG pipelines', 'Chatbots', 'n8n, Zapier & Microsoft Agent integrations'] }
    ]
  }
};

interface AppContextType {
  courses: Course[];
  blogs: BlogPost[];
  leads: Lead[];
  user: User | null;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  login: (u: User) => void;
  logout: () => void;
  openCurriculum: (course: Course) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [activeCurriculum, setActiveCurriculum] = useState<Course | null>(null);

  const addLead = (lead: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setLeads([newLead, ...leads]);
    alert("Enquiry received! Our team will reach out to you within 24 hours.");
  };

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ 
      courses, blogs, leads, user, setCourses, setBlogs, addLead, login, logout,
      openCurriculum: (c) => setActiveCurriculum(c)
    }}>
      {children}
      {activeCurriculum && <CurriculumModal course={activeCurriculum} onClose={() => setActiveCurriculum(null)} />}
    </AppContext.Provider>
  );
};

const CurriculumModal = ({ course, onClose }: { course: Course; onClose: () => void }) => {
  const navigate = useNavigate();
  const curriculum = CURRICULA[course.id];
  const isAvailable = !!curriculum;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1E2D5A]/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[56px] shadow-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-10 md:p-14 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${course.category === 'Placement' ? 'bg-[#76BC21] text-white' : 'bg-[#00A3E0] text-white'}`}>
                {course.category} Track
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1E2D5A] uppercase tracking-tight leading-tight">
              {course.title} <span className="text-[#76BC21]">Curriculum</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-4 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-[#1E2D5A] transition-all group shadow-sm">
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="p-10 md:p-20 overflow-y-auto custom-scrollbar flex-grow bg-white">
          {!isAvailable ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="bg-[#00A3E0]/5 p-8 rounded-full mb-10">
                <Shield className="w-16 h-16 text-[#00A3E0]" />
              </div>
              <h3 className="text-3xl font-black text-[#1E2D5A] mb-6 uppercase tracking-tight">Full Curriculum Restricted</h3>
              <p className="text-slate-500 text-lg max-w-xl mx-auto mb-12 font-medium leading-relaxed">
                This specialized {course.category} module is currently available via personalized consultation only. Connect with our academic advisors to receive the full track breakdown.
              </p>
              <Button variant="secondary" size="lg" className="rounded-2xl px-12" onClick={() => { onClose(); navigate('/contact#enquiry-form'); }}>
                KNOW MORE - CONTACT US <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {curriculum.modules.map((mod, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-10 rounded-[48px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group h-full flex flex-col">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-[#1E2D5A] text-white flex items-center justify-center font-black text-xl shadow-lg">
                        {idx + 1}
                      </div>
                      <h4 className="text-xl font-black text-[#1E2D5A] uppercase tracking-tight">{mod.title}</h4>
                    </div>
                    <ul className="space-y-4 flex-grow">
                      {mod.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-slate-500 font-medium">
                          <CheckCircle className="w-5 h-5 text-[#76BC21] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 bg-[#1E2D5A] p-12 md:p-16 rounded-[64px] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#76BC21]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <h3 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase tracking-tight relative z-10">Excited to Build the Future?</h3>
                <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10">
                  Our curriculum is updated weekly to reflect real-world deployments. Start your journey towards technical mastery today.
                </p>
                <div className="flex items-center justify-center relative z-10">
                  <Button variant="primary" size="lg" className="rounded-2xl px-12 w-full sm:w-auto" onClick={() => { onClose(); navigate('/contact#enquiry-form'); }}>
                    KNOW MORE - CONTACT US
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BrandLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 h-16 ${className}`}>
    <div className="relative w-26 h-16 flex items-center justify-center">
      <img src={siteLogo} alt="Cirameti Academy" className="w-full h-full object-contain drop-shadow-md" />
    </div>
    {/* <div className="flex flex-col leading-[0.9]">
      <span className="text-2xl font-extrabold tracking-tight text-[#1E2D5A]">Cirameti</span>
      <span className="text-[10px] font-bold tracking-[0.45em] text-[#76BC21] uppercase mt-1">Academy</span>
    </div> */}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', size = 'md', ...props }: any) => {
  const variants: any = {
    primary: 'bg-[#76BC21] hover:bg-[#65a31c] text-white shadow-lg shadow-[#76BC21]/20',
    outline: 'border-2 border-[#1E2D5A] hover:bg-[#1E2D5A] text-[#1E2D5A] hover:text-white',
    secondary: 'bg-[#00A3E0] hover:bg-[#0089bd] text-white shadow-lg shadow-[#00A3E0]/20',
    ghost: 'hover:bg-slate-100 text-[#1E2D5A] hover:text-[#76BC21]',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    whatsapp: 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20'
  };
  const sizes: any = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base lg:text-lg',
  };
  return (
    <button className={`rounded-xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#1E2D5A] leading-tight">
      {title.includes('Better') ? (
        <>
          <span className="bg-[#cbd5e1]/40 px-3 py-1 mr-2 rounded inline-block">A Better</span>Way to Learn
        </>
      ) : title}
    </h2>
    {subtitle && (
      <div className={`${centered ? 'mx-auto' : 'ml-1'} max-w-4xl`}>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    )}
    <div className={`mt-8 h-2.5 w-24 bg-[#76BC21] rounded-full ${centered ? 'mx-auto' : ''}`} />
  </div>
);

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1E2D5A] p-16 md:p-24 rounded-[64px] shadow-3xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#76BC21]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A3E0]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
          
          <h2 className="text-3xl md:text-6xl font-black text-white mb-12 tracking-tight uppercase leading-tight relative z-10">
            Ready to Transform Your <br />
            <span className="text-[#76BC21]">Engineering Career?</span>
          </h2>
          
          <div className="flex justify-center relative z-10">
            <Button 
              variant="primary" 
              size="lg" 
              className="rounded-3xl px-12 md:px-24 py-6 md:py-8 text-lg md:text-2xl shadow-2xl shadow-[#76BC21]/30 transition-all hover:scale-105"
              onClick={() => navigate('/contact#enquiry-form')}
            >
              ENROLL IN A PROGRAM
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const BetterWayToLearn = ({ lightBg = true }: { lightBg?: boolean }) => (
  <section className={`py-32 ${lightBg ? 'bg-slate-50' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 text-center">
      <SectionHeading 
        title="A Better Way to Learn" 
        subtitle="Traditional education is broken. We fixed it by focusing on high-reliability outcomes. Every student graduates with a verified portfolio of real-world impact."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-center">
        {[
          { icon: <Target className="text-[#76BC21] w-12 h-12 mx-auto" />, title: 'Outcome Oriented', text: 'Our primary metric of success is your employment. We build curricula that reflect the actual job descriptions of top-tier tech firms.' },
          { icon: <Zap className="text-[#00A3E0] w-12 h-12 mx-auto" />, title: 'Practical Immersion', text: 'Forget long lectures. You will spend 80% of your time in hands-on labs, solving architectural challenges and debugging live systems.' },
          { icon: <Compass className="text-[#1E2D5A] w-12 h-12 mx-auto" />, title: 'Expert Mentorship', text: 'Learn from the people who built the systems you use daily. Our instructors are active practitioners from Google, Amazon, and Meta.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col items-center">
            <div className="mb-10 group-hover:scale-110 transition-transform p-5 rounded-3xl bg-slate-50">{item.icon}</div>
            <h4 className="text-2xl font-black mb-6 text-[#1E2D5A] uppercase tracking-tight">{item.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CourseCard: React.FC<{ course: Course, trending?: boolean }> = ({ course, trending = false }) => {
  const { openCurriculum } = useContext(AppContext)!;
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
      {trending && (
        <div className="absolute top-4 right-4 z-10 bg-white px-3 py-1 rounded-full flex items-center gap-2 border border-[#76BC21]/20">
          <Star className="w-4 h-4 text-[#76BC21]" />
          <span className="text-[10px] font-black text-[#1E2D5A] uppercase tracking-widest">Trending</span>
        </div>
      )}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"; }}
        />
      </div>
      <div className="px-6 py-6 flex flex-col flex-grow">
        <h3 className="text-xl font-extrabold mb-3 text-[#1E2D5A] leading-tight">{course.title}</h3>
        <p className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed">{course.description}</p>
        {course.tools && course.tools.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tools.map((t) => (
              <span key={t} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">{t}</span>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 mt-4">
          <button onClick={() => openCurriculum(course)} className="w-full rounded-2xl border border-[#1E2D5A] text-[#1E2D5A] py-3 font-bold uppercase text-sm">View Curriculum</button>
          <button onClick={() => navigate('/contact#enquiry-form')} className="w-full rounded-2xl bg-[#76BC21] text-white py-3 font-bold uppercase text-sm">Enrol Now</button>
        </div>
      </div>
    </div>
  );
};

const PlacementJourney = () => {
  const steps = [
    { id: '01', icon: Shield, title: 'CANDIDATE ALIGNMENT', desc: 'A rigorous initial screening to evaluate technical aptitude, personal motivation, and long-term commitment to the intensive track.' },
    { id: '02', icon: Activity, title: 'COHORT INTEGRATION', desc: 'Selection into a structured batch, fostering a competitive yet collaborative environment with high-performing peers.' },
    { id: '03', icon: Globe, title: 'INSTITUTIONAL ORIENTATION', desc: 'A strategic roadmap session covering curriculum expectations, industry landscapes, and professional codes of conduct.' },
    { id: '04', icon: Tv, title: 'TECHNICAL COMMENCEMENT', desc: 'Phase 1 training begins with expert-led live sessions focused on deep conceptual understanding and architectural foundations.' },
    { id: '05', icon: CheckCircle, title: 'GUIDED APPLIED LEARNING', desc: 'Trainer-assisted labs and continuous guidance sessions to bridge the gap between abstract theory and functional code.' },
    { id: '06', icon: MessageSquare, title: 'READINESS ASSESSMENT', desc: 'Frequent mock interviews and psychological prep sessions to simulate high-pressure recruitment environments.' },
    { id: '07', icon: LayoutDashboard, title: 'LIVE INDUSTRY SIMULATION', desc: 'Mandatory capstone project involving a production-grade application that solves a verifiable industry business problem.' },
    { id: '08', icon: GraduationCap, title: 'PLACEMENT ECOSYSTEM', desc: 'Full transition support with exclusive interview opportunities across our partner network of top-tier global firms.' }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="The Placement Journey" 
          subtitle="Our placement-oriented programs are high-touch, institutional-grade experiences designed for total career transformation."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.id} className="relative p-10 bg-slate-50/50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-[#76BC21]/10 transition-all duration-500 group flex flex-col items-start overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-7xl font-black text-[#1E2D5A]/5 group-hover:text-[#76BC21]/10 transition-colors pointer-events-none select-none">
                {step.id}
              </div>
              <div className="mb-8 flex items-center justify-center p-5 rounded-2xl bg-white shadow-sm border border-slate-100 text-[#76BC21] group-hover:scale-110 group-hover:bg-[#76BC21] group-hover:text-white transition-all">
                <step.icon className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-[#1E2D5A] mb-4 uppercase tracking-tight group-hover:text-[#76BC21] transition-colors">
                {step.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium relative z-10">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UpskillingPath = () => {
  const cards = [
    { icon: Zap, title: 'Direct Access', desc: 'Frictionless enrollment with no screening requirements, designed for immediate start.' },
    { icon: Tv, title: 'Expert Sessions', desc: 'Attendance in high-intensity live training modules focused on specialized modern tools.' },
    { icon: Activity, title: 'Guided Practice', desc: 'Hands-on exercises and technical challenges reviewed by our senior instructional staff.' },
    { icon: CheckCircle, title: 'Track Finalization', desc: 'Successful completion of all module requirements and skill-specific assessments.' },
    { icon: Award, title: 'Skill Verification', desc: 'Official certification of module completion recognized by our global industry partners.' }
  ];

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="The Upskilling Path" 
          subtitle="Designed for professionals seeking immediate skill enhancement. A lightweight, high-impact flow focused on specific technical outcomes."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all h-full">
              <div className="bg-[#00A3E0]/5 p-5 rounded-3xl mb-10 text-[#00A3E0] group-hover:scale-110 group-hover:bg-[#00A3E0] group-hover:text-white transition-all">
                <card.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-[#1E2D5A] mb-5 uppercase tracking-tight">{card.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrackComparison = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          centered
          title="Track Comparison" 
          subtitle="Understand which pathway aligns with your professional objectives. Our tracks are built for different speeds of career growth."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 max-w-5xl mx-auto">
          <div className="bg-white p-14 rounded-[56px] shadow-2xl border-l-8 border-[#76BC21] relative overflow-hidden group">
            <h3 className="text-3xl font-black text-[#1E2D5A] mb-10 uppercase tracking-tight">Placement Track</h3>
            <ul className="space-y-6">
              {[
                'High-intensity, long-term commitment',
                'Rigorous candidate screening and assessment',
                'Deep institutional involvement in placement',
                'Comprehensive outcome-driven methodology',
                'Mandatory production-grade capstone projects'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500 font-medium leading-relaxed">
                  <CheckCircle className="w-6 h-6 text-[#76BC21] flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-14 rounded-[56px] shadow-2xl border-l-8 border-[#00A3E0] relative overflow-hidden group">
            <h3 className="text-3xl font-black text-[#1E2D5A] mb-10 uppercase tracking-tight">Upskilling Track</h3>
            <ul className="space-y-6">
              {[
                'Short-term, skill-specific focus',
                'No screening required for direct enrollment',
                'Focused on technical proficiency gains',
                'High flexibility for working professionals',
                'Skill verification through certification'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500 font-medium leading-relaxed">
                  <CheckCircle className="w-6 h-6 text-[#00A3E0] flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingTracks = ({ courses }: { courses: Course[] }) => {
  const trendingCourses = courses.filter(c => 
    c.id === 'ds1' || 
    c.id === 'da1' || 
    c.id === 'aa1'
  );

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <SectionHeading 
            title="Trending Tracks" 
            subtitle="Our most in-demand programs right now, designed to put you at the cutting edge of AI and engineering." 
          />
          <Link to="/courses" className="mb-16">
            <Button variant="outline" size="md" className="gap-3 px-8 border-slate-300">
              Browse Full Catalog <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {trendingCourses.map((course) => (
            <CourseCard key={course.id} course={course} trending />
          ))}
        </div>
        <div className="mt-20 flex justify-center lg:hidden">
          <Link to="/courses">
            <Button variant="primary" size="lg" className="w-full">See All Courses</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AppContext)!;
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="md:fixed md:top-12 w-full z-40 bg-white/70 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <BrandLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => {
              const isActive = item.path ? location.pathname === item.path : item.children ? item.children.some(child => location.pathname === child.path) : false;
              const hasChildren = !!item.children;

              if (hasChildren) {
                return (
                  <div key={item.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`text-m font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${isActive || dropdownOpen ? 'text-[#76BC21]' : 'text-slate-500 hover:text-[#1E2D5A]'}`}
                    >
                      {item.name} <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4">
                        <div className="flex flex-col gap-1">
                          {item.children!.map(child => (
                            <Link key={child.name} to={child.path} onClick={() => setDropdownOpen(false)} className="px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[#76BC21] hover:bg-slate-50 rounded-xl transition-all">
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-m font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-[#76BC21]' : 'text-slate-500 hover:text-[#1E2D5A]'}`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="h-6 w-[1px] bg-slate-200" />
            {user && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <LayoutDashboard className="w-4 h-4" /> Console
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#1E2D5A]">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-6 px-4 space-y-4 shadow-xl">
          {NAVIGATION.map((item) => (
            <div key={item.name} className="flex flex-col">
              {item.children ? (
                <>
                  <div className="text-slate-400 font-black uppercase tracking-widest text-[10px] py-2 pl-4 mb-2 bg-slate-50 rounded-lg">{item.name}</div>
                  {item.children.map(child => (
                    <Link key={child.name} to={child.path} className="block text-slate-600 font-bold uppercase tracking-widest py-3 pl-8 border-b border-slate-50 last:border-0" onClick={() => setIsOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </>
              ) : (
                <Link key={item.name} to={item.path} className="block text-slate-600 font-bold uppercase tracking-widest py-3 border-b border-slate-50 last:border-0" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          <div className="max-w-md">
            <Link to="/" className="mb-8 block">
              <BrandLogo />
            </Link>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
              Bridging the gap between ambitious talent and top-tier global industries.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/cirameti-academy/" target="_blank" rel="noreferrer" className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl hover:text-[#76BC21] transition-all hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/918319256019" target="_blank" rel="noreferrer" className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl hover:text-[#25D366] transition-all hover:-translate-y-1">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cirametiacademy?igsh=MXRkY2JvZm9rYnh4eg%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl hover:text-[#C13584] transition-all hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM12 7.8C14.3211 7.8 16.2 9.67893 16.2 12C16.2 14.3211 14.3211 16.2 12 16.2C9.67893 16.2 7.8 14.3211 7.8 12C7.8 9.67893 9.67893 7.8 12 7.8ZM18.4 6.2C18.4 6.77614 17.9761 7.2 17.4 7.2C16.8239 7.2 16.4 6.77614 16.4 6.2C16.4 5.62386 16.8239 5.2 17.4 5.2C17.9761 5.2 18.4 5.62386 18.4 6.2Z" />
                </svg>
              </a>
              <a href="https://youtube.com/@cirametiacademy?si=6uESgi48cT-IhEbI" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl hover:text-[#FF0000] transition-all hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.498 6.186a3 3 0 0 0-2.112-2.12C19.88 3.5 12 3.5 12 3.5s-7.88 0-9.386.566a3 3 0 0 0-2.112 2.12A31.02 31.02 0 0 0 0 12a31.02 31.02 0 0 0 .502 5.814 3 3 0 0 0 2.112 2.12C4.12 20.5 12 20.5 12 20.5s7.88 0 9.386-.566a3 3 0 0 0 2.112-2.12A31.02 31.02 0 0 0 24 12a31.02 31.02 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>
          
            <div className="md:text-right">
              <h4 className="text-[#1E2D5A] font-black mb-8 uppercase tracking-widest text-m">Platform</h4>
              <ul className="space-y-4 text-slate-500 font-medium text-m">
                <li><Link to="/about" className="hover:text-[#76BC21] transition-colors">About Us</Link></li>
                <li><Link to="/hire" className="hover:text-[#76BC21] transition-colors">Hire From Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#76BC21] transition-colors">Contact</Link></li>
              </ul>
            </div>
        </div>
        
        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          <p>&copy; 2026 Cirameti Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const TopBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full text-white z-50 md:fixed md:top-0 md:left-0" style={{ backgroundColor: 'rgb(30 45 90 / var(--tw-bg-opacity, 1))' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 md:h-12 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center items-center gap-2 sm:gap-3 flex-1 min-w-0 text-center sm:text-left">
          <div className="flex-shrink-0 flex items-center justify-center sm:justify-start">
            <Star className="w-5 h-5 text-[#76BC21]" />
          </div>
          <marquee behavior="scroll" direction="left"  scrollamount="10" className="ml-2">
            Viral Referral Program — Refer a friend to Cirameti Academy and get  ₹1200 guaranteed cashback on successful enrollment!
          </marquee>
 
          <span className="hidden md:inline-flex ml-3 items-center text-[#76BC21] bg-white/10 px-2 py-1 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 text-[#76BC21] mr-1" /> 
          </span>
        </div>

        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 flex justify-center sm:justify-end">
          <button onClick={() => navigate('/contact#enquiry-form')} className="bg-white text-[#00A3E0] font-bold px-4 py-2 rounded-full text-sm sm:px-4 sm:py-2 w-full sm:w-auto">
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { courses } = useContext(AppContext)!;
  
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden pt-28 pb-40 lg:pt-40 lg:pb-56 bg-white">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#76BC21]/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00A3E0]/5 rounded-full blur-[160px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#76BC21]/10 border border-[#76BC21]/20 text-[#76BC21] text-xs font-black uppercase tracking-[0.25em] mb-12">
            <Zap className="w-4 h-4" /> 
            <span>Advanced Career Acceleration</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-[#1E2D5A]">
            Reliability. Growth. <br />
            <span className="text-[#76BC21]">Excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mb-16 leading-relaxed font-medium">
            Step into a world-class educational ecosystem. We don't just teach technology; we cultivate the mindset and technical depth required to lead the global workforce.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/courses">
              <Button variant="primary" size="lg" className="rounded-2xl w-full sm:w-auto px-12">Explore Catalog</Button>
            </Link>
            <Link to="/hire">
              <Button variant="outline" size="lg" className="rounded-2xl w-full sm:w-auto px-12 uppercase">Hire From Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <BetterWayToLearn />
      <TrendingTracks courses={courses} />
      <PlacementJourney />
      <UpskillingPath />
      <TrackComparison />
      <CTASection />
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-40 pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Institutional Excellence" 
          subtitle="Cirameti Academy is an elite training ecosystem built on the principles of high-reliability engineering. We bridge the gap between academic theory and high-performing functional skill." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 mt-12">
          <div className="bg-[#1E2D5A] p-16 rounded-[64px] shadow-3xl relative overflow-hidden flex flex-col items-start min-h-[480px]">
            <div className="mb-12 flex items-center justify-center p-6 rounded-3xl bg-[#76BC21] text-white shadow-lg shadow-[#76BC21]/20">
              <Target className="w-10 h-10" />
            </div>
            <p className="text-xl leading-relaxed text-white/90 font-medium mb-12 max-w-md">
              To democratize high-end professional education through rigorous, placement-focused training.
            </p>
            <div className="space-y-6 mt-auto">
              {[
                'CAREER ACCELERATION',
                'TECHNICAL MASTERY',
                'INDUSTRY CONNECTIVITY'
              ].map(item => (
                <div key={item} className="flex items-center gap-4 text-[#76BC21] font-black text-sm tracking-[0.15em]">
                  <CheckCircle className="w-6 h-6" /> {item}
                </div>
              ))}
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#76BC21]/5 rounded-full blur-[100px]" />
          </div>

          <div className="bg-slate-50 p-16 rounded-[64px] shadow-sm border border-slate-100 flex flex-col items-start min-h-[480px]">
            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center justify-center p-6 rounded-3xl bg-[#00A3E0] text-white shadow-lg shadow-[#00A3E0]/20">
                <Compass className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-[#1E2D5A] uppercase tracking-tight">OUR VISION</h3>
            </div>
            <p className="text-xl leading-relaxed text-slate-500 font-medium mb-16 max-w-md">
              To become the definitive global benchmark for industry-ready talent.
            </p>
            <div className="w-full mt-auto">
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full w-[72%] bg-[#00A3E0] rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        <BetterWayToLearn lightBg={false} />
        <PlacementJourney />
        <UpskillingPath />
        <TrackComparison />
      </div>
      <CTASection />
    </div>
  );
};

// Products landing page to group Our Products items
const Products = () => (
  <div className="pt-48 pb-32 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeading
        title="Our Products"
        subtitle="Explore outcomes-driven training, career services and guidance."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Link to="/courses" className="block">
          <div className="p-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition">
            <h3 className="text-2xl font-black text-[#1E2D5A] mb-4">Courses</h3>
            <p className="text-slate-500">Outcome-focused placement tracks and upskilling programs with detailed curricula and project work.</p>
          </div>
        </Link>

        <Link to="/job-search" className="block">
          <div className="p-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition">
            <h3 className="text-2xl font-black text-[#1E2D5A] mb-4">Job Search</h3>
            <p className="text-slate-500">Premium placement services — resume marketing, assessments and interview orchestration for top talent.</p>
          </div>
        </Link>

        <Link to="/free-guidance" className="block">
          <div className="p-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition">
            <h3 className="text-2xl font-black text-[#1E2D5A] mb-4">Free Career Guidance</h3>
            <p className="text-slate-500">One-on-one mentorship, resume reviews and mock interviews to help you plan your next career step.</p>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link to="/contact">
          <Button variant="primary" size="lg">Get In Touch</Button>
        </Link>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const { courses } = useContext(AppContext)!;
  const [activeTab, setActiveTab] = useState<'Placement' | 'Upskilling'>('Placement');
  const filteredCourses = courses.filter(course => course.category === activeTab);

  return (
    <div className="pt-40 pb-0 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Curriculum Catalog" 
          subtitle="Explore our specialized tracks. Choose between comprehensive Placement programs or targeted Upskilling modules." 
          centered
        />
        
        <div className="flex justify-center mb-24">
          <div className="inline-flex bg-white p-2.5 rounded-[36px] shadow-2xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('Placement')}
              className={`px-14 py-6 rounded-[28px] font-black uppercase tracking-[0.15em] text-sm transition-all duration-300 ${activeTab === 'Placement' ? 'bg-[#1E2D5A] text-white shadow-xl -translate-y-1' : 'text-slate-400 hover:text-[#1E2D5A]'}`}
            >
              Placement Track
            </button>
            <button 
              onClick={() => setActiveTab('Upskilling')}
              className={`px-14 py-6 rounded-[28px] font-black uppercase tracking-[0.15em] text-sm transition-all duration-300 ${activeTab === 'Upskilling' ? 'bg-[#1E2D5A] text-white shadow-xl -translate-y-1' : 'text-slate-400 hover:text-[#1E2D5A]'}`}
            >
              Upskilling Courses
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      <CTASection />
    </div>
  );
};

const Hire = () => {
  const benefits = [
    { title: 'Project-First Experience', desc: 'Our students build real-world, production-ready applications as part of their graduation.' },
    { title: 'No Placement Fees', desc: 'We focus on outcomes — companies get access to talent with zero hiring cost.' },
    { title: 'Customized Hiring Support', desc: 'Talent shortlisting based on your tech stack, domain, and hiring requirements.' },
    { title: 'Industry-Ready Soft Skills', desc: 'Graduates are trained in communication, teamwork, and interview readiness.' }
  ];

  const handleHireClick = () => {
    window.open('https://forms.gle/39om2aa9UFvkkCFC7', '_blank');
  };

  return (
    <div className="pt-40 pb-0 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h1 className="text-5xl font-extrabold text-[#1E2D5A] mb-8 tracking-tight uppercase">Talent Acquisition</h1>
          <p className="text-xl text-slate-500 font-medium">
            Hire pre-vetted, industry-ready talent directly from our graduating cohorts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-[#1E2D5A] mb-12 tracking-tight uppercase">Why Hire Cirameti Graduates?</h2>
            <div className="space-y-10">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-6 h-6 text-[#76BC21] font-bold" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1E2D5A] mb-3 group-hover:text-[#76BC21] transition-colors uppercase">{benefit.title}</h4>
                    <p className="text-slate-500 text-base leading-relaxed font-medium">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="bg-white rounded-[48px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-50 flex flex-col h-full">
              <div className="rounded-[32px] overflow-hidden h-72 mb-12 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow text-center lg:text-left">
                <h3 className="text-3xl font-bold text-[#1E2D5A] mb-6 tracking-tight uppercase">
                  Looking to Hire Skilled Talent?
                </h3>
                <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium">
                  Partner with Cirameti Academy to access a curated pool of job-ready professionals.
                </p>

                <button 
                  onClick={handleHireClick}
                  className="w-full bg-[#76BC21] hover:bg-[#65a31c] text-white py-5 rounded-2xl text-xl font-bold shadow-xl shadow-[#76BC21]/20 transition-all active:scale-[0.98] uppercase tracking-wider"
                >
                  Hire From Cirameti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
};

const Blog = () => {
  const { blogs } = useContext(AppContext)!;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const closeModal = () => setSelectedPost(null);

  return (
    <div className="pt-40 pb-0 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="Insights" subtitle="Deep dives into technology, institutional excellence, and career evolution." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-[48px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="h-80 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#1E2D5A]">
                  {post.category}
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-3xl font-black mb-6 text-[#1E2D5A] leading-tight group-hover:text-[#76BC21] transition-colors uppercase">{post.title}</h3>
                <p className="text-slate-500 font-medium mb-12 line-clamp-3 text-lg leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto pt-8 border-t border-slate-50">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-[#00A3E0] font-black uppercase tracking-widest text-xs flex items-center gap-2 group/btn"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-100/50 rounded-[48px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center p-20 text-center min-h-[600px] group">
            <div className="bg-white p-6 rounded-full shadow-sm mb-8 group-hover:scale-110 transition-transform">
              <Loader2 className="w-12 h-12 text-[#76BC21] animate-spin" />
            </div>
            <h3 className="text-2xl font-black text-[#1E2D5A] mb-4 uppercase tracking-tight">Stay Tuned</h3>
            <p className="text-slate-400 font-medium text-lg max-w-xs leading-relaxed">
              We are currently drafting more insights on system design and cloud optimization.
            </p>
          </div>
        </div>
      </div>
      <CTASection />

      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#1E2D5A]/80 backdrop-blur-lg" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[56px] shadow-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2D5A] to-transparent opacity-60" />
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>
              <div className="absolute bottom-12 left-12 right-12 text-left">
                <div className="flex items-center gap-4 mb-4 text-white/80 text-xs font-bold uppercase tracking-widest">
                  <span className="bg-[#76BC21] px-4 py-1.5 rounded-full text-white">{selectedPost.category}</span>
                </div>
                <h2 className="text-2xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            <div className="p-8 md:p-20 overflow-y-auto custom-scrollbar flex-grow text-left">
              <div className="max-w-3xl mx-auto space-y-10">
                {selectedPost.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-center">
                <Button variant="outline" size="md" onClick={closeModal} className="px-12 py-5 rounded-2xl font-black tracking-widest border-slate-200 uppercase">Close Article</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Contact: React.FC = () => {
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz39xbBZtAXw0QjglKoYvhxircsZuJKSfEZkNSYEz2rMo5dVdtE57CxcoOPiyb82fhE/exec';
  const WHATSAPP_LINK = "https://wa.me/918319256019";
  const { hash } = useLocation();
  const enquiryBoxRef = useRef<HTMLDivElement>(null);

  // smooth scroll if user arrives with #enquiry-form
  useEffect(() => {
    if (hash === '#enquiry-form' && enquiryBoxRef.current) {
      setTimeout(() => enquiryBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [hash]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Job oriented course',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('program', formData.program);
      data.append('message', formData.message);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', program: 'Job oriented course', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white p-8 md:p-20 rounded-[2rem] shadow-2xl shadow-emerald-900/10 border border-slate-100 max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-50 p-6 md:p-8 rounded-full">
              <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-6 md:mb-8 tracking-tight">Submission Successful</h2>
          <p className="text-lg md:text-2xl text-slate-500 mb-8 md:mb-12 font-medium leading-relaxed max-w-xl mx-auto">
            Your inquiry is recorded. Our academic lead will reach out to you shortly at <span className="text-blue-900 font-black">+91 8319256019</span>.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 md:px-16 py-3 md:py-6 bg-blue-900 text-white rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:bg-emerald-600 transition-all uppercase tracking-[0.2em] shadow-md"
          >
            New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12" ref={enquiryBoxRef}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E2D5A] mb-3">Contact Us</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Have a question or want to register? Fill the form and our team will reach out within 24 hours.</p>
        <div className="mt-6 h-1 w-28 bg-[#76BC21] rounded-full mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-10 w-full overflow-hidden">
          <div className="p-6 sm:p-12 bg-slate-50 rounded-[40px] sm:rounded-[48px] border border-slate-100 shadow-sm text-center">
            <h4 className="font-black text-xl sm:text-2xl mb-8 text-[#1E2D5A] uppercase tracking-wider border-b border-slate-200 pb-4">Admissions & Support</h4>
            
            <div className="space-y-8 mb-12">
              <div>
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 uppercase">Contact Emails</h5>
                <div className="space-y-4">
                  <p className="text-[#00A3E0] font-black text-base sm:text-xl hover:underline cursor-pointer break-all sm:break-normal leading-tight">sales@cirametiacademy.in</p>
                  <p className="text-[#00A3E0] font-black text-base sm:text-xl hover:underline cursor-pointer break-all sm:break-normal leading-tight">contact@cirametiacademy.in</p>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 uppercase">Admin Hotlines</h5>
                <div className="space-y-2">
                  <p className="text-[#1E2D5A] font-black text-lg sm:text-xl">+91 6304443883</p>
                  <p className="text-[#1E2D5A] font-black text-lg sm:text-xl">+91 8319256019</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 sm:gap-12 pt-8 border-t border-slate-200">
               <a href="tel:+918319256019" className="flex flex-col items-center gap-2 group">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#76BC21] group-hover:bg-[#76BC21] group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">Voice Call</span>
               </a>
               <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest uppercase">WhatsApp</span>
               </a>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 rounded-[2rem] shadow-2xl border border-[#1E2D5A] relative max-w-2xl mx-auto" style={{ boxShadow: '0 24px 60px rgba(14,25,50,0.18)', backgroundColor: 'rgb(30 45 90 / var(--tw-bg-opacity, 1))' }}>
          <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="block text-[10px] font-black text-white/90 mb-3 uppercase tracking-[0.25em]">Full Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-[#1E2D5A] focus:ring-2 focus:ring-[#1E2D5A]/10 text-base text-[#1E2D5A] font-medium placeholder:text-slate-400 transition-all outline-none shadow-sm" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white/90 mb-3 uppercase tracking-[0.25em]">Mobile Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 XXXXX XXXXX" 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-[#1E2D5A] focus:ring-2 focus:ring-[#1E2D5A]/10 text-base text-[#1E2D5A] font-medium placeholder:text-slate-400 transition-all outline-none shadow-sm" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-white/90 mb-3 uppercase tracking-[0.25em]">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="you@domain.com" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-[#1E2D5A] focus:ring-2 focus:ring-[#1E2D5A]/10 text-base text-[#1E2D5A] font-medium placeholder:text-slate-400 transition-all outline-none shadow-sm" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-white/90 mb-4 uppercase tracking-[0.25em]">Select Program</label>
              <div className="relative">
                <select 
                  name="program"
                  value={formData.program}
                  onChange={e => setFormData({...formData, program: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-[#1E2D5A] focus:ring-2 focus:ring-[#1E2D5A]/10 text-base text-[#1E2D5A] font-medium transition-all appearance-none outline-none cursor-pointer shadow-sm"
                >
                  <option value="Job oriented course">Job oriented course</option>
                  <option value="Upskilling course">Upskilling course</option>
                  <option value="Job search services">Job search services</option>
                  <option value="Free Career guidance consultation">Free Career guidance consultation</option>
                </select>
                <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-white/90 mb-3 uppercase tracking-[0.25em]">Your Career Goals</label>
              <textarea 
                name="message"
                rows={4} 
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Tell us about your background or requirements..." 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-[#1E2D5A] focus:ring-2 focus:ring-[#1E2D5A]/10 text-base text-[#1E2D5A] font-medium placeholder:text-slate-400 transition-all outline-none resize-none shadow-sm"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="group w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all shadow-md disabled:opacity-50 flex items-center justify-center space-x-3 uppercase tracking-[0.15em]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  const { leads, logout, user } = useContext(AppContext)!;
  const navigate = useNavigate();
  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);
  if (!user) return null;
  return (
    <div className="min-h-screen bg-slate-100 flex p-8 lg:p-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-16">
          <BrandLogo />
          <Button onClick={() => { logout(); navigate('/'); }} variant="outline">Logout</Button>
        </div>
        <div className="bg-white rounded-[56px] shadow-2xl border border-slate-200 p-12 lg:p-20">
          <h3 className="text-3xl font-black text-[#1E2D5A] uppercase tracking-tight mb-12">Active Leads ({leads.length})</h3>
          <div className="space-y-6">
            {leads.map(l => (
              <div key={l.id} className="p-8 bg-slate-50 rounded-[32px] flex flex-col md:flex-row justify-between items-start md:items-center border border-slate-100">
                <div>
                  <div className="font-black text-2xl text-[#1E2D5A]">{l.name}</div>
                  <div className="text-slate-500">{l.email}</div>
                </div>
                <div className="mt-4 md:mt-0 px-6 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-widest">{l.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const { login } = useContext(AppContext)!;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); login({ id: '1', name: 'System Admin', email, role: 'Admin' }); navigate('/admin'); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20">
      <div className="max-md w-full bg-white p-12 md:p-20 rounded-[64px] shadow-3xl text-center border border-slate-100">
        <BrandLogo className="mb-10 justify-center" />
        <h2 className="text-3xl font-black mb-10 text-[#1E2D5A] uppercase tracking-tight">Portal Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="email" placeholder="Email" required className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none font-bold" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 outline-none font-bold" />
          <Button type="submit" variant="primary" className="w-full py-6 text-xl rounded-3xl font-black uppercase tracking-wider">Authenticate</Button>
        </form>
      </div>
    </div>
  );
};

// Course detail page
const CourseDetail = () => {
  const { id } = useParams() as { id?: string };
  const { courses } = useContext(AppContext)!;
  const course = courses.find(c => c.id === id);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!course) return (
    <div className="pt-48 pb-32 text-center min-h-screen">
      <h2 className="text-3xl font-black mb-8">Course Not Found</h2>
      <Button onClick={() => navigate('/courses')}>Back to Catalog</Button>
    </div>
  );

  return (
    <div className="pt-32 bg-white min-h-screen">
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-[#76BC21] font-black uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all">
            <ChevronLeft className="w-4 h-4" /> Back to Catalog
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-[#76BC21]/10 border border-[#76BC21]/20 text-[#76BC21] text-xs font-black uppercase tracking-widest mb-6">
                {course.category}-Oriented Track
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#1E2D5A] mb-8 leading-tight tracking-tight">{course.title}</h1>
              <div className="flex flex-wrap gap-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200"><Clock className="w-5 h-5 text-[#00A3E0]" /></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</div>
                    <div className="text-lg font-bold text-[#1E2D5A]">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200"><Award className="w-5 h-5 text-[#76BC21]" /></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Level</div>
                    <div className="text-lg font-bold text-[#1E2D5A]">{course.level}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src={course.image} alt={course.title} className="rounded-[48px] shadow-3xl w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h2 className="text-3xl font-black text-[#1E2D5A] mb-8 uppercase tracking-tight">Program Overview</h2>
              <p className="text-xl leading-relaxed text-slate-600 font-medium">{course.description}</p>
            </section>
            <section>
              <h2 className="text-3xl font-black text-[#1E2D5A] mb-12 uppercase tracking-tight">What You Will Learn</h2>
              <div className="space-y-12">
                {(course.curriculumModules || []).map((module, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl font-black text-slate-300 group-hover:bg-[#76BC21] group-hover:text-white transition-all">{idx + 1}</div>
                    <div>
                      <h4 className="text-2xl font-extrabold text-[#1E2D5A] mb-4">{module.title}</h4>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed">{(module as any).description || ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="p-10 bg-slate-50 border border-slate-100 rounded-[40px] sticky top-32">
              <h3 className="text-2xl font-black text-[#1E2D5A] mb-8">Program Details</h3>
              <ul className="space-y-6">
                {(course.whoThisProgramIsFor || []).map((who, i) => (
                  <li key={i} className="flex gap-3 text-lg text-slate-600 font-medium"><CheckCircle className="w-6 h-6 text-[#76BC21]" />{who}</li>
                ))}
              </ul>
              <div className="mt-12 pt-12 border-t border-slate-200">
                <div className="text-4xl font-black text-[#1E2D5A] mb-2">{course.price}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">One-time Investment</div>
                <Link to="/contact"><Button variant="primary" size="lg" className="w-full py-6 text-xl rounded-2xl">Enrol in Program</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Job Search page
const JobSearch = () => (
  <div className="pt-48 pb-32 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-xs font-black uppercase tracking-[0.25em] mb-12"><Handshake className="w-4 h-4" /> <span>Accelerated Career Placement</span></div>
      <SectionHeading title="Professional Job Search Services" subtitle="Exclusive resume marketing and interview arrangement for high-merit candidates. Bridging the gap between your skills and global employers." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
        <div className="space-y-12">
          <div className="p-12 bg-slate-50 border border-slate-100 rounded-[48px]">
            <h3 className="text-3xl font-black text-[#1E2D5A] mb-8">The Process</h3>
            <ul className="space-y-8">
              {[{ title: 'Resume Marketing', desc: 'We leverage our 200+ partner companies to place your profile directly with decision makers.' },{ title: 'Skills Assessment', desc: 'Candidates are thoroughly assessed for technical merit before we take you to interviews.' },{ title: 'Global Opportunities', desc: 'Access exclusive roles not listed on traditional job boards.' },{ title: 'Pay After Placement', desc: 'Nominal fee of ₹25,000. Pay only after you secure your role.' }].map((step, idx) => (
                <li key={idx} className="flex gap-6"><div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-[#76BC21] border border-slate-200">{idx + 1}</div><div><h4 className="text-xl font-black text-[#1E2D5A] mb-2">{step.title}</h4><p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-[#1E2D5A] p-16 rounded-[48px] text-white flex flex-col justify-center text-center">
          <div className="bg-[#76BC21] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl"><TrendingUp className="w-10 h-10 text-white" /></div>
          <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Access Premium Roles</h3>
          <p className="text-xl text-slate-300 font-medium mb-12 leading-relaxed">If you have the skills but lack the opportunities, we market your profile and arrange interviews. External students are welcome to apply after assessment.</p>
          <div className="text-5xl font-black text-[#76BC21] mb-2">₹25,000</div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-12">Pay Only After We Place You</div>
          <Link to="/contact"><Button variant="primary" size="lg" className="w-full py-6 rounded-2xl text-xl">Apply for Service</Button></Link>
        </div>
      </div>
    </div>
  </div>
);

// Free Career Guidance page
const FreeGuidance = () => (
  <div className="pt-48 pb-32 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeading title="Free Career Guidance Program" subtitle="Roadmap your tech journey with our expert mentors." centered />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
        {[{ icon: <ClipboardCheck className="w-8 h-8" />, title: 'Profile Check', desc: 'Honest assessment of your current professional standing.' },{ icon: <FileText className="w-8 h-8" />, title: 'Resume Review', desc: 'Structural feedback to pass modern ATS filters.' },{ icon: <Users className="w-8 h-8" />, title: 'Mock Interviews', desc: 'Live tech simulation with expert performance feedback.' },{ icon: <Compass className="w-8 h-8" />, title: 'Career Consultation', desc: '1-on-1 strategic roadmap planning.' }].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-2xl transition-all text-center"><div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#00A3E0] mx-auto mb-8 border border-slate-100">{item.icon}</div><h4 className="text-xl font-black text-[#1E2D5A] mb-4">{item.title}</h4><p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p></div>
        ))}
      </div>
      <div className="mt-24 text-center"><Link to="/contact"><Button variant="secondary" size="lg" className="rounded-2xl px-12">Book Free Consultation</Button></Link></div>
    </div>
  </div>
);

const Main = () => {
  const location = useLocation();
  const isAdminView = location.pathname.startsWith('/admin') || location.pathname === '/login';
  return (
    <div className={`flex flex-col min-h-screen bg-white custom-scrollbar overflow-x-hidden ${!isAdminView ? 'pt-12' : ''}`}>
      {!isAdminView && <>
        <TopBanner />
        <Navbar />
      </>}
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-products" element={<Products />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/free-guidance" element={<FreeGuidance />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminView && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppProvider>
      <Main />
    </AppProvider>
  </Router>
);

export default App;
