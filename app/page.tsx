'use client';

import { Brain, Target, Zap } from "lucide-react"
import { ThemeSelector } from "./components/theme-selector"

export default function HomePage() {
  // Render nothing or a loading spinner until userId is determined
  /*
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen animate-pulse">
        <img width="50px" alt="App loading icon" src="butterfly-icon.png"/>
      </div>
    );
  }
  */

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
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-theme-primary-foreground" />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-theme-foreground tracking-tight">
              Olá! Eu sou a <span className="font-semibold text-theme-primary">Gia</span>
            </h1>

            {/* Feature Pills */}
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
          <p className="text-theme-foreground">Exemples</p>
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            placeholder="Digite sua mensagem..."
            value={"Valor do input"}
            onChange={(e) => console.log("Alterar texto")}
            disabled={false}
          />
          <button
            onClick={() => console.log("Enviar mensagem")}
            disabled={false}
            className="px-4 py-2 bg-theme-user-message text-white rounded-r-lg hover:bg-theme-primary-foreground disabled:bg-theme-accent focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}