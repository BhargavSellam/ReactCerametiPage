
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Upskilling' | 'Placement' | 'Foundational';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  instructor: string;
  outcomes: string[];
  tools?: string[];
  image: string;
  // Optional fields used by the course detail page
  curriculumModules?: { title: string; description?: string }[];
  whoThisProgramIsFor?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  status: 'Published' | 'Draft';
  tags: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'Student' | 'Employer';
  date: string;
}

export type UserRole = 'Admin' | 'Editor' | 'Guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}
