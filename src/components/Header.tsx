export function Header() {
  return (
    <header className="w-full border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-4xl mx-auto px-2 py-2 sm:px-2 sm:py-3">
        <div className="overflow-x-auto">
          <pre
            className="text-center mx-auto font-mono whitespace-pre"
            style={{
              fontSize: 'clamp(0.13rem, 1.1vw, 0.62rem)',
              lineHeight: '1.1',
              fontWeight: 400
            }}
          >
{`             ____                                __                         __                     ______                    __
            /\\  _\`\\                             /\\ \\        __             /\\ \\                   /\\__  _\\                  /\\ \\__
            \\ \\ \\/\\ \\     __      __    _____   \\ \\ \\      /\\_\\     ___    \\ \\ \\/\'\\               \\/_/\\ \\/     __     ____  \\ \\ ,_\\
             \\ \\ \\ \\ \\  /\'__\`\\  /\'__\`\\ /\\ \'__\`\\  \\ \\ \\  __ \\/\\ \\  /\' _ \`\\   \\ \\ , <                  \\ \\ \\   /\'__\`\\  /\',__\\  \\ \\ \\/
              \\ \\ \\_\\ \\/\\  __/ /\\  __/ \\ \\ \\L\\ \\  \\ \\ \\L\\ \\ \\ \\ \\ /\\ \\/\\ \\   \\ \\ \\\\\`\\                 \\ \\ \\ /\\  __/ /\\__, \`\\  \\ \\ \\_
               \\ \\____/\\ \\____\\\\ \\____\\ \\ \\ ,__/   \\ \\____/  \\ \\_\\\\ \\_\\ \\_\\   \\ \\_\\ \\_\\                \\ \\_\\\\ \\____\\\\/\\____/   \\ \\__\\
                \\/___/  \\/____/ \\/____/  \\ \\ \\/     \\/___/    \\/_/ \\/_/\\/_/    \\/_/\\/_/                 \\/_/ \\/____/ \\/___/     \\/__/
                                          \\ \\_\\
                                           \\/_/
`}
          </pre>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-muted-foreground">
            Test your deep links and universal links easily • v0.1.1
          </p>
        </div>
      </div>
    </header>
  );
}