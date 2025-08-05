'use client';

import { useState } from 'react';
import { Brain, Target, Zap } from "lucide-react";
import { ThemeSelector } from "./components/theme-selector";

type Message = {
  role: "user" | "model";
  text: string;
};

export default function HomePage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    const updatedChat = [...chat, userMessage];
    setChat(updatedChat);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: updatedChat,
        }),
      });

      const data = await res.json();

      if (data.response) {
        setChat([...updatedChat, { role: "model", text: data.response }]);
      } else {
        setChat([...updatedChat, { role: "model", text: "Desculpe, algo deu errado." }]);
      }
    } catch (err) {
      console.error(err);
      setChat([...updatedChat, { role: "model", text: "Erro ao conectar com Gia." }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-theme-accent p-2">
      {/* Header Section */}
      <div className="relative w-full px-2 z-10 bg-theme-header-bg backdrop-blur-sm mb-6">
        <div className="flex justify-between align-top mb-4">
          <button
            onClick={() => console.log('Sair')}
            className="px-4 text-xs rounded-md hover:text-red-700 hover:font-bold focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Log out
          </button>
          <ThemeSelector />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-theme-primary-foreground" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-theme-foreground tracking-tight">
              Olá! Eu sou a <span className="font-semibold text-theme-primary">Gia</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-theme-secondary text-theme-secondary-foreground rounded-full text-sm">
                <Target className="w-3 h-3" />
                Foco
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-theme-secondary text-theme-secondary-foreground rounded-full text-sm">
                <Zap className="w-3 h-3" />
                Produtividade
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-theme-secondary text-theme-secondary-foreground rounded-full text-sm">
                <Brain className="w-3 h-3" />
                Disciplina
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box Section */}
      <div className="w-full max-w-3xl border border-theme-border bg-theme-card rounded-lg shadow-md flex flex-col h-[55vh]">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.role === "user"
                  ? "bg-theme-user-message text-white self-end"
                  : "bg-theme-system-message text-theme-foreground self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="italic text-sm text-theme-foreground/60">
              Gia está digitando...
            </div>
          )}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-theme-user-message text-white rounded-r-lg hover:bg-theme-primary-foreground disabled:bg-theme-accent focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}