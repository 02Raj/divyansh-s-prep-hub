import { InterviewTopic } from '@/data/types';
import { cn } from '@/lib/utils';

interface TopicChipsProps {
  topics: InterviewTopic[];
  activeTopicId: string | null;
  onTopicClick: (topicId: string) => void;
}

export function TopicChips({ topics, activeTopicId, onTopicClick }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onTopicClick(topic.id)}
          className={cn(
            'topic-chip',
            topic.difficulty,
            activeTopicId === topic.id && 'active'
          )}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
}
