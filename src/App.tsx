import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LinkTester } from "./components/LinkTester";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 상태를 localStorage에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  // 다크모드 상태 변경 시 DOM 클래스 및 localStorage 업데이트
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="animate-in fade-in-50 slide-in-from-top-4 duration-500">
          <LinkTester />
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}