import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { SearchInput } from '@/components/topics/SearchInput';
import { TopicChips } from '@/components/topics/TopicChips';
import { QuestionSection } from '@/components/topics/QuestionSection';
import { Separator } from '@/components/ui/separator';
import { InterviewTopic } from '@/data/types';

// Import all topic data
import { javascriptTopics } from '@/data/javascript-topics';
import { angularTopics } from '@/data/angular-topics';
import { javaTopics } from '@/data/java-topics';
import { springBootTopics } from '@/data/springboot-topics';
import { databaseTopics } from '@/data/database-topics';
import { reactTopics } from '@/data/react-topics';

const topicDataMap: Record<string, { topics: InterviewTopic[]; title: string; parent?: string }> = {
  javascript: { topics: javascriptTopics, title: 'JavaScript' },
  angular: { topics: angularTopics, title: 'Angular' },
  java: { topics: javaTopics, title: 'Java' },
  springboot: { topics: springBootTopics, title: 'Spring Boot' },
  react: { topics: reactTopics, title: 'React' },
  databases: { topics: databaseTopics, title: 'Databases' },
  sql: { topics: databaseTopics.filter(t => t.category === 'SQL'), title: 'SQL', parent: 'Databases' },
  mongodb: { topics: databaseTopics.filter(t => t.category === 'MongoDB'), title: 'MongoDB', parent: 'Databases' }
};

export default function TopicPage() {
  const { category, subcategory } = useParams();
  const topicKey = subcategory || category || 'javascript';
  const topicData = topicDataMap[topicKey] || topicDataMap.javascript;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const filteredTopics = topicData.topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToTopic = useCallback((topicId: string) => {
    const element = document.getElementById(topicId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTopicId(topicId);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTopicId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -50% 0px', threshold: 0 }
    );

    filteredTopics.forEach((topic) => {
      const element = document.getElementById(topic.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [filteredTopics]);

  const breadcrumbItems = [
    { label: 'Topics', path: '/' },
    ...(topicData.parent ? [{ label: topicData.parent, path: `/topics/databases` }] : []),
    { label: topicData.title }
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          {topicData.title} Interview Topics
        </h1>
        <p className="mb-6 text-muted-foreground">
          Master these {filteredTopics.length} essential topics for your next interview
        </p>

        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${topicData.title} topics...`}
          />
        </div>

        <div className="mb-6">
          <TopicChips
            topics={filteredTopics}
            activeTopicId={activeTopicId}
            onTopicClick={navigateToTopic}
          />
        </div>

        <Separator className="mb-8" />

        <div className="space-y-0">
          {filteredTopics.map((topic, index) => (
            <QuestionSection
              key={topic.id}
              topic={topic}
              index={index}
              isActive={activeTopicId === topic.id}
            />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No topics found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
