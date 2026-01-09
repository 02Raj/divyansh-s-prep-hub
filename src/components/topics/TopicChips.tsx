import { InterviewTopic } from '@/data/types';
import { cn } from '@/lib/utils';

interface TopicChipsProps {
  topics: InterviewTopic[];
  activeTopicId: string | null;
  onTopicClick: (topicId: string) => void;
}

export function TopicChips({ topics, activeTopicId, onTopicClick }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {topics.map((topic, index) => (
        <button
          key={topic.id}
          onClick={() => onTopicClick(topic.id)}
          className={cn(
            'topic-chip opacity-0 animate-in',
            topic.difficulty,
            activeTopicId === topic.id && 'active'
          )}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
}
