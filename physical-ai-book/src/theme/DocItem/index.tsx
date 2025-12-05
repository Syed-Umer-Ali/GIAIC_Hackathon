import React, { type ReactNode, useState } from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '../../components/Auth/AuthProvider'; // Import Auth
import SummaryTab from '../../components/LessonTabs/Summary';
import Translator from '../../components/LessonTabs/Translator';
import Quiz from '../../components/LessonTabs/Quiz';
import PersonalizedContent from '../../components/PersonalizedContent';
import styles from '../../components/LessonTabs/styles.module.css';

type Props = WrapperProps<typeof DocItemType>;

// Extract clean slug from location path
const getSlugFromPath = (path: string): string => {
  const docsPrefix = '/docs/';
  if (path.startsWith(docsPrefix)) {
    return path.substring(docsPrefix.length);
  }
  return path.replace(/^\/+/, '');
};

export default function DocItemWrapper(props: Props): ReactNode {
  const location = useLocation();
  const { session } = useAuth();
  const slug = getSlugFromPath(location.pathname);

  // View Mode State: 'original' or 'personalized'
  const [viewMode, setViewMode] = useState<'original' | 'personalized'>('original');
  
  // Lesson Tools State (Summary/Quiz etc)
  const [activeTool, setActiveTool] = useState<'summary' | 'language' | 'assessment' | null>(null);

  const handleToolClick = (tool: 'summary' | 'language' | 'assessment') => {
    if (activeTool === tool) {
        setActiveTool(null);
    } else {
        setActiveTool(tool);
    }
  };

  return (
    <>
      {/* 1. Top Level Tools (Summary, Quiz, Translate) - Always visible */}
      <div className="margin-bottom--md">
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${styles.summaryTab} ${activeTool === 'summary' ? styles.activeTab : ''}`}
            onClick={() => handleToolClick('summary')}
          >
            <span className={styles.emojiIcon}>📝</span> Summary
          </button>

          <button
            className={`${styles.tabButton} ${styles.languageTab} ${activeTool === 'language' ? styles.activeTab : ''}`}
            onClick={() => handleToolClick('language')}
          >
            <span className={styles.emojiIcon}>🌐</span> Language
          </button>

          <button
            className={`${styles.tabButton} ${styles.assessmentTab} ${activeTool === 'assessment' ? styles.activeTab : ''}`}
            onClick={() => handleToolClick('assessment')}
          >
            <span className={styles.emojiIcon}>✅</span> Assessment
          </button>
        </div>

        {/* Tool Content Area */}
        {activeTool === 'summary' && <SummaryTab slug={slug} />}
        {activeTool === 'language' && <Translator slug={slug} />}
        {activeTool === 'assessment' && <Quiz slug={slug} />}
      </div>

      {/* 2. View Mode Toggles (Only if Logged In) */}
      {session?.user && (
        <div className="margin-bottom--lg" style={{borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '10px'}}>
            <div className="button-group button-group--block">
                <button 
                    className={`button ${viewMode === 'original' ? 'button--primary' : 'button--secondary button--outline'}`}
                    onClick={() => setViewMode('original')}
                >
                    📄 Original Lesson
                </button>
                <button 
                    className={`button ${viewMode === 'personalized' ? 'button--primary' : 'button--secondary button--outline'}`}
                    onClick={() => setViewMode('personalized')}
                >
                    ✨ Personalized for You
                </button>
            </div>
            {viewMode === 'personalized' && (
                <small style={{display: 'block', marginTop: '5px', color: 'var(--ifm-color-emphasis-600)', textAlign: 'center'}}>
                    Adapted for <strong>{session.user.proficiency}</strong> level & <strong>{session.user.tech_background}</strong> background.
                </small>
            )}
        </div>
      )}

      {/* 3. Main Content Area */}
      {viewMode === 'original' ? (
          // Show Standard Docusaurus Content
          <DocItem {...props} />
      ) : (
          // Show AI Personalized Content
          <PersonalizedContent />
      )}
    </>
  );
}
