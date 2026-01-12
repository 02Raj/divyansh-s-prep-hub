import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const API_BASE_URL = 'http://localhost:5000';

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError('Failed to load contact messages. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy – hh:mm a');
    } catch {
      return dateString;
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Submitted Contact Messages
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMessages}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No contact messages yet.
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-background border border-border rounded-lg p-5"
              >
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Name: </span>
                    <span className="font-medium text-foreground">{msg.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    <a href={`mailto:${msg.email}`} className="text-primary hover:underline">
                      {msg.email}
                    </a>
                  </div>
                  {msg.subject && (
                    <div>
                      <span className="text-muted-foreground">Subject: </span>
                      <span className="text-foreground">{msg.subject}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-foreground whitespace-pre-wrap mb-3">
                  {msg.message}
                </p>
                
                <div className="text-xs text-muted-foreground">
                  {formatDate(msg.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
