export interface InterviewTopic {
  id: string;
  name: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  codeExample?: string;
  bulletPoints?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: { id: string; name: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface InterviewSet {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}
