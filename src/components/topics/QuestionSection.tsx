import { InterviewTopic } from '@/data/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface QuestionSectionProps {
  topic: InterviewTopic;
  index: number;
  isActive: boolean;
}

const difficultyConfig = {
  easy: { 
    class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    label: 'Easy'
  },
  medium: { 
    class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    label: 'Medium'
  },
  hard: { 
    class: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    label: 'Advanced'
  }
};

export function QuestionSection({ topic, index, isActive }: QuestionSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (topic.codeExample) {
      await navigator.clipboard.writeText(topic.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const difficulty = difficultyConfig[topic.difficulty];

  return (
    <section
      id={topic.id}
      className={cn('question-section', isActive && 'active')}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          <span className="text-primary font-bold mr-2">Q{index + 1}.</span>
          {topic.name}
        </h3>
        <Badge 
          variant="outline" 
          className={cn('shrink-0 font-medium', difficulty.class)}
        >
          {difficulty.label}
        </Badge>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-5 text-base">
        {topic.description}
      </p>

      {topic.bulletPoints && topic.bulletPoints.length > 0 && (
        <ul className="space-y-3 mb-6">
          {topic.bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {topic.codeExample && (
        <div className="code-block group">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Example</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto">
            <code>{topic.codeExample}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
