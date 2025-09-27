import { useEffect } from "react";
import { Header } from "./components/Header";
import { LinkTester } from "./components/LinkTester";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  useEffect(() => {
    // 버전 정보 콘솔 출력
    console.log(
      '%c🔗 DeepLink Test App',
      'color: #9747ff; font-size: 18px; font-weight: bold;'
    );
    console.log(
      '%cVersion: 0.1.4 - Platform Detection Fixed',
      'color: #666; font-size: 14px;'
    );
    console.log(
      '%cBuild: %s',
      'color: #666; font-size: 12px;',
      new Date().toISOString()
    );
    console.log(
      '%cFramework: React 18.3.1 + Vite 6.3.5',
      'color: #666; font-size: 12px;'
    );
    console.log(
      '%cUI: Radix UI + Tailwind CSS + shadcn/ui',
      'color: #666; font-size: 12px;'
    );
    console.log('-----------------------------------');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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