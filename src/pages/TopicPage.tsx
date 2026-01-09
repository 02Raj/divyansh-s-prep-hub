import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { SearchInput } from '@/components/topics/SearchInput';
import { TopicChips } from '@/components/topics/TopicChips';
import { QuestionSection } from '@/components/topics/QuestionSection';
import { InterviewTopic } from '@/data/types';
import { BookOpen } from 'lucide-react';

// Import all topic data
import { javascriptTopics } from '@/data/javascript-topics';
import { angularTopics } from '@/data/angular-topics';
import { javaTopics } from '@/data/java-topics';
import { springBootTopics } from '@/data/springboot-topics';
import { databaseTopics } from '@/data/database-topics';
import { reactTopics } from '@/data/react-topics';

const topicDataMap: Record<string, { topics: InterviewTopic[]; title: string; description: string; parent?: string }> = {
  javascript: { 
    topics: javascriptTopics, 
    title: 'JavaScript', 
    description: 'Core concepts, ES6+, async patterns, and interview essentials'
  },
  angular: { 
    topics: angularTopics, 
    title: 'Angular', 
    description: 'Components, services, routing, and enterprise patterns'
  },
  java: { 
    topics: javaTopics, 
    title: 'Java', 
    description: 'OOP fundamentals, collections, multithreading, and JVM internals'
  },
  springboot: { 
    topics: springBootTopics, 
    title: 'Spring Boot', 
    description: 'Dependency injection, REST APIs, and microservices architecture'
  },
  react: { 
    topics: reactTopics, 
    title: 'React', 
    description: 'Hooks, state management, performance, and modern patterns'
  },
  databases: { 
    topics: databaseTopics, 
    title: 'Databases', 
    description: 'SQL, NoSQL, queries, indexing, and optimization techniques'
  },
  sql: { 
    topics: databaseTopics.filter(t => t.category === 'SQL'), 
    title: 'SQL', 
    description: 'Relational databases, queries, joins, and transactions',
    parent: 'Databases' 
  },
  mongodb: { 
    topics: databaseTopics.filter(t => t.category === 'MongoDB'), 
    title: 'MongoDB', 
    description: 'Document databases, aggregation, and schema design',
    parent: 'Databases' 
  }
};

export default function TopicPage() {
  const { category, subcategory } = useParams();
  const topicKey = subcategory || category || 'javascript';
  const topicData = topicDataMap[topicKey] || topicDataMap.javascript;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

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
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {topicData.title}
              </h1>
              <p className="text-sm text-muted-foreground">Interview Topics</p>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            {topicData.description}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{filteredTopics.length}</span>
            Topics
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {filteredTopics.filter(t => t.difficulty === 'easy').length} Easy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {filteredTopics.filter(t => t.difficulty === 'medium').length} Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            {filteredTopics.filter(t => t.difficulty === 'hard').length} Advanced
          </span>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${topicData.title} topics...`}
          />
        </div>

        {/* Topic Chips */}
        <div className="mb-8">
          <TopicChips
            topics={filteredTopics}
            activeTopicId={activeTopicId}
            onTopicClick={navigateToTopic}
          />
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground">
              Questions & Answers
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-2">
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
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No topics found</h3>
            <p className="text-muted-foreground">
              No results for "{searchQuery}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
