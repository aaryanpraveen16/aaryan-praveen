import { AARYAN_AI_SYSTEM_PROMPT } from '../src/lib/aiContext';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Friendly fallback if the API key has not yet been set up
    if (!apiKey) {
      const fallbackResponse = 
        "Hi there! The portfolio AI is ready to connect with Google Gemini 1.5 Flash. " +
        "To enable live answers, please set GEMINI_API_KEY in your Vercel Project Settings (Environment Variables) or in your local .env.local file. " +
        "You can get a free key in 30 seconds at https://aistudio.google.com/ !";

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(fallbackResponse));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Format chat history for Gemini API
    const formattedContents = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .slice(-6) // Keep last 6 exchanges for context
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    const geminiPayload = {
      system_instruction: {
        parts: [{ text: AARYAN_AI_SYSTEM_PROMPT }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 500,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', errorText);
      return new Response(`Error communicating with Gemini: ${geminiResponse.statusText}`, {
        status: geminiResponse.status,
      });
    }

    // Stream SSE text chunks to client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!geminiResponse.body) {
          controller.close();
          return;
        }

        const reader = geminiResponse.body.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                const jsonStr = trimmed.slice(6);
                try {
                  const parsed = JSON.parse(jsonStr);
                  const textDelta = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textDelta) {
                    controller.enqueue(encoder.encode(textDelta));
                  }
                } catch {
                  // Ignore SSE keep-alives or partial JSON
                }
              }
            }
          }
        } catch (err) {
          console.error('Streaming parse error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
