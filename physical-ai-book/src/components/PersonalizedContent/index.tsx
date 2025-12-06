import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../Auth/AuthProvider';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Helper to extract clean slug
const getSlugFromPath = (path: string): string => {
  const docsPrefix = '/docs/';
  if (path.startsWith(docsPrefix)) {
    return path.substring(docsPrefix.length);
  }
  return path.replace(/^\/+/, '');
};

export default function PersonalizedContent() {
  const { siteConfig } = useDocusaurusContext();
  const { session } = useAuth();
  const location = useLocation();
  const slug = getSlugFromPath(location.pathname);

  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Start loading immediately
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const fetchPersonalizedContent = async () => {
      if (hasStarted) return; // Prevent double fetch
      setHasStarted(true);
      setIsLoading(true);
      setError(null);
      setContent('');

      try {
        // Use Env var or localhost fallback
        const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/personalize`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            slug: slug,
            tech_background: session?.user?.tech_background,
            preferred_language: session?.user?.preferred_language
          }),
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error("Please login to see personalized content");
          throw new Error('Failed to fetch personalized content');
        }

        if (!response.body) throw new Error('ReadableStream not supported');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        setIsLoading(false); // Stream started

        // Start reading the stream
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setContent((prev) => prev + chunk);
        }
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPersonalizedContent();
  }, [slug]); // Only re-run if slug changes

  if (error) return (
    <div className="alert alert--danger margin-top--md">
      <strong>Error:</strong> {error}
    </div>
  );

  return (
    <div className="personalized-view margin-top--md">
      {isLoading && content.length === 0 && (
        <div className="card shadow--tl" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner-border text-primary" role="status" style={{ marginBottom: '1rem', fontSize: '2rem' }}>
            🤖
          </div>
          <h3>Creating a Personalized Content For You...</h3>
          <p>
            Adapting content for a <strong>{session?.user.tech_background}</strong> background
            using <strong>{session?.user.preferred_language}</strong> examples.
          </p>
          <div className="progress margin-top--md" style={{ height: '4px' }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}

      {(content.length > 0) && (
        <div className="prose dark:prose-invert max-w-none animate-fade-in">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
