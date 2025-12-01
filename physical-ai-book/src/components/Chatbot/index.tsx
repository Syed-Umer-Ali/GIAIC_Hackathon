import React, { useState, useEffect } from 'react';
import { ChatWindow, Message } from './ChatWindow';
import { TextSelectionBlip } from './TextSelectionBlip';
import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Chatbot() {
  const { siteConfig } = useDocusaurusContext();
  
  let baseUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:8000';
  
  // Ensure protocol exists to avoid relative path interpretation
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  // Remove trailing slash if present
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  
  const API_URL = `${cleanBaseUrl}/chat/message`;
  const HISTORY_URL = `${cleanBaseUrl}/chat/sessions`;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState('');
  const [blipPosition, setBlipPosition] = useState<{ top: number; left: number } | null>(null);
  const [sessionId, setSessionId] = useState<string>('temp-session');

  const location = useLocation();

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString() || '';
      setSelection(text);

      if (text && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        console.log('Selected Text:', text);
        console.log('Selection Range:', range);
        console.log('Bounding Rect:', rect);
        setBlipPosition({
          top: rect.top,
          left: rect.left + rect.width / 2 // Center the blip horizontally
        });
      } else {
        console.log('No valid text selection or range found.');
        setBlipPosition(null);
      }
    };
    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  useEffect(() => {
    const storedSession = localStorage.getItem('chat_session_id');
    if (storedSession) {
      setSessionId(storedSession);
      // Fetch history
      fetch(`${HISTORY_URL}/${storedSession}/history`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMessages(data);
          }
        })
        .catch(err => console.error("Failed to load history", err));
    }
  }, []);

  const doSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const currentSelection = window.getSelection()?.toString() || '';
    const currentPage = location.pathname;

    console.log("Sending Message:", { input: textToSend, currentPage, currentSelection, sessionId });

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botMsg: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, botMsg]);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          query: userMsg.content,
          current_page: currentPage,
          selected_text: currentSelection || undefined
        }),
      });

      if (!response.ok) throw new Error('Network error');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let botContent = '';
      let sources: any[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                botContent += data.text;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = {
                    ...newMsgs[newMsgs.length - 1],
                    content: botContent
                  };
                  return newMsgs;
                });
              }
              if (data.sources) {
                sources = data.sources;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = {
                    ...newMsgs[newMsgs.length - 1],
                    sources: sources
                  };
                  return newMsgs;
                });
              }
              if (data.session_id) {
                setSessionId(data.session_id);
                localStorage.setItem('chat_session_id', data.session_id);
              }
            } catch (e) {
              console.error('Error parsing SSE chunk:', e, dataStr);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', content: 'Sorry, I encountered an error connecting to the server.' };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlipClick = () => {
    setIsOpen(true);
    setBlipPosition(null);
    if (selection) {
      const prompt = `Explain this: "${selection}"`;
      setInput(prompt);
      doSend(prompt);
    }
  };

  const handleSend = () => doSend();

  return (
    <div className={styles.container}>
      {!isOpen && (
        <>
          <button className={styles.toggleButton} onClick={() => setIsOpen(true)} aria-label="Open Chat">
            💬
          </button>
          <TextSelectionBlip position={blipPosition} onClick={handleBlipClick} />
        </>
      )}

      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onClose={() => setIsOpen(false)}
          selection={selection}
        />
      )}
    </div>
  );
}