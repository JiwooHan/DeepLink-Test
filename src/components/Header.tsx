import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="w-full border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            딥링크 테스터
          </h1>
          <p className="text-sm text-muted-foreground">
            모바일 앱 딥링크를 쉽게 테스트하세요
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
          )}
          <span className="sr-only">테마 전환</span>
        </Button>
      </div>
    </header>
  );
}