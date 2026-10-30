import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  Cpu, 
  RotateCcw, 
  ChevronDown, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useWebLLM } from '@/hooks/useWebLLM';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

const SUGGESTED_PROMPTS = [
  "What are Aaryan's top projects?",
  "Tell me about his work experience",
  "What is his educational background?",
  "How can I contact Aaryan?"
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isWebGPUSupported,
    isLoadingModel,
    modelProgress,
    progressText,
    isModelReady,
    messages,
    isGenerating,
    error,
    sendMessage,
    resetChat,
  } = useWebLLM();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Gentle auto-focus so user can type immediately
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    const text = inputText;
    setInputText('');
    sendMessage(text);
  };

  const handleSuggestedClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-4 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] flex flex-col rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3.5 bg-secondary/50 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className={cn(
                  "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
                  isModelReady 
                    ? "bg-emerald-500" 
                    : isLoadingModel 
                    ? "bg-amber-500 animate-pulse" 
                    : isWebGPUSupported === false 
                    ? "bg-rose-500" 
                    : "bg-muted-foreground/40"
                )} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">Aaryan's AI</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                    WebLLM Worker
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isModelReady 
                    ? "Ready · Local in-browser WebGPU" 
                    : isLoadingModel 
                    ? `Downloading in background (${modelProgress}%)...` 
                    : isWebGPUSupported === false
                    ? "WebGPU not supported on device"
                    : "Initializing background worker..."}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {messages.length > 1 && (
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  disabled={isGenerating}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Background Download Banner (shown only while downloading in background) */}
          {!isModelReady && isLoadingModel && (
            <div className="p-3.5 border-b border-border bg-card/60 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex-1 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">Downloading model in background</p>
                    <span className="font-mono text-[11px] text-primary font-semibold">{modelProgress}%</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    Runs on a background Web Worker with WebGPU. Cached permanently for instant repeat visits. You can type now!
                  </p>

                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.max(modelProgress, 6)}%` }}
                    />
                  </div>
                  {progressText && (
                    <p className="text-[10px] font-mono text-muted-foreground truncate max-w-[280px]">
                      {progressText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message Alert */}
          {error && (
            <div className="m-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Notice</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 max-w-[88%]",
                    isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
                  )}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 border border-primary/20">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "px-3.5 py-2.5 rounded-2xl leading-relaxed text-xs sm:text-sm break-words",
                      isAssistant
                        ? "bg-secondary/70 text-foreground rounded-tl-sm border border-border/50"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    {msg.content ? (
                      isAssistant ? (
                        <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed [&>p]:my-1.5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:my-1.5 [&>ul]:pl-4 [&>ul]:list-disc [&>ol]:my-1.5 [&>ol]:pl-4 [&>ol]:list-decimal [&>li]:my-0.5 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground italic text-xs py-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Thinking...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts when chat is fresh */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-border/40 bg-secondary/20">
              <p className="text-[11px] text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestedClick(prompt)}
                    className="text-xs px-2.5 py-1 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form 
            onSubmit={handleSubmit}
            className="p-3 bg-secondary/30 border-t border-border flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isGenerating 
                  ? "AI is generating..." 
                  : isWebGPUSupported === false
                  ? "WebGPU not supported on this browser"
                  : isLoadingModel 
                  ? "Downloading in background... you can type now!" 
                  : "Ask about Aaryan's projects, experience..."
              }
              disabled={isGenerating || isWebGPUSupported === false}
              className="flex-1 bg-background px-3 py-2 text-xs sm:text-sm rounded-xl border border-input focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isGenerating || isWebGPUSupported === false || !inputText.trim()}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition active:scale-95 shrink-0"
              aria-label="Send message"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group relative flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
          isOpen ? "ring-2 ring-primary/50" : ""
        )}
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? (
          <>
            <ChevronDown className="w-5 h-5" />
            <span className="text-xs font-semibold">Close</span>
          </>
        ) : (
          <>
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-medium">Chat with AI</span>
            <span className="flex h-2 w-2 relative">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                isModelReady ? "bg-emerald-400" : "bg-amber-400"
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                isModelReady ? "bg-emerald-500" : "bg-amber-500"
              )}></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};
