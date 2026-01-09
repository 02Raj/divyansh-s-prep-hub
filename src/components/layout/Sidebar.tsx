import { Link, useLocation } from 'react-router-dom';
import { 
  Code2, 
  Component, 
  Coffee, 
  Leaf, 
  Database, 
  Atom, 
  BookOpen, 
  GraduationCap, 
  Mail,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  'code-2': <Code2 className="h-4 w-4" />,
  'component': <Component className="h-4 w-4" />,
  'coffee': <Coffee className="h-4 w-4" />,
  'leaf': <Leaf className="h-4 w-4" />,
  'database': <Database className="h-4 w-4" />,
  'atom': <Atom className="h-4 w-4" />,
  'book-open': <BookOpen className="h-4 w-4" />,
  'graduation-cap': <GraduationCap className="h-4 w-4" />,
  'mail': <Mail className="h-4 w-4" />
};

const pathMap: Record<string, string> = {
  'javascript': '/topics/javascript',
  'angular': '/topics/angular',
  'java': '/topics/java',
  'springboot': '/topics/springboot',
  'databases': '/topics/databases',
  'sql': '/topics/databases/sql',
  'mongodb': '/topics/databases/mongodb',
  'react': '/topics/react',
  'blogs': '/blogs',
  'interview-prep': '/interview-prep',
  'contact': '/contact'
};

export function Sidebar() {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['databases']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (categoryId: string) => location.pathname.startsWith(pathMap[categoryId]);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-sidebar py-6 lg:block scrollbar-thin">
      <nav className="space-y-1 px-3">
        {categories.map((category) => (
          <div key={category.id}>
            {category.subcategories ? (
              <>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    'sidebar-link w-full justify-between',
                    isParentActive(category.id) && 'active'
                  )}
                >
                  <span className="flex items-center gap-3">
                    {iconMap[category.icon]}
                    {category.name}
                  </span>
                  <ChevronDown 
                    className={cn(
                      'h-4 w-4 transition-transform',
                      expandedCategories.includes(category.id) && 'rotate-180'
                    )} 
                  />
                </button>
                {expandedCategories.includes(category.id) && (
                  <div className="ml-7 mt-1 space-y-1 animate-fade-in">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={pathMap[sub.id]}
                        className={cn(
                          'sidebar-link text-sm',
                          isActive(pathMap[sub.id]) && 'active'
                        )}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={pathMap[category.id]}
                className={cn(
                  'sidebar-link',
                  isActive(pathMap[category.id]) && 'active'
                )}
              >
                {iconMap[category.icon]}
                {category.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
