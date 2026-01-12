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
  GitBranch,
  MapPin,
  Briefcase,
  Globe
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
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/02Raj',
    color: 'hover:bg-foreground hover:text-background'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/divyansh-raj-049542202',
    color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]'
  },
  {
    name: 'Twitter/X',
    icon: Twitter,
    url: 'https://twitter.com/Divyans50724144',
    color: 'hover:bg-foreground hover:text-background'
  },
  // {
  //   name: 'Portfolio',
  //   icon: Globe, // make sure Globe icon is imported
  //   url: 'https://portfolio-divyansh-tech.vercel.app/',
  //   color: 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
  // }
];


export default function AboutPage() {
  return (
    <Layout showSidebar={false}>
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Avatar */}
          <div className="relative mx-auto mb-8 w-fit">
            <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground text-5xl font-bold shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105">
              DR
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
              <Code2 className="h-5 w-5" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Divyansh Raj
          </h1>
          <p className="text-xl gradient-text font-semibold mb-4">
            Java Full Stack Developer
          </p>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              India
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              3+ Years Experience
            </span>
          </div>
          
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
            Passionate about building scalable applications and sharing knowledge. 
            I love exploring new technologies and helping developers prepare for their interviews.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-badge opacity-0 animate-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <skill.icon className="h-4 w-4 text-primary" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Connect with Me
          </h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link opacity-0 animate-in ${link.color}`}
                style={{ animationDelay: `${index * 100}ms` }}
                title={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-3 gap-4">
          {[
            { value: '200+', label: 'Interview Topics' },
            { value: '8', label: 'Technologies' },
            { value: '5+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="content-card text-center opacity-0 animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
}
