import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { validateLink } from "./LinkValidator";

interface GeneratedLinkProps {
  link: string;
}

export function GeneratedLink({ link }: GeneratedLinkProps) {
  const validation = validateLink(link);

  if (!link.trim()) {
    return null;
  }

  const handleLinkClick = () => {
    // 딥링크 테스트를 위해 새 창에서 열기
    window.open(link, '_blank');
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
          style={{ backgroundColor: '#9747ff', borderColor: '#9747ff' }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Test Link
        </Button>
      </div>
    </Card>
  );
}