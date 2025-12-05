import React, { useState } from 'react';
import DocItem from '@theme-original/DocItem';
import PersonalizationToggle from '@site/src/components/PersonalizationToggle';
import PersonalizedContent from '@site/src/components/PersonalizedContent';
// Import MDX provider to access raw content if available, 
// or we might need to rely on the props passed to DocItem usually containing the content
// For Docusaurus v2/v3, the content is often passed as children or props. 
// However, getting the *raw* text for the AI is tricky from the compiled MDX.
// Strategy: We will pass the "children" (rendered MDX) to the AI? No, AI needs text.
// Alternative: We assume the user wants a "Summary/Rewrite" of the *concept*, 
// so we might need to fetch the raw markdown file or just send the textContent of the rendered output.
// Let's try sending `document.querySelector('.markdown').innerText` logic inside PersonalizedContent? 
// Or better, for this MVP, we stick to a "Demo" mode where we might not get the exact full chapter text 
// unless we read it from a side-loaded map or specific prop.

export default function DocItemWrapper(props) {
  const [isPersonalized, setIsPersonalized] = useState(false);
  
  // Hacky way to get text content for MVP:
  // In a real app, we might want a server-side way to get the raw MD source.
  // For now, let's pass a placeholder or try to extract from props if possible.
  const contentId = props.content?.metadata?.id || "chapter";

  return (
    <>
      <div className="margin-bottom--md">
        <PersonalizationToggle 
            isEnabled={isPersonalized} 
            onToggle={setIsPersonalized} 
        />
      </div>
      
      {isPersonalized ? (
        <PersonalizedContent originalContent={`Rewrite this chapter: ${contentId}`} />
      ) : (
        <DocItem {...props} />
      )}
    </>
  );
}