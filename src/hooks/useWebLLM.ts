import { useState, useRef, useCallback, useEffect } from 'react';
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
  loadModel: () => Promise<webllm.WebWorkerMLCEngine | null>;
  sendMessage: (userText: string) => Promise<void>;
  resetChat: () => void;
}

// Module-level singleton state so the Web Worker and downloaded model
// persist across re-renders, component unmounts, or page route changes.
let globalWorker: Worker | null = null;
let globalEngine: webllm.WebWorkerMLCEngine | null = null;
let globalLoadingPromise: Promise<webllm.WebWorkerMLCEngine | null> | null = null;
let globalWebGPUSupported: boolean | null = null;
let globalIsModelReady = false;
let globalModelProgress = 0;
let globalProgressText = '';
let globalError: string | null = null;

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch (e) {
      console.error('WebLLM listener error:', e);
    }
  });
}

/**
 * Checks if the browser environment supports WebGPU
 */
async function checkWebGPU(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (globalWebGPUSupported !== null) return globalWebGPUSupported;

  if (!('gpu' in navigator)) {
    globalWebGPUSupported = false;
    return false;
  }

  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    globalWebGPUSupported = !!adapter;
    return globalWebGPUSupported;
  } catch {
    globalWebGPUSupported = false;
    return false;
  }
}

/**
 * Initiates model download and engine initialization inside a dedicated Web Worker
 * silently in the background.
 */
export function initBackgroundModel(): Promise<webllm.WebWorkerMLCEngine | null> {
  if (globalIsModelReady && globalEngine) {
    return Promise.resolve(globalEngine);
  }

  if (globalLoadingPromise) {
    return globalLoadingPromise;
  }

  globalLoadingPromise = (async () => {
    const supported = await checkWebGPU();
    notifyListeners();

    if (!supported) {
      globalError = 'WebGPU is not supported on this browser/device. Please try on modern desktop Chrome or Edge.';
      notifyListeners();
      return null;
    }

    try {
      globalProgressText = 'Starting Web Worker...';
      notifyListeners();

      if (!globalWorker) {
        globalWorker = new Worker(new URL('../worker.ts', import.meta.url), {
          type: 'module',
        });
      }

      const initProgressCallback = (report: webllm.InitProgressReport) => {
        globalProgressText = report.text;
        if (typeof report.progress === 'number' && !isNaN(report.progress)) {
          globalModelProgress = Math.round(report.progress * 100);
        }
        notifyListeners();
      };

      const engine = await webllm.CreateWebWorkerMLCEngine(globalWorker, DEFAULT_MODEL_ID, {
        initProgressCallback,
      });

      globalEngine = engine;
      globalIsModelReady = true;
      globalModelProgress = 100;
      globalProgressText = 'Ready';
      globalError = null;
      notifyListeners();
      return engine;
    } catch (err: any) {
      console.error('Background WebLLM init error:', err);
      globalError = err?.message || 'Failed to initialize the in-browser model.';
      globalIsModelReady = false;
      notifyListeners();
      return null;
    } finally {
      globalLoadingPromise = null;
    }
  })();

  return globalLoadingPromise;
}

export function useWebLLM(): UseWebLLMReturn {
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(globalWebGPUSupported);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(!globalIsModelReady && !!globalLoadingPromise);
  const [modelProgress, setModelProgress] = useState<number>(globalModelProgress);
  const [progressText, setProgressText] = useState<string>(globalProgressText);
  const [isModelReady, setIsModelReady] = useState<boolean>(globalIsModelReady);
  const [error, setError] = useState<string | null>(globalError);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Aaryan's AI assistant running directly in your browser. Ask me about his projects, experience, skills, or contact info!",
    },
  ]);

  // Sync with module-level singleton state
  useEffect(() => {
    const handleSync = () => {
      setIsWebGPUSupported(globalWebGPUSupported);
      setIsModelReady(globalIsModelReady);
      setModelProgress(globalModelProgress);
      setProgressText(globalProgressText);
      setError(globalError);
      setIsLoadingModel(!globalIsModelReady && (!!globalLoadingPromise || globalModelProgress > 0));
    };

    listeners.add(handleSync);
    handleSync();

    // Silently kick off background download on mount after a small delay
    // so initial page paint and animations complete with zero lag
    const timer = setTimeout(() => {
      initBackgroundModel();
    }, 1200);

    return () => {
      listeners.delete(handleSync);
      clearTimeout(timer);
    };
  }, []);

  const loadModel = useCallback(() => {
    return initBackgroundModel();
  }, []);

  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed || isGenerating) return;

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
        let engine = globalEngine;

        // If the model is still loading in the background, smoothly await it
        if (!engine || !globalIsModelReady) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: 'Warming up model in background... streaming will begin in a moment.',
                  }
                : msg
            )
          );

          engine = await initBackgroundModel();
          if (!engine) {
            throw new Error(globalError || 'Model failed to initialize in browser.');
          }
        }

        // Clear placeholder loading message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: '' } : msg
          )
        );

        // Keep last 4 messages to preserve context window in compact models
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

        const chunks = await engine.chat.completions.create({
          messages: history,
          stream: true,
          temperature: 0.2,
          max_tokens: 180,
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
              ? {
                  ...msg,
                  content:
                    'I ran into a temporary issue with the local model. Please check that WebGPU is enabled or try again in a few seconds!',
                }
              : msg
          )
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [isGenerating, messages]
  );

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Aaryan's AI assistant running directly in your browser. Ask me about his projects, experience, skills, or contact info!",
      },
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
