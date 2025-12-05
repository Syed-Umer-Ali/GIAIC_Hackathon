import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../Auth/AuthProvider';
import { useLocation } from '@docusaurus/router';

// Helper to extract clean slug
const getSlugFromPath = (path: string): string => {
  const docsPrefix = '/docs/';
  if (path.startsWith(docsPrefix)) {
    return path.substring(docsPrefix.length);
  }
  return path.replace(/^\/+/, '');
};

export default function PersonalizedContent() {
  const { session } = useAuth();
  const location = useLocation();
  const slug = getSlugFromPath(location.pathname);

  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalizeClick = async () => {
    setIsLoading(true);
    setShowPersonalized(true);
    setError(null);
    setContent(''); // Reset content

    try {
      const response = await fetch('http://localhost:8000/api/personalize', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send slug instead of raw content
        body: JSON.stringify({ slug: slug }),
      });

      if (!response.ok) {
          if (response.status === 401) throw new Error("Please login to see personalized content");
          throw new Error('Failed to fetch personalized content');
      }

      if (!response.body) throw new Error('ReadableStream not supported');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Start reading the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setContent((prev) => prev + chunk);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not logged in, we don't show the personalization option
  if (!session?.user) {
      return null;
  }

  return (
    <div className="margin-bottom--lg">
        {/* 1. The Trigger Button */}
        {!showPersonalized && (
            <div className="alert alert--info margin-bottom--md shadow--md" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <strong>Want a simpler explanation?</strong>
                    <p style={{margin: 0, fontSize: '0.9em'}}>
                        Customize this lesson based on your <strong>{session.user.proficiency || 'General'}</strong> level 
                        and <strong>{session.user.tech_background || 'Tech'}</strong> background.
                    </p>
                </div>
                <button 
                    className="button button--primary button--lg"
                    onClick={handlePersonalizeClick}
                    style={{minWidth: '180px'}}
                >
                    ✨ Personalize
                </button>
            </div>
        )}

        {/* 2. The Popup / Loading State */}
        {isLoading && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)'
            }}>
                <div className="card shadow--tl" style={{maxWidth: '400px', width: '90%', textAlign: 'center', padding: '2rem'}}>
                    <div className="card__body">
                        <div className="spinner-border text-primary" role="status" style={{marginBottom: '1rem', fontSize: '2rem'}}>
                            🤖
                        </div>
                        <h2>Curating Your Experience...</h2>
                        <p>
                            Please wait while our AI adapts this chapter for a 
                            <strong> {session.user.tech_background}</strong> student using 
                            <strong> {session.user.preferred_language}</strong> examples.
                        </p>
                        <div className="progress margin-top--md">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '100%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 3. The Personalized Content Area */}
        {showPersonalized && (
            <div className={`card margin-bottom--lg ${isLoading ? 'invisible' : ''}`} style={{border: '2px solid var(--ifm-color-primary)', overflow: 'hidden'}}>
                <div className="card__header" style={{backgroundColor: 'var(--ifm-color-primary-lightest)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{margin: 0, color: 'var(--ifm-color-primary-darker)'}}>
                        ✨ Your Personalized Explanation
                    </h3>
                    <button className="button button--sm button--secondary" onClick={() => setShowPersonalized(false)}>
                        Close
                    </button>
                </div>
                <div className="card__body">
                    {error ? (
                        <div className="alert alert--danger">{error}</div>
                    ) : (
                        <div className="prose dark:prose-invert max-w-none">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
}