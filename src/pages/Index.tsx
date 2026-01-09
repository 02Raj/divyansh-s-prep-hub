import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  Code2, 
  Component, 
  Coffee, 
  Leaf, 
  Database, 
  Atom,
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const technologies = [
  { 
    name: 'JavaScript', 
    icon: Code2, 
    path: '/topics/javascript',
    description: 'ES6+, closures, async/await, and more',
    topics: 6
  },
  { 
    name: 'Angular', 
    icon: Component, 
    path: '/topics/angular',
    description: 'Components, services, RxJS, signals',
    topics: 8
  },
  { 
    name: 'Java', 
    icon: Coffee, 
    path: '/topics/java',
    description: 'OOP, collections, streams, threading',
    topics: 5
  },
  { 
    name: 'Spring Boot', 
    icon: Leaf, 
    path: '/topics/springboot',
    description: 'REST APIs, JPA, security, testing',
    topics: 5
  },
  { 
    name: 'Databases', 
    icon: Database, 
    path: '/topics/databases',
    description: 'SQL joins, indexes, MongoDB aggregation',
    topics: 5
  },
  { 
    name: 'React', 
    icon: Atom, 
    path: '/topics/react',
    description: 'Hooks, context, performance, patterns',
    topics: 5
  }
];

export default function Index() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4 md:text-5xl">
            Master Your Next
            <span className="text-primary"> Tech Interview</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive interview preparation covering Java, Spring Boot, Angular, React, 
            and more. Curated by developers, for developers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/topics/angular">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/interview-prep">
                <GraduationCap className="h-4 w-4" />
                Interview Sets
              </Link>
            </Button>
          </div>
        </div>

        {/* Technology Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Explore Topics
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech, index) => (
              <Link
                key={tech.name}
                to={tech.path}
                className="content-card group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <tech.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {tech.topics} topics
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/blogs" className="content-card group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Technical Blog
                </h3>
                <p className="text-sm text-muted-foreground">
                  In-depth articles and tutorials
                </p>
              </div>
              <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link to="/interview-prep" className="content-card group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Interview Sets
                </h3>
                <p className="text-sm text-muted-foreground">
                  Curated question collections
                </p>
              </div>
              <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>

        {/* Footer Stats */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">Interview Topics</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Interview Sets</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
