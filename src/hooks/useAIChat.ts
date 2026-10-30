import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Aaryan's AI assistant powered by Gemini. Ask me anything about his projects, work experience, education, or how to get in touch!",
};

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isGenerating) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
    };

    const assistantId = (Date.now() + 1).toString();
    const assistantPlaceholder: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, assistantPlaceholder]);
    setIsGenerating(true);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response stream available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error('Chat error:', err);
      const fallbackMsg = "I ran into a temporary issue connecting to the AI service. Please try asking again!";
      setError(err?.message || 'Failed to generate response.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: fallbackMsg }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, [messages, isGenerating]);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setIsGenerating(false);
  }, []);

  return {
    messages,
    isGenerating,
    error,
    sendMessage,
    resetChat,
  };
}
