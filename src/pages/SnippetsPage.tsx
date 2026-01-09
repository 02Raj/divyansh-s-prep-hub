import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { SearchInput } from '@/components/topics/SearchInput';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

const snippets: Snippet[] = [
  {
    id: 'js-debounce',
    title: 'Debounce Function',
    language: 'JavaScript',
    description: 'Limit how often a function can be called',
    code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`
  },
  {
    id: 'java-singleton',
    title: 'Thread-Safe Singleton',
    language: 'Java',
    description: 'Double-checked locking singleton pattern',
    code: `public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`
  },
  {
    id: 'ts-deep-clone',
    title: 'Deep Clone Object',
    language: 'TypeScript',
    description: 'Create a deep copy of an object',
    code: `function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}`
  },
  {
    id: 'sql-pagination',
    title: 'Pagination Query',
    language: 'SQL',
    description: 'Efficient pagination with row count',
    code: `SELECT 
    *,
    COUNT(*) OVER() as total_count
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT :limit
OFFSET :offset;`
  },
  {
    id: 'react-custom-hook',
    title: 'useLocalStorage Hook',
    language: 'React',
    description: 'Persist state to localStorage',
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`
  }
];

export default function SnippetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout showSidebar={false}>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Snippets' }]} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Code Snippets
        </h1>
        <p className="mb-6 text-muted-foreground">
          Useful code snippets for your projects
        </p>

        <div className="mb-8 max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search snippets..."
          />
        </div>

        <div className="grid gap-6">
          {filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="content-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-foreground mb-1">
                    {snippet.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {snippet.description}
                  </p>
                </div>
                <Badge variant="secondary">{snippet.language}</Badge>
              </div>

              <div className="code-block relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(snippet.code, snippet.id)}
                >
                  {copiedId === snippet.id ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="pr-12">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No snippets found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
