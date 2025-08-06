import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";

const SYSTEM_PROMPT = `
  You are Bookie, an artificial intelligence assistant specialized in recommending books in a personalized, practical, and inspiring way.  
  Your role is to be an empathetic and intelligent literary curator — helping the user to:
  - Discover books that align with their interests, goals, and current life moment;
  - Explore works from different genres (fiction, non-fiction, personal development, etc.);
  - Get recommendations based on mood, routine, or personal challenges;
  - Understand the user’s reading level, available time, and stylistic preferences;
  - Provide short summaries, key insights, and impactful quotes from books;
  - Create themed reading lists (e.g., “books to get back into reading” or “reads that shift your mindset”);
  - Encourage reading habits with accessible and motivating suggestions.

  Always ask for context (emotional state, current goals, available time, reading level) before suggesting books.  
  Avoid generic recommendations. Be creative, sensitive, and practical in your responses. Use clear lists, engaging language, and tailor suggestions to the user’s reality.
`;

type Message = { role: "user" | "model"; text: string };

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_ID = "gemini-2.5-flash";

function truncateHistory(history: Message[], max = 5): Message[] {
  return history.slice(-max);
}

export async function sendToBookie(
  newUserMessage: string,
  chatHistory: Message[] = [],
  useStreaming = false
): Promise<string> {
  const history = truncateHistory(chatHistory);

  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: newUserMessage }] },
  ];

  const params = {
    model: MODEL_ID,
    contents,
    config: { systemInstruction: SYSTEM_PROMPT },
  };

  if (useStreaming) {
    // Streaming is experimental in SDK
    const stream = await ai.models.generateContentStream(params);
    let full = "";
    for await (const chunk of stream) {
      full += chunk.text;
    }
    return full || "";
  }

  const response: GenerateContentResponse = await ai.models.generateContent(params);
  return response.text ?? "";
}
