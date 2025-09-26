import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

interface LinkValidatorProps {
  link: string;
}

export interface LinkValidation {
  type: 'uri-scheme' | 'universal-link' | 'app-link' | 'invalid' | 'empty';
  message: string;
  isValid: boolean;
}

export function validateLink(link: string): LinkValidation {
  if (!link.trim()) {
    return {
      type: 'empty',
      message: 'Please enter a link',
      isValid: false
    };
  }

  // URI Scheme 패턴 (myapp://, customscheme:// 등)
  const uriSchemePattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/.*/;
  
  // Universal Link 패턴 (https://domain.com/path)
  const universalLinkPattern = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
  
  // App Link 패턴 (https://domain.com/path with specific app link indicators)
  const appLinkPattern = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/.*$/;

  if (uriSchemePattern.test(link) && !link.startsWith('http')) {
    return {
      type: 'uri-scheme',
      message: 'URI scheme deep link format',
      isValid: true
    };
  }

  if (universalLinkPattern.test(link)) {
    return {
      type: 'universal-link',
      message: 'Universal link/App link format',
      isValid: true
    };
  }

  return {
    type: 'invalid',
    message: 'Invalid link format',
    isValid: false
  };
}

export function LinkValidator({ link }: LinkValidatorProps) {
  const validation = validateLink(link);

  const getVariant = () => {
    switch (validation.type) {
      case 'uri-scheme':
      case 'universal-link':
        return 'default';
      case 'invalid':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getIcon = () => {
    if (validation.isValid) {
      return <CheckCircle className="h-3 w-3" />;
    }
    if (validation.type === 'invalid') {
      return <AlertCircle className="h-3 w-3" />;
    }
    return <ExternalLink className="h-3 w-3" />;
  };

  return (
    <div className="flex items-center gap-2 min-h-[32px]">
      {link.trim() && (
        <Badge
          variant={getVariant()}
          className="flex items-center gap-1 text-xs"
          style={validation.type === 'invalid' ? { backgroundColor: '#F08787', borderColor: '#F08787', color: 'white' } : undefined}
        >
          {getIcon()}
          {validation.message}
        </Badge>
      )}
    </div>
  );
}