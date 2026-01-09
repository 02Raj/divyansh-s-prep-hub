import { InterviewTopic } from '@/data/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface QuestionSectionProps {
  topic: InterviewTopic;
  index: number;
  isActive: boolean;
}

const difficultyColors = {
  easy: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  hard: 'bg-destructive/10 text-destructive border-destructive/20'
};

export function QuestionSection({ topic, index, isActive }: QuestionSectionProps) {
  return (
    <section
      id={topic.id}
      className={cn('question-section', isActive && 'active')}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold text-foreground">
          <span className="text-primary mr-2">Q{index + 1}.</span>
          {topic.name}
        </h3>
        <Badge 
          variant="outline" 
          className={cn('shrink-0 capitalize', difficultyColors[topic.difficulty])}
        >
          {topic.difficulty}
        </Badge>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        {topic.description}
      </p>

      {topic.bulletPoints && topic.bulletPoints.length > 0 && (
        <ul className="space-y-2 mb-4">
          {topic.bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {topic.codeExample && (
        <div className="code-block">
          <div className="flex items-center justify-between border-b border-border/20 bg-code/50 px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">Example</span>
          </div>
          <pre className="overflow-x-auto">
            <code>{topic.codeExample}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
