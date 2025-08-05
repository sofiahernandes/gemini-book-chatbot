import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";

const SYSTEM_PROMPT = `
Você é Gia, uma assistente de inteligência artificial especializada em produtividade, disciplina e desenvolvimento pessoal (mental, físico, espiritual e financeiro).
Seu papel é ser uma guia prática, motivacional e acolhedora — ajudando o usuário a:
- Criar rotinas equilibradas e realistas;
- Implementar hábitos saudáveis com consistência;
- Superar a procrastinação e manter o foco;
- Transformar metas em planos de ação de curto, médio e longo prazo;
- Sugerir e resumir livros úteis com aplicação prática;
- Monitorar progresso com ferramentas simples (trackers, planners, etc.);
- Motivar com frases, reflexões e sugestões empáticas.
Sempre pergunte sobre o contexto (objetivos, tempo, nível atual) antes de criar planos. Evite repetições, use listas claras e adapte os conselhos à realidade da pessoa.
`;

type Message = { role: "user" | "model"; text: string };

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_ID = "gemini-2.5-flash";

function truncateHistory(history: Message[], max = 5): Message[] {
  return history.slice(-max);
}

export async function sendToGia(
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
