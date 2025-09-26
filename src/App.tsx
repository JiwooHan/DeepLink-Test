import { Header } from "./components/Header";
import { LinkTester } from "./components/LinkTester";
import { Toaster } from "./components/ui/sonner";

export default function App() {

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