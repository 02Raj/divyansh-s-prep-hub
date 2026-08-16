import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { systemDesignNav } from '@/data/system-design-nav';
import { BookOpen } from 'lucide-react';

export default function SystemDesignPage() {
  const [activeSectionId, setActiveSectionId] = useState(systemDesignNav[0].items[0].id);

  const getActiveComponent = () => {
    for (const section of systemDesignNav) {
      const item = section.items.find(i => i.id === activeSectionId);
      if (item) {
        const Component = item.component;
        return <Component />;
      }
    }
    return <div className="p-8 text-center text-muted-foreground">Content coming soon.</div>;
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-r border-border bg-muted/20 flex-shrink-0">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6 text-foreground font-semibold">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>System Design Course</span>
              </div>
              
              <div className="space-y-6">
                {systemDesignNav.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      {section.title}
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSectionId(item.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md transition-colors",
                              activeSectionId === item.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-12">
            <Breadcrumb 
              items={[
                { label: 'Home', path: '/' }, 
                { label: 'Interview Prep', path: '/interview-prep' },
                { label: 'System Design' }
              ]} 
            />
            <div className="mt-8">
              {getActiveComponent()}
            </div>
          </div>
        </main>
        
      </div>
    </Layout>
  );
}
