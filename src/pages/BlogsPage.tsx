import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { mediumBlogs } from '@/data/blogs';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filterCategories = [
  'All',
  'JavaScript',
  'Angular',
  'Java',
  'Spring Boot',
  'SQL',
  'MongoDB',
  'System Design'
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = selectedCategory === 'All' 
    ? mediumBlogs 
    : mediumBlogs.filter(blog => 
        blog.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Databases' && (blog.category === 'SQL' || blog.category === 'MongoDB'))
      );

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Blogs' }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to My Technical Blogs
          </h1>
          <p className="text-muted-foreground">
            Explore articles on JavaScript, Angular, Java, Spring Boot, and more
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Filter by:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filterCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <h2 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {blog.description}
                </p>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(blog.url, '_blank')}
                >
                  Read More
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
            <p className="text-muted-foreground">No blogs found for "{selectedCategory}"</p>
            <Button 
              variant="ghost" 
              className="mt-2"
              onClick={() => setSelectedCategory('All')}
            >
              Show all blogs
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
