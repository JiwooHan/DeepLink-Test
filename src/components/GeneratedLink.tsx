import { ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { validateLink } from "./LinkValidator";
import { useEffect, useRef, useState } from "react";

interface GeneratedLinkProps {
  link: string;
}

export function GeneratedLink({ link }: GeneratedLinkProps) {
  const trimmedLink = link.trim();
  const validation = validateLink(trimmedLink);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const listenersRef = useRef<{
    handleVisibilityChange: () => void;
    handleWindowBlur: () => void;
  } | null>(null);

  const cleanupAttempt = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (listenersRef.current) {
      const { handleVisibilityChange, handleWindowBlur } = listenersRef.current;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      listenersRef.current = null;
    }
  };

  const markSuccess = () => {
    cleanupAttempt();
    setIsLoading(false);
  };

  const markFailure = (message: string) => {
    cleanupAttempt();
    setIsLoading(false);
    setErrorMessage(message);
  };

  useEffect(() => {
    return () => {
      cleanupAttempt();
    };
  }, []);

  if (!trimmedLink || !validation.isValid) {
    return null;
  }

  const handleLinkClick = () => {
    cleanupAttempt();
    setErrorMessage(null);
    setIsLoading(true);
    const linkToOpen = trimmedLink;

    try {
      if (validation.type === "uri-scheme") {
        const handleVisibilityChange = () => {
          if (document.hidden) {
            markSuccess();
          }
        };

        const handleWindowBlur = () => {
          markSuccess();
        };

        listenersRef.current = {
          handleVisibilityChange,
          handleWindowBlur,
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleWindowBlur);

        timeoutRef.current = window.setTimeout(() => {
          markFailure(
            "Couldn't open the app. It may not be installed on this device, or an invalid URI scheme was used."
          );
        }, 2000);

        window.location.href = linkToOpen;
      } else {
        window.open(linkToOpen, "_blank", "noopener,noreferrer");
        setIsLoading(false);
      }
    } catch (error) {
      markFailure("Failed to open the link.");
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
