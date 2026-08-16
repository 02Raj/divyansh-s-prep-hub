import React from 'react';
import { Lightbulb, Code2, AlertTriangle, MonitorPlay } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RememberBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
    <div>
      <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Remember</h4>
      <div className="text-sm text-amber-900 dark:text-amber-200">{children}</div>
    </div>
  </div>
);

export const InterviewQuestion = ({ question, answer }: { question: string; answer: React.ReactNode }) => (
  <div className="my-6 rounded-lg border border-border bg-card shadow-sm">
    <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
      <MonitorPlay className="h-4 w-4 text-primary" />
      <h4 className="font-semibold text-foreground">Interview Question</h4>
    </div>
    <div className="p-4">
      <p className="mb-3 font-medium text-foreground">Q: {question}</p>
      <div className="text-sm text-muted-foreground">{answer}</div>
    </div>
  </div>
);

export const CommonMistake = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
    <div>
      <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-red-800 dark:text-red-300">Common Mistake</h4>
      <div className="text-sm text-red-900 dark:text-red-200">{children}</div>
    </div>
  </div>
);

export const AsciiDiagram = ({ diagram }: { diagram: string }) => (
  <div className="my-6 overflow-x-auto rounded-lg border border-border bg-zinc-950 p-4">
    <pre className="text-sm text-emerald-400 font-mono leading-relaxed">{diagram}</pre>
  </div>
);

export const CodeMapping = ({
  concept,
  angular,
  spring,
  database,
}: {
  concept: string;
  angular: React.ReactNode;
  spring: React.ReactNode;
  database?: React.ReactNode;
}) => (
  <div className="my-8 rounded-lg border border-border bg-card overflow-hidden shadow-sm">
    <div className="flex items-center gap-2 border-b border-border bg-primary/5 px-4 py-3">
      <Code2 className="h-5 w-5 text-primary" />
      <h4 className="font-semibold text-foreground">Codebase Mapping: {concept}</h4>
    </div>
    <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
      <div className="p-4 bg-background">
        <h5 className="mb-3 text-sm font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" /> Angular
        </h5>
        <div className="text-sm text-muted-foreground font-mono">{angular}</div>
      </div>
      <div className="p-4 bg-background">
        <h5 className="mb-3 text-sm font-bold text-green-500 uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" /> Spring Boot
        </h5>
        <div className="text-sm text-muted-foreground font-mono">{spring}</div>
      </div>
      {database && (
        <div className="p-4 bg-background sm:col-span-2 lg:col-span-1 border-t sm:border-t-0">
          <h5 className="mb-3 text-sm font-bold text-blue-500 uppercase tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" /> Database
          </h5>
          <div className="text-sm text-muted-foreground font-mono">{database}</div>
        </div>
      )}
    </div>
  </div>
);

export const SDTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">{children}</h1>
);

export const SDHeading2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pb-2 border-b border-border">{children}</h2>
);

export const SDHeading3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-medium tracking-tight text-foreground mt-8 mb-3">{children}</h3>
);

export const SDParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-7 text-muted-foreground mb-4">{children}</p>
);

export const SDList = ({ children }: { children: React.ReactNode }) => (
  <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
);
