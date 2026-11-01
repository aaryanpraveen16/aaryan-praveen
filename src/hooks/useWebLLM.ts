import { useState, useRef, useCallback, useEffect } from 'react';
import * as webllm from '@mlc-ai/web-llm';
import { 
  AARYAN_PORTFOLIO_CONTEXT, 
  DESKTOP_MODEL_ID, 
  MOBILE_FALLBACK_MODEL_ID,
  isMobileDevice 
} from '@/lib/webllmConfig';
import { streamFallbackResponse } from '@/lib/fallbackAssistant';

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
  activeModelId: string | null;
  isMobile: boolean;
  isFallbackMode: boolean;
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
let globalActiveModelId: string | null = null;
let globalIsMobile = false;
let globalIsFallbackMode = false;

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
 * silently in the background. On mobile or memory-constrained devices, automatically
 * selects the ultra-compact fallback model (SmolLM2-360M) to conserve memory.
 * If desktop model loading ever fails, it automatically falls back to SmolLM2.
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
      // Graceful fallback: do NOT set an ugly error string or fail
      globalIsFallbackMode = true;
      globalIsModelReady = true;
      globalModelProgress = 100;
      globalProgressText = 'Lightweight Guide Ready';
      globalActiveModelId = 'lightweight-guide';
      globalError = null;
      notifyListeners();
      return null;
    }

    try {
      const isMobile = isMobileDevice();
      globalIsMobile = isMobile;
      const targetModel = isMobile ? MOBILE_FALLBACK_MODEL_ID : DESKTOP_MODEL_ID;

      globalProgressText = isMobile 
        ? 'Starting mobile Web Worker (SmolLM2)...' 
        : 'Starting Web Worker...';
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

      let engine: webllm.WebWorkerMLCEngine;

      try {
        engine = await webllm.CreateWebWorkerMLCEngine(globalWorker, targetModel, {
          initProgressCallback,
        });
        globalActiveModelId = targetModel;
      } catch (initialErr: any) {
        // If desktop model fails (out of VRAM, shader compiler issue, etc.), automatically fall back to lightweight mobile model
        if (targetModel !== MOBILE_FALLBACK_MODEL_ID) {
          console.warn(`Primary model (${targetModel}) failed to initialize. Falling back to lightweight model (${MOBILE_FALLBACK_MODEL_ID})...`, initialErr);
          globalProgressText = 'Falling back to ultra-compact model (SmolLM2)...';
          globalModelProgress = 0;
          notifyListeners();

          engine = await webllm.CreateWebWorkerMLCEngine(globalWorker, MOBILE_FALLBACK_MODEL_ID, {
            initProgressCallback,
          });
          globalActiveModelId = MOBILE_FALLBACK_MODEL_ID;
        } else {
          throw initialErr;
        }
      }

      globalEngine = engine;
      globalIsModelReady = true;
      globalModelProgress = 100;
      globalProgressText = 'Ready';
      globalError = null;
      notifyListeners();
      return engine;
    } catch (err: any) {
      console.warn('Background WebLLM init issue, switching seamlessly to lightweight guide:', err);
      // Switch gracefully to fallback mode instead of showing a blocking error
      globalIsFallbackMode = true;
      globalIsModelReady = true;
      globalModelProgress = 100;
      globalProgressText = 'Lightweight Guide Ready';
      globalActiveModelId = 'lightweight-guide';
      globalError = null;
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
  const [activeModelId, setActiveModelId] = useState<string | null>(globalActiveModelId);
  const [isMobile, setIsMobile] = useState<boolean>(globalIsMobile || (typeof window !== 'undefined' ? isMobileDevice() : false));
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(globalIsFallbackMode || globalWebGPUSupported === false);
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
      setIsFallbackMode(globalIsFallbackMode || globalWebGPUSupported === false);
      setIsModelReady(globalIsModelReady);
      setModelProgress(globalModelProgress);
      setProgressText(globalProgressText);
      setError(globalError);
      setActiveModelId(globalActiveModelId);
      setIsMobile(globalIsMobile || isMobileDevice());
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

      // 1. If WebGPU is not supported or in fallback mode, stream immediate lightweight answer
      if (globalIsFallbackMode || globalWebGPUSupported === false) {
        let currentResponse = '';
        for await (const chunk of streamFallbackResponse(trimmed)) {
          currentResponse += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: currentResponse } : msg
            )
          );
        }
        setIsGenerating(false);
        return;
      }

      // 2. Otherwise run full WebLLM model
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
            // Gracefully stream via fallback assistant instead of failing
            let fallbackResponse = '';
            for await (const chunk of streamFallbackResponse(trimmed)) {
              fallbackResponse += chunk;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId ? { ...msg, content: fallbackResponse } : msg
                )
              );
            }
            setIsGenerating(false);
            return;
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
        console.warn('WebLLM generation issue, serving graceful fallback answer:', err);
        // Seamlessly serve response via lightweight assistant instead of showing an error
        let fallbackResponse = '';
        for await (const chunk of streamFallbackResponse(trimmed)) {
          fallbackResponse += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: fallbackResponse } : msg
            )
          );
        }
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
    activeModelId,
    isMobile,
    isFallbackMode,
    messages,
    isGenerating,
    error,
    loadModel,
    sendMessage,
    resetChat,
  };
}
