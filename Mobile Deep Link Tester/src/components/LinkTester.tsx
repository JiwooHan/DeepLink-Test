import { useState, useEffect } from "react";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { LinkValidator } from "./LinkValidator";
import { GeneratedLink } from "./GeneratedLink";
import { DebugInfo } from "./DebugInfo";

export function LinkTester() {
  const [link, setLink] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // 컴포넌트 마운트 시 타임스탬프 설정
    const now = new Date();
    setTimestamp(now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }));
  }, []);

  const handleGenerateLink = () => {
    // 링크 생성 시 타임스탬프 업데이트
    const now = new Date();
    setTimestamp(now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateLink();
    }
  };

  const placeholderExamples = [
    "myapp://profile/123",
    "https://example.com/app/profile/123",
    "customscheme://action?param=value"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 링크 입력 섹션 */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-input" className="text-base">
              딥링크 URL
            </Label>
            <div className="space-y-2">
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="link-input"
                  type="text"
                  placeholder={placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)]}
                  value={link}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12"
                />
              </div>
              
              {/* 링크 유효성 검사 표시 */}
              <LinkValidator link={link} />
            </div>
          </div>

          <Button 
            onClick={handleGenerateLink}
            className="w-full h-12"
            size="lg"
          >
            링크 생성 및 테스트
          </Button>
        </div>
      </Card>

      {/* 생성된 링크 표시 */}
      <GeneratedLink link={link} />

      {/* 디버깅 정보 */}
      <DebugInfo link={link} timestamp={timestamp} />
    </div>
  );
}