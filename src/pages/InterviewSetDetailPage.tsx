import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  angularInterviewSets,
  InterviewQuestionAnswer,
  InterviewSetDetail,
  javaSpringInterviewSets,
} from '@/data/interview-prep-data';

export default function InterviewSetDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const stateSet = location.state?.set as InterviewSetDetail | undefined;
  const set = stateSet ?? [...angularInterviewSets, ...javaSpringInterviewSets].find((item) => item.id === id);

  const filteredSections = useMemo(() => {
    if (!set?.sections) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return set.sections;

    return set.sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter((item) =>
          [item.question, item.what, item.why, item.how, item.sayIt, item.memory]
            .some((value) => value.toLowerCase().includes(query)),
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [searchQuery, set]);

  const copyAnswer = (item: InterviewQuestionAnswer) => {
    const text = `Question: ${item.question}\n\nWhat: ${item.what}\n\nWhy: ${item.why}\n\nHow / Internals: ${item.how}\n\nSay it in interview:\n"${item.sayIt}"\n\n10-second memory booster: ${item.memory}`;
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Question & answer copied!'))
      .catch(() => toast.error('Could not copy the answer.'));
  };

  if (!set) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          <Button variant="ghost" onClick={() => navigate('/interview-prep')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Interview Sets
          </Button>
          <div className="py-12 text-center text-muted-foreground">Interview set not found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <Button variant="ghost" onClick={() => navigate('/interview-prep')} className="mb-6 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Interview Sets
        </Button>

        <div className="mb-6 rounded-xl border border-border bg-background p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="mb-2 text-2xl font-bold text-foreground">{set.title}</h1>
              {set.description && <p className="mb-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{set.description}</p>}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{set.company}</span>
                <span>•</span>
                <span>{set.technology}</span>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0 px-3 py-1.5 text-sm">{set.questionCount} Questions</Badge>
          </div>
        </div>

        {set.sections ? (
          <div className="space-y-5">
            <div className="sticky top-16 z-10 rounded-xl border border-border bg-background/95 p-3 shadow-sm backdrop-blur">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search all ${set.questionCount} questions and answers...`}
                  className="pl-9"
                />
              </div>
            </div>

            {filteredSections.map((section) => (
              <section key={section.title} className="rounded-xl border border-border bg-background p-4 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                  <Badge variant="outline">{section.questions.length} Questions</Badge>
                </div>
                <Accordion type="multiple" className="w-full">
                  {section.questions.map((item, index) => (
                    <AccordionItem key={item.question} value={`${section.title}-${index}`}>
                      <AccordionTrigger className="gap-3 text-left hover:no-underline">
                        <span className="mr-auto leading-snug">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        <div className="space-y-4 rounded-lg border border-border bg-muted/25 p-4 sm:p-5">
                          <div className="grid gap-4 md:grid-cols-3">
                            <AnswerBlock label="What" value={item.what} />
                            <AnswerBlock label="Why" value={item.why} />
                            <AnswerBlock label="How / Internals" value={item.how} />
                          </div>

                          <div className="rounded-lg border-l-4 border-l-primary bg-background p-4 shadow-sm">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">Say it in interview</h3>
                              <Button variant="ghost" size="sm" onClick={() => copyAnswer(item)} className="h-8 gap-1.5 text-xs">
                                <Copy className="h-3.5 w-3.5" /> Copy
                              </Button>
                            </div>
                            <p className="leading-relaxed text-foreground">“{item.sayIt}”</p>
                          </div>

                          <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-green-800 dark:bg-green-950/25 dark:text-green-300">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                            <div>
                              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider">10-second memory booster</span>
                              <p className="font-medium">{item.memory}</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}

            {filteredSections.length === 0 && (
              <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
                No matching question found.
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-background p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Questions:</h2>
            <div className="space-y-3">
              {set.questions.map((question, index) => (
                <div key={question} className="flex gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <span className="min-w-[2rem] shrink-0 text-sm font-medium text-muted-foreground">{String(index + 1).padStart(2, '0')}.</span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{question}</p>
                    <Badge variant="outline" className="mt-2 text-xs">{set.technology}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function AnswerBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{label}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}
