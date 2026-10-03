import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { systemDesignNav } from '@/data/system-design-nav';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const allLessons = systemDesignNav.flatMap(section => section.items);

export default function SystemDesignPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedLesson = searchParams.get('lesson');
  const activeIndex = Math.max(0, allLessons.findIndex(item => item.id === requestedLesson));
  const activeLesson = allLessons[activeIndex];

  const selectLesson = (id: string) => {
    setSearchParams({ lesson: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveComponent = () => {
    const Component = activeLesson.component;
    return <Component />;
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-r border-border bg-muted/20 flex-shrink-0">
          <ScrollArea className="max-h-[45vh] md:h-[calc(100vh-4rem)] md:max-h-none">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2 text-foreground font-semibold">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>System Design Course</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                24 guided lessons · HLD + LLD · Java/Spring Boot. Start with the roadmap or jump to a revision gap.
              </p>
              
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
                            onClick={() => selectLesson(item.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md transition-colors",
                              activeLesson.id === item.id
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
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
                <span className="font-medium text-foreground">Lesson {activeIndex + 1} of {allLessons.length}</span>
                <span className="text-muted-foreground">{activeLesson.title}</span>
              </div>
              {getActiveComponent()}
              <div className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6">
                <Button
                  variant="outline"
                  disabled={activeIndex === 0}
                  onClick={() => selectLesson(allLessons[activeIndex - 1].id)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <div className="hidden text-center text-xs text-muted-foreground sm:block">
                  Follow the order once, then revise by topic.
                </div>
                <Button
                  disabled={activeIndex === allLessons.length - 1}
                  onClick={() => selectLesson(allLessons[activeIndex + 1].id)}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
        
      </div>
    </Layout>
  );
}
