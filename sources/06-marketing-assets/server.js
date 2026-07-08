import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PROMPT_REPO_PATH = process.env.NANO_BANANA_PROMPT_REPO_PATH; // set this
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const server = new Server(
  { name: "gemini-nano-banana", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.tool(
  "nano_banana_search_prompts",
  {
    query: { type: "string", description: "What you are creating (thumbnail, carousel, ad, etc)" },
    limit: { type: "number", default: 5 }
  },
  async ({ query, limit }) => {
    // naive: scan markdown files, return top matches (improve later with embeddings)
    const files = await fg(["**/*.md"], { cwd: PROMPT_REPO_PATH, absolute: true });
    const hits = [];

    for (const file of files) {
      const text = fs.readFileSync(file, "utf8");
      if (text.toLowerCase().includes(query.toLowerCase())) {
        hits.push({ file: path.relative(PROMPT_REPO_PATH, file), snippet: text.slice(0, 600) });
      }
      if (hits.length >= limit) break;
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ query, results: hits.slice(0, limit) }, null, 2)
        }
      ]
    };
  }
);

server.tool(
  "gemini_generate_image",
  {
    prompt: { type: "string", description: "Final Nano Banana style prompt to send to Gemini" }
  },
  async ({ prompt }) => {
    // NOTE: exact model name may vary; keep this as a placeholder for your Gemini image model.
    // You can swap to the correct image-capable model you use internally.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    return {
      content: [{ type: "text", text: result.response.text() }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
