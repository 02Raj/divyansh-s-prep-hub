import { Layout } from '@/components/layout/Layout';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  Code2,
  Coffee,
  Leaf,
  Component,
  Database,
  Atom,
  Server,
  GitBranch
} from 'lucide-react';

const skills = [
  { name: 'Java', icon: Coffee },
  { name: 'Spring Boot', icon: Leaf },
  { name: 'Angular', icon: Component },
  { name: 'React', icon: Atom },
  { name: 'JavaScript', icon: Code2 },
  { name: 'SQL', icon: Database },
  { name: 'MongoDB', icon: Server },
  { name: 'Git', icon: GitBranch }
];

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/divyanshraj', color: 'hover:bg-foreground hover:text-background' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/divyanshraj', color: 'hover:bg-[#0077B5] hover:text-white' },
  { name: 'Twitter/X', icon: Twitter, url: 'https://twitter.com/divyanshraj', color: 'hover:bg-foreground hover:text-background' },
  { name: 'Email', icon: Mail, url: 'mailto:divyansh@example.com', color: 'hover:bg-destructive hover:text-destructive-foreground' }
];

export default function AboutPage() {
  return (
    <Layout showSidebar={false}>
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          {/* Avatar */}
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-4xl font-bold shadow-lg">
            DR
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Divyansh Raj
          </h1>
          <p className="text-xl text-primary font-medium mb-4">
            Java Full Stack Developer
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Passionate about building scalable applications and sharing knowledge. 
            I love exploring new technologies and helping developers prepare for interviews.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-badge">
                <skill.icon className="h-4 w-4" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Connect with Me
          </h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link ${link.color}`}
                title={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="content-card text-center">
            <div className="text-3xl font-bold text-primary mb-1">200+</div>
            <div className="text-sm text-muted-foreground">Interview Topics</div>
          </div>
          <div className="content-card text-center">
            <div className="text-3xl font-bold text-primary mb-1">8</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="content-card text-center">
            <div className="text-3xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
