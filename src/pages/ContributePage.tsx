import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { Github, GitPullRequest, FileEdit, Bug, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Github,
    title: 'Fork the Repository',
    description: 'Start by forking the project repository to your GitHub account.'
  },
  {
    icon: FileEdit,
    title: 'Add Your Content',
    description: 'Add new interview questions, fix errors, or improve existing content.'
  },
  {
    icon: GitPullRequest,
    title: 'Submit a Pull Request',
    description: 'Create a pull request with a clear description of your changes.'
  }
];

const contributionTypes = [
  {
    icon: FileEdit,
    title: 'Add New Topics',
    description: 'Contribute new interview questions and answers for any technology.'
  },
  {
    icon: Bug,
    title: 'Fix Errors',
    description: 'Found a mistake? Help us fix code examples or explanations.'
  },
  {
    icon: Star,
    title: 'Improve Content',
    description: 'Make existing content clearer, add better examples, or update information.'
  }
];

export default function ContributePage() {
  return (
    <Layout showSidebar={false}>
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contribute' }]} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contribute to Learn with Divyansh
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Help thousands of developers prepare for interviews by contributing your knowledge
          </p>
        </div>

        {/* How to Contribute */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            How to Contribute
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="content-card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Contributions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Ways to Contribute
          </h2>
          <div className="grid gap-4">
            {contributionTypes.map((type) => (
              <div key={type.title} className="content-card flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <type.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="gap-2">
            <Github className="h-5 w-5" />
            View on GitHub
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Star the repo if you find it helpful! ⭐
          </p>
        </div>
      </div>
    </Layout>
  );
}
