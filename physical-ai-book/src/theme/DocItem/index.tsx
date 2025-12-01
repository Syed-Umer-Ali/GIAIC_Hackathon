import React, { type ReactNode, useState } from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import SummaryTab from '../../components/LessonTabs/Summary';
import Translator from '../../components/LessonTabs/Translator';
import Quiz from '../../components/LessonTabs/Quiz';
import styles from '../../components/LessonTabs/styles.module.css';

type Props = WrapperProps<typeof DocItemType>;

// Extract clean slug from location path
// Docusaurus paths: /docs/01-ros2/fundamentals -> 01-ros2/fundamentals
const getSlugFromPath = (path: string): string => {
  const docsPrefix = '/docs/';
  if (path.startsWith(docsPrefix)) {
    return path.substring(docsPrefix.length);
  }
  // Fallback for root docs or unexpected paths
  return path.replace(/^\/+/, '');
};

export default function DocItemWrapper(props: Props): ReactNode {
  const location = useLocation();
  const slug = getSlugFromPath(location.pathname);

  // Simple Tab State
  const [activeTab, setActiveTab] = useState<'summary' | 'language' | 'assessment' | null>(null);

  const handleTabClick = (tab: 'summary' | 'language' | 'assessment') => {
    if (activeTab === tab) {
      setActiveTab(null); // Toggle off
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <>
      {/* Lesson Tabs UI - Injected above the main DocItem */}
      <div className="margin-bottom--md">
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabButton} ${styles.summaryTab} ${activeTab === 'summary' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('summary')}
          >
            <span className={styles.emojiIcon}>📝</span> Summary
          </button>

          <button
            className={`${styles.tabButton} ${styles.languageTab} ${activeTab === 'language' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('language')}
          >
            <span className={styles.emojiIcon}>🌐</span> Language
          </button>

          <button
            className={`${styles.tabButton} ${styles.assessmentTab} ${activeTab === 'assessment' ? styles.activeTab : ''}`}
            onClick={() => handleTabClick('assessment')}
          >
            <span className={styles.emojiIcon}>✅</span> Assessment
          </button>
        </div>

        {/* Tab Content Area */}
        {activeTab === 'summary' && (
          <SummaryTab slug={slug} />
        )}

        {activeTab === 'language' && (
          <Translator slug={slug} />
        )}

        {activeTab === 'assessment' && (
          <Quiz slug={slug} />
        )}
      </div>

      <DocItem {...props} />
    </>
  );
}