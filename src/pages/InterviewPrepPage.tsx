import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  AlertCircle, 
  Star, 
  GitFork, 
  Eye, 
  CheckCircle2, 
  Circle,
  ExternalLink,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { realInterviewQuestions, QuestionCategory } from '@/data/real-interview-questions';
import { 
  angularInterviewSets,
  javascriptTopicsList,
  codingPatterns,
  jsRepoStats,
  javaTopicsChecklist,
  systemDesignTopics,
  javaSpringInterviewSets,
  InterviewSetDetail
} from '@/data/interview-prep-data';
import { useNavigate } from 'react-router-dom';

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState('interview-questions');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'All'>('All');
  const navigate = useNavigate();

  const categories: (QuestionCategory | 'All')[] = ['All', 'Java', 'Spring Boot', 'Microservices', 'Angular', 'JavaScript', 'SQL', 'System Design', 'Java Coding', 'JS Coding', 'DevOps', 'Other'];

  const filteredQuestions = selectedCategory === 'All' 
    ? realInterviewQuestions 
    : realInterviewQuestions.filter(q => q.category === selectedCategory);


  const handleViewQuestions = (set: InterviewSetDetail) => {
    navigate(`/interview-set/${set.id}`, { state: { set } });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Interview Prep' }]} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Interview Preparation
        </h1>
        <p className="mb-6 text-muted-foreground">
          Comprehensive preparation resources for Frontend, Backend, and System Design interviews
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex h-auto w-max gap-1 bg-transparent p-0 border-b border-border rounded-none">
              <TabsTrigger 
                value="interview-questions" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                Interview Questions
              </TabsTrigger>
              <TabsTrigger 
                value="angular-sets" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                My Angular Interview Sets
              </TabsTrigger>
              <TabsTrigger 
                value="javascript-prep" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                JavaScript & Coding Prep
              </TabsTrigger>
              <TabsTrigger 
                value="java-prep" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                Java Coding / Interview Prep
              </TabsTrigger>
              <TabsTrigger 
                value="system-design" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                System Design
              </TabsTrigger>
              {/* <TabsTrigger 
                value="medium-articles" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                Medium Articles
              </TabsTrigger> */}
              <TabsTrigger 
                value="java-spring-sets" 
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                My Java / Spring Boot Interview Sets
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Tab 1: Interview Questions */}
          <TabsContent value="interview-questions" className="mt-6">
            <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    Real Interview Questions
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Authentic questions collected from real interviews, organized in S-E-E format.
                  </p>
                </div>
              </div>

              {/* Category Filters */}
              <ScrollArea className="w-full pb-4 mb-2">
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <Badge 
                      key={cat} 
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      className="cursor-pointer whitespace-nowrap text-xs py-1 px-3"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <Accordion type="multiple" className="w-full">
                {filteredQuestions.map((q) => (
                  <AccordionItem key={q.id} value={q.id} className="border-border">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center w-full pr-4">
                        <span className="font-medium text-[15px] flex-1 leading-snug">{q.question}</span>
                        <div className="flex items-center gap-2 shrink-0 mt-2 md:mt-0">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-none">
                            🔥 Asked {q.frequency}x
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground whitespace-nowrap">
                            {q.category}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div className="space-y-4 text-sm bg-muted/30 p-5 rounded-lg border border-border">
                        
                        {/* Companies & Variations */}
                        {(q.companies.length > 0 || q.variations.length > 0) && (
                          <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-border/50">
                            {q.companies.length > 0 && (
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Asked In:</span>
                                {q.companies.map(c => <Badge key={c} variant="secondary" className="text-[10px] h-5 px-1.5">{c}</Badge>)}
                              </div>
                            )}
                            {q.variations.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Also asked as: </span>
                                {q.variations.join(' | ')}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Simple */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-[13px] uppercase tracking-wider text-primary">Simple Answer</h4>
                          <p className="text-foreground leading-relaxed">{q.answerSEE.simple}</p>
                        </div>

                        {/* Explain */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-[13px] uppercase tracking-wider text-primary">Explanation</h4>
                          <p className="text-muted-foreground leading-relaxed">{q.answerSEE.explain}</p>
                        </div>

                        {/* Example / Say it in interview */}
                        <div className="bg-background p-4 rounded-md border-l-4 border-l-primary shadow-sm">
                          <h4 className="font-semibold text-foreground mb-2 text-[13px] uppercase tracking-wider text-primary">🗣️ Say it in interview</h4>
                          <p className="text-foreground italic leading-relaxed">
                            {q.answerSEE.example}
                          </p>
                        </div>

                        {/* 10s Summary */}
                        <div className="flex items-start gap-2 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300 p-3 rounded-md mt-2">
                          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-xs uppercase tracking-wider block mb-1">10-Second Summary</span>
                            <p className="font-medium">{q.answerSEE.summary10s}</p>
                          </div>
                        </div>

                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {filteredQuestions.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-lg mt-4">
                    <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>No questions found for this category yet.</p>
                  </div>
                )}
              </Accordion>
            </div>
          </TabsContent>

          {/* Tab 2: Angular Interview Sets */}
          <TabsContent value="angular-sets" className="mt-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Real Interview Experience</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  These are actual question sets from my Angular interviews at various companies.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg divide-y divide-border">
              {angularInterviewSets.map((set) => (
                <div key={set.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{set.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{set.company}</span>
                        <span>•</span>
                        <span>{set.questionCount} Questions</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewQuestions(set)}
                      className="flex-shrink-0"
                    >
                      View Questions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: JavaScript & Coding Prep */}
          <TabsContent value="javascript-prep" className="mt-6">
            {/* <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-foreground">{jsRepoStats.stars.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{jsRepoStats.forks}</span>
                  <span className="text-muted-foreground text-sm">forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{jsRepoStats.watchers}</span>
                  <span className="text-muted-foreground text-sm">watchers</span>
                </div>
              </div>
            </div>  */}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">JavaScript Core Topics</h3>
                <div className="space-y-2">
                  {javascriptTopicsList.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Coding Interview Patterns</h3>
                <div className="space-y-2">
                  {codingPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground/50 flex-shrink-0" />
                      {pattern}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="default">Start JavaScript Practice</Button>
              <Button variant="outline">Start Coding Prep</Button>
            </div>
          </TabsContent>

          {/* Tab 4: Java Coding / Interview Prep */}
          <TabsContent value="java-prep" className="mt-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Java Interview Preparation Checklist
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Track your progress through essential Java topics
              </p>
              <div className="space-y-3">
                {javaTopicsChecklist.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center gap-3 py-3 px-4 rounded-md border transition-colors",
                      item.completed 
                        ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" 
                        : "bg-muted/30 border-border"
                    )}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={cn(
                      "text-sm",
                      item.completed ? "text-green-800 dark:text-green-200" : "text-foreground"
                    )}>
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab 5: System Design */}
          <TabsContent value="system-design" className="mt-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                System Design for Interviews
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Essential concepts for SDE / Backend / Full Stack roles
              </p>
              <div className="space-y-4">
                {systemDesignTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="py-4 border-b border-border last:border-0"
                  >
                    <h3 className="font-medium text-foreground mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab 6: Medium Articles */}
          <TabsContent value="medium-articles" className="mt-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-3">Read My Articles on Medium</h2>
                <p className="text-green-100 mb-6">
                  I write about JavaScript, Angular, Java, Spring Boot, and System Design
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50"
                  onClick={() => window.open('https://medium.com/@bittukumar-web', '_blank')}
                >
                  Visit My Medium Profile
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Tab 7: Java / Spring Boot Interview Sets */}
          <TabsContent value="java-spring-sets" className="mt-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Real Interview Experience</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  These are actual question sets from my Java / Spring Boot interviews at various companies.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg divide-y divide-border">
              {javaSpringInterviewSets.map((set) => (
                <div key={set.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">{set.title}</h3>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {set.technology}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{set.company}</span>
                        <span>•</span>
                        <span>{set.questionCount} Questions</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewQuestions(set)}
                      className="flex-shrink-0"
                    >
                      View Questions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
