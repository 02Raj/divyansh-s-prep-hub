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
  Sparkles,
  BookOpen,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'javascript', name: 'JavaScript', icon: Code2, count: 25, color: 'from-amber-500 to-orange-600' },
  { id: 'angular', name: 'Angular', icon: Component, count: 30, color: 'from-rose-500 to-pink-600' },
  { id: 'java', name: 'Java', icon: Coffee, count: 20, color: 'from-orange-500 to-red-600' },
  { id: 'springboot', name: 'Spring Boot', icon: Leaf, count: 18, color: 'from-emerald-500 to-green-600' },
  { id: 'databases', name: 'Databases', icon: Database, count: 15, color: 'from-blue-500 to-cyan-600' },
  { id: 'react', name: 'React', icon: Atom, count: 22, color: 'from-cyan-500 to-blue-600' },
];

const stats = [
  { label: 'Interview Topics', value: '200+', icon: BookOpen },
  { label: 'Technologies', value: '8', icon: Code2 },
  { label: 'Happy Learners', value: '1K+', icon: Users },
];

export default function Index() {
  return (
    <Layout showSidebar={false}>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative px-4 py-20 lg:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
          
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Your Interview Prep Companion
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Master Your Next
              <span className="block gradient-text">Technical Interview</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A comprehensive collection of interview questions and answers for 
              Java Full Stack Developers. Covering JavaScript, Angular, React, Java, 
              Spring Boot, and Databases.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-xl h-12 px-8 text-base shadow-lg shadow-primary/25">
                <Link to="/topics/javascript">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl h-12 px-8 text-base">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-border bg-card/50">
          <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground">
              Select a technology to start exploring interview topics
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/topics/${category.id}`}
                className="content-card group opacity-0 animate-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} interview topics
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-border bg-gradient-to-b from-transparent to-primary/5">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Ace Your Interview?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
              Start preparing today with our comprehensive collection of curated 
              interview questions and detailed explanations.
            </p>
            <Button asChild size="lg" className="rounded-xl h-12 px-8 text-base shadow-lg shadow-primary/25">
              <Link to="/interview-prep">
                View Interview Sets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
