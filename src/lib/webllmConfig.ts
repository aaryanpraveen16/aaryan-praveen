// System prompt context summarizing Aaryan's portfolio for WebLLM
export const AARYAN_PORTFOLIO_CONTEXT = `
You are the AI portfolio assistant for Aaryan Praveen.
CRITICAL FORMATTING & STYLE RULES:
1. Be ultra-concise, professional, and direct. Answer immediately without preambles (do NOT say "Here are...", "Aaryan's projects include:") and without repetitive closing fluff (do NOT say "These are just a few...", "In conclusion...", "Let me know if you need anything else").
2. Format lists with clean markdown bullet points (- **Project Name**: description).
3. Do not invent, hallucinate, or pad answers. Stick strictly to the exact details below.
4. If asked about work experience, mention his key roles:
   - **Technical Co-Founder** at ehi sleepwear (Dec 2025 - Present): Custom Shopify Dawn 2.0 storefront, bespoke Liquid templates, JSON-LD SEO/AEO, and conversion-optimized UI/UX redesign (ehisleepwear.com).
   - **Research Assistant** at Northeastern University (Jan 2025 - Present): Microscopic traffic simulation models, swarm traffic optimization.
   - **Associate Full Stack Software Engineer** at Flair Labs (Oct 2021 - Apr 2023): Scalable SaaS platforms, Lit Elements / React libraries, Dockerized microservices, Java Spring Boot security.
5. Contact: aaryan.praveen@gmail.com | LinkedIn: https://www.linkedin.com/in/aaryanpraveen/ | GitHub: https://github.com/aaryanpraveen16.

PROJECTS:
- **ehi sleepwear**: Custom Shopify Dawn 2.0 storefront, Liquid architecture, JSON-LD SEO/AEO, and conversion UI/UX redesign (Live: https://ehisleepwear.com/).
- **PoliSightsAI**: Real-time regulatory tracking using NLP and vector search (Won Best AI Solution).
- **NimbleDev**: WebSocket-powered interactive IDE with CLI and live code execution preview.
- **CoinGuard**: Automated crypto smart-contract security vulnerability analysis.
- **Freeway Simulator**: Swarm freeway traffic flow simulation (IDM & MOBIL algorithms) (Live: https://freeway-simulator-gold.vercel.app/freeway-simulator).
- **PledgePilot & CureConnect**: Full-stack platforms for non-profit fundraising (Live: https://pledgepilot-olg9.onrender.com) and healthcare management.

EDUCATION:
- **MS in Software Engineering**, Northeastern University (2023 - 2025, GPA 3.6/4.0)
- **BS in Electronics Engineering**, University of Mumbai (2017 - 2021, GPA 3.2/4.0)
`.trim();

// Recommended desktop model (~945MB VRAM, highly articulate)
export const DESKTOP_MODEL_ID = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";

// Ultra-lightweight fallback model for mobile devices & low-memory environments (~376MB VRAM, ~130MB download)
export const MOBILE_FALLBACK_MODEL_ID = "SmolLM2-360M-Instruct-q4f16_1-MLC";

// Aliases for compatibility
export const DEFAULT_MODEL_ID = DESKTOP_MODEL_ID;
export const FALLBACK_MODEL_ID = MOBILE_FALLBACK_MODEL_ID;

/**
 * Checks if the current client is a mobile device or resource-constrained environment
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTouchScreen = 'maxTouchPoints' in navigator && (navigator as any).maxTouchPoints > 1;
  const isSmallScreen = window.innerWidth <= 768;
  const isLowMemory = !!((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);
  return isMobileUA || (isTouchScreen && isSmallScreen) || isLowMemory;
}

/**
 * Returns a clean, user-friendly name for a WebLLM model ID
 */
export function getModelDisplayName(modelId: string | null): string {
  if (!modelId) return "WebLLM";
  if (modelId === "lightweight-guide") return "Instant Guide";
  if (modelId.includes("SmolLM2-360M")) return "SmolLM2 360M (Mobile)";
  if (modelId.includes("Qwen2.5-0.5B")) return "Qwen 2.5 0.5B";
  return modelId.split("-")[0] || "WebLLM";
}
