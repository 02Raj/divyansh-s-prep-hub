import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { interviewSets } from '@/data/interview-sets';
import { Badge } from '@/components/ui/badge';
import { FileQuestion, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const difficultyColors = {
  easy: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  hard: 'bg-destructive/10 text-destructive border-destructive/20'
};

export default function InterviewPrepPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Interview Prep' }]} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Interview Preparation Sets
        </h1>
        <p className="mb-8 text-muted-foreground">
          Curated question sets organized by role and difficulty level
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {interviewSets.map((set) => (
            <article 
              key={set.id} 
              className="content-card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  {set.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn('capitalize text-xs', difficultyColors[set.difficulty])}
                >
                  {set.difficulty}
                </Badge>
              </div>

              <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {set.title}
              </h2>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {set.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileQuestion className="h-4 w-4" />
                  {set.questionCount} Questions
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  {set.difficulty}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
