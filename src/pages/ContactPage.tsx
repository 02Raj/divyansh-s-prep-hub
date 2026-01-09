import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/topics/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, User } from 'lucide-react';

export default function ContactPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Get in Touch
        </h1>
        <p className="mb-8 text-muted-foreground">
          Have questions or suggestions? I'd love to hear from you!
        </p>

        <div className="content-card">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message here..."
                rows={5}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full h-11">
              Send Message
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              You can also reach me directly at{' '}
              <a 
                href="mailto:divyansh@example.com" 
                className="text-primary hover:underline"
              >
                divyansh@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
