import * as webllm from "@mlc-ai/web-llm";

// Hook up WebWorkerMLCEngineHandler in this dedicated worker thread
const handler = new webllm.WebWorkerMLCEngineHandler();
self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};
