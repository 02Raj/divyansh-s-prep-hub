import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { path: '/contribute', label: 'Contribute' },
  // { path: '/snippets', label: 'Snippets' },
  { path: '/interview-prep', label: 'Interview Prep' },
  { path: '/about', label: 'About Me' }
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Code2 className="h-5 w-5" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-400 animate-pulse" />
          </div>
          <span className="hidden text-lg font-bold sm:block">
            <span className="text-foreground">Learn with</span>{' '}
            <span className="gradient-text">Divyansh</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              to="/"
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
