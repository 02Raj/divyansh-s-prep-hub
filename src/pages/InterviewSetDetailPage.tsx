import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InterviewSetDetail } from '@/data/interview-prep-data';

export default function InterviewSetDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const set = location.state?.set as InterviewSetDetail | undefined;

  if (!set) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/interview-prep')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Interview Sets
          </Button>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Interview set not found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/interview-prep')}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Interview Sets
        </Button>

        {/* Header */}
        <div className="bg-background border border-border rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-foreground mb-3">{set.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="font-medium text-foreground">{set.company}</span>
                <span>•</span>
                <span>Interview Date: {new Date(set.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1.5 flex-shrink-0">
              {set.questionCount} Questions
            </Badge>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Questions:</h2>
          <div className="space-y-3">
            {set.questions.map((question, index) => (
              <div 
                key={index} 
                className="flex gap-4 py-3 px-4 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="text-muted-foreground font-medium text-sm min-w-[2rem] flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <div className="flex-1">
                  <p className="text-foreground text-sm">{question}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs"
                  >
                    {set.technology}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
