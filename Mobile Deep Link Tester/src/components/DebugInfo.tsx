import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { toast } from "sonner@2.0.3";

interface DebugInfoProps {
  link: string;
  timestamp: string;
}

export function DebugInfo({ link, timestamp }: DebugInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const debugData = {
    timestamp,
    inputLink: link,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    screenResolution: `${screen.width} x ${screen.height}`,
    viewport: `${window.innerWidth} x ${window.innerHeight}`,
    referrer: document.referrer || '직접 접근',
    currentUrl: window.location.href
  };

  const handleCopy = async () => {
    const debugText = JSON.stringify(debugData, null, 2);
    
    try {
      await navigator.clipboard.writeText(debugText);
      setCopied(true);
      toast.success("디버깅 정보가 클립보드에 복사되었습니다!", {
        duration: 2000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto rounded-none hover:bg-muted/50"
          >
            <span>디버깅 정보</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 pt-0 space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="font-medium text-muted-foreground">타임스탬프:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded">
                    {debugData.timestamp}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">입력된 링크:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded break-all">
                    {debugData.inputLink || '없음'}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">플랫폼:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded">
                    {debugData.platform}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">언어:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded">
                    {debugData.language}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">화면 해상도:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded">
                    {debugData.screenResolution}
                  </p>
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">뷰포트:</span>
                  <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded">
                    {debugData.viewport}
                  </p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">User Agent:</span>
                <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded break-all">
                  {debugData.userAgent}
                </p>
              </div>
              
              <div>
                <span className="font-medium text-muted-foreground">현재 URL:</span>
                <p className="mt-1 font-mono text-xs bg-muted/50 p-2 rounded break-all">
                  {debugData.currentUrl}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleCopy}
              variant="outline"
              className="w-full"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  디버깅 정보 복사
                </>
              )}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}