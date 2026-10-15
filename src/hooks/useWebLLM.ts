import { useState, useRef, useCallback } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { AARYAN_PORTFOLIO_CONTEXT, DEFAULT_MODEL_ID } from '@/lib/webllmConfig';

export interface ChatMessage {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface UseWebLLMReturn {
  isWebGPUSupported: boolean | null;
  isLoadingModel: boolean;
  modelProgress: number; // 0 to 100
  progressText: string;
  isModelReady: boolean;
  messages: ChatMessage[];
  isGenerating: boolean;
  error: string | null;
  loadModel: () => Promise<void>;
  sendMessage: (userText: string) => Promise<void>;
  resetChat: () => void;
}

export function useWebLLM(): UseWebLLMReturn {
  const engineRef = useRef<webllm.WebWorkerMLCEngine | null>(null);
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(null);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [isModelReady, setIsModelReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Aaryan's AI assistant running directly in your browser. Ask me about his projects, experience, skills, or contact info!"
    }
  ]);

  const checkWebGPU = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    if (!('gpu' in navigator)) {
      setIsWebGPUSupported(false);
      return false;
    }
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      const supported = !!adapter;
      setIsWebGPUSupported(supported);
      return supported;
    } catch {
      setIsWebGPUSupported(false);
      return false;
    }
  }, []);

  const loadModel = useCallback(async () => {
    if (isModelReady || isLoadingModel) return;

    setError(null);
    setIsLoadingModel(true);
    setProgressText('Checking WebGPU support...');

    const supported = await checkWebGPU();
    if (!supported) {
      setIsLoadingModel(false);
      setError('WebGPU is not enabled on your browser. Please try Chrome/Edge with hardware acceleration enabled.');
      return;
    }

    try {
      // Use dedicated Web Worker so tab NEVER freezes during model execution
      const worker = new Worker(new URL('../worker.ts', import.meta.url), {
        type: 'module',
      });

      const initProgressCallback = (report: webllm.InitProgressReport) => {
        setProgressText(report.text);
        if (typeof report.progress === 'number' && !isNaN(report.progress)) {
          setModelProgress(Math.round(report.progress * 100));
        }
      };

      const engine = await webllm.CreateWebWorkerMLCEngine(worker, DEFAULT_MODEL_ID, {
        initProgressCallback,
      });

      engineRef.current = engine;
      setIsModelReady(true);
      setIsLoadingModel(false);
      setProgressText('Ready!');
    } catch (err: any) {
      console.error('Error initializing WebLLM worker engine:', err);
      setIsLoadingModel(false);
      setError(err?.message || 'Failed to initialize the in-browser model.');
    }
  }, [isModelReady, isLoadingModel, checkWebGPU]);

  const sendMessage = useCallback(async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isGenerating) return;

    if (!isModelReady || !engineRef.current) {
      setError('Model is not initialized yet.');
      return;
    }

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

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setIsGenerating(true);
    setError(null);

    try {
      // Only keep last 2 pairs of history to avoid context window degradation in 0.5B models
      const recentHistory = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-4)
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

      const history: webllm.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: AARYAN_PORTFOLIO_CONTEXT,
        },
        ...recentHistory,
        {
          role: 'user',
          content: trimmed,
        },
      ];

      const chunks = await engineRef.current.chat.completions.create({
        messages: history,
        stream: true,
        temperature: 0.2, // Lower temperature to prevent rambling and hallucination
        max_tokens: 180,   // Prevent endless repeating loops
      });

      let currentResponse = '';

      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          currentResponse += delta;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: currentResponse } : msg
            )
          );
        }
      }
    } catch (err: any) {
      console.error('WebLLM generation error:', err);
      setError(err?.message || 'Error generating response.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: "I encountered an error. Please ask again!" }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating, isModelReady, messages]);

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Aaryan's AI assistant running directly in your browser. Ask me about his projects, experience, skills, or contact info!"
      }
    ]);
  }, []);

  return {
    isWebGPUSupported,
    isLoadingModel,
    modelProgress,
    progressText,
    isModelReady,
    messages,
    isGenerating,
    error,
    loadModel,
    sendMessage,
    resetChat,
  };
}
