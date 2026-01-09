import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { blogPosts } from '@/data/blogs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

export default function BlogsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Blogs' }]} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Technical Blog
        </h1>
        <p className="mb-8 text-muted-foreground">
          Articles and tutorials on Java, Spring Boot, Angular, and more
        </p>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="content-card group cursor-pointer"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
