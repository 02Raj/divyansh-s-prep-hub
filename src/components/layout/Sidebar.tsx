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
  ChevronDown,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
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
    <aside 
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r border-border bg-sidebar py-4 lg:block scrollbar-thin transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="px-3 mb-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange?.(!collapsed)}
          className="h-8 w-8 rounded-lg"
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="space-y-1 px-3">
        {categories.map((category) => (
          <div key={category.id}>
            {category.subcategories ? (
              <>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    'sidebar-link w-full',
                    collapsed ? 'justify-center px-2' : 'justify-between',
                    isParentActive(category.id) && 'active'
                  )}
                  title={collapsed ? category.name : undefined}
                >
                  <span className="flex items-center gap-3">
                    {iconMap[category.icon]}
                    {!collapsed && category.name}
                  </span>
                  {!collapsed && (
                    <ChevronDown 
                      className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        expandedCategories.includes(category.id) && 'rotate-180'
                      )} 
                    />
                  )}
                </button>
                {!collapsed && expandedCategories.includes(category.id) && (
                  <div className="ml-7 mt-1 space-y-1">
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
                  collapsed ? 'justify-center px-2' : '',
                  isActive(pathMap[category.id]) && 'active'
                )}
                title={collapsed ? category.name : undefined}
              >
                {iconMap[category.icon]}
                {!collapsed && category.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
