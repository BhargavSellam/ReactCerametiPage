import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, BookOpen, Users, Briefcase, ChevronRight, 
  LayoutDashboard, LogIn, Mail, Phone, MapPin, Search, 
  Filter, TrendingUp, Award, Clock, ArrowRight, Twitter, 
  Linkedin, CheckCircle, Database, FileText, Settings, LogOut, Sparkles, 
  Target, Compass, Zap, Star, Tv, MessageSquare, Layout, Shield, 
  Activity, Globe, GraduationCap, Check, Loader2, MessageCircle, Code, Cpu, Layers, Terminal
} from 'lucide-react';
import { INITIAL_COURSES, INITIAL_BLOGS, NAVIGATION, COLORS } from './constants';
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
    <div className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 hover:-translate-y-3 flex flex-col h-full relative">
      {trending && (
        <div className="absolute top-5 right-5 z-10 bg-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-[#76BC21]/20">
          <Star className="w-4 h-4 text-[#76BC21] fill-[#76BC21]" />
          <span className="text-[11px] font-black text-[#1E2D5A] uppercase tracking-widest">Trending</span>
        </div>
      )}
      <div className="relative h-72 overflow-hidden flex-shrink-0">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200";
          }}
        />
        <div className="absolute bottom-6 left-6 px-5 py-2 bg-[#76BC21] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl">
          {course.level}
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-black mb-5 text-[#1E2D5A] group-hover:text-[#76BC21] transition-colors leading-tight uppercase">
          {course.title}
        </h3>
        <p className="text-slate-500 text-sm mb-12 flex-grow leading-relaxed font-medium">
          {course.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
          <Button 
            variant="outline" 
            size="md" 
            className="w-full py-4 text-[#1E2D5A] border-slate-300 hover:border-[#1E2D5A] uppercase tracking-[0.1em] text-[11px] font-black rounded-2xl shadow-sm"
            onClick={() => openCurriculum(course)}
          >
            View Curriculum
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            className="w-full py-4 bg-[#00A3E0] hover:bg-[#0089bd] text-white uppercase tracking-[0.1em] text-[11px] font-black shadow-lg rounded-2xl"
            onClick={() => navigate('/contact#enquiry-form')}
          >
            Register Now
          </Button>
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
    { id: '07', icon: Layout, title: 'LIVE INDUSTRY SIMULATION', desc: 'Mandatory capstone project involving a production-grade application that solves a verifiable industry business problem.' },
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
    c.id === 'p1' || 
    c.id === 'p4' || 
    c.id === 'u1'    
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
  const { user } = useContext(AppContext)!;
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <BrandLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-m font-bold uppercase tracking-widest transition-colors ${location.pathname === item.path ? 'text-[#76BC21]' : 'text-slate-500 hover:text-[#1E2D5A]'}`}
              >
                {item.name}
              </Link>
            ))}
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
            <Link key={item.name} to={item.path} className="block text-slate-600 font-bold uppercase tracking-widest py-3 border-b border-slate-50 last:border-0" onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
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
              <a href="https://wa.me/917989155879" target="_blank" rel="noreferrer" className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl hover:text-[#25D366] transition-all hover:-translate-y-1">
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

const Contact = () => {
  const WHATSAPP_LINK = "https://wa.me/917989155879";
  const GOOGLE_FORM_LINK = "https://forms.gle/5G1Zg8dDHmsfnSUf8";
  const { hash } = useLocation();
  const enquiryBoxRef = useRef<HTMLDivElement>(null);

  // Manual smooth scroll effect for targeted hash
  useEffect(() => {
    if (hash === '#enquiry-form' && enquiryBoxRef.current) {
      setTimeout(() => {
        enquiryBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [hash]);

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="Connect With Us" subtitle="Start your professional transformation today." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 text-center items-center">
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
                    <p className="text-[#1E2D5A] font-black text-lg sm:text-xl">+91 7989155879</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-8 sm:gap-12 pt-8 border-t border-slate-200">
                 <a href="tel:+917989155879" className="flex flex-col items-center gap-2 group">
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

          <div 
            id="enquiry-form" 
            ref={enquiryBoxRef}
            className="bg-[#1E2D5A] p-10 md:p-20 rounded-[48px] sm:rounded-[64px] shadow-3xl text-center scroll-mt-32 transition-all duration-700 w-full"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-white leading-tight uppercase tracking-tight">Send a Message</h3>
            <p className="text-white/60 text-lg mb-12 max-w-sm mx-auto font-medium">
              We've simplified our enquiry process. Please click below to provide your details via our secure application form.
            </p>
            <div className="flex flex-col gap-6">
              <a href={GOOGLE_FORM_LINK} target="_blank" rel="noreferrer" className="w-full">
                <Button variant="primary" size="lg" className="w-full py-6 sm:py-8 text-lg sm:text-xl rounded-2xl sm:rounded-3xl font-black group shadow-2xl shadow-[#76BC21]/40 uppercase tracking-wider">
                   CONTACT AND REGISTER <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </a>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-white/20" />
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Redirects to secure form</p>
                <div className="h-[1px] w-8 bg-white/20" />
              </div>
            </div>
          </div>
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

const Main = () => {
  const location = useLocation();
  const isAdminView = location.pathname.startsWith('/admin') || location.pathname === '/login';
  return (
    <div className="flex flex-col min-h-screen bg-white custom-scrollbar overflow-x-hidden">
      {!isAdminView && <Navbar />}
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
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
