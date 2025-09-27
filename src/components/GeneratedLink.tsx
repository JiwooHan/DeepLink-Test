import { ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { validateLink } from "./LinkValidator";
import { useState } from "react";

interface GeneratedLinkProps {
  link: string;
}

export function GeneratedLink({ link }: GeneratedLinkProps) {
  const validation = validateLink(link);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!link.trim()) {
    return null;
  }

  const handleLinkClick = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // URI 스킴인 경우 현재 페이지에서 직접 시도
      if (validation.type === 'uri-scheme') {
        // 타이머로 앱 열기 실패 감지
        const timeoutId = setTimeout(() => {
          setErrorMessage("Couldn't open the app. It may not be installed on this device, or an invalid URI scheme was used.");
          setIsLoading(false);
        }, 2000);

        // 페이지 포커스 변화로 성공 감지
        const handleVisibilityChange = () => {
          if (document.hidden) {
            clearTimeout(timeoutId);
            setIsLoading(false);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          }
        };

        const handleBlur = () => {
          clearTimeout(timeoutId);
          setIsLoading(false);
          window.removeEventListener('blur', handleBlur);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        // 현재 창에서 URI 스킴 시도
        window.location.href = link;
      } else {
        // Universal link나 일반 링크는 새 창에서 열기
        window.open(link, '_blank');
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to open the link.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 animate-in fade-in-50 slide-in-from-top-2 duration-300">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Generated Test Link
        </h3>
        
        <div className="p-3 bg-muted/50 rounded-lg border">
          <code className="text-sm break-all text-foreground">
            {link}
          </code>
        </div>

        <Button
          onClick={handleLinkClick}
          className="w-full"
          size="lg"
          disabled={isLoading}
          style={{ backgroundColor: '#9747ff', borderColor: '#9747ff' }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {isLoading ? 'Testing...' : 'Test Link'}
        </Button>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in-50 slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}