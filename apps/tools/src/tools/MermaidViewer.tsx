import { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import mermaid from 'mermaid';

import { 
  Button, 
  Card, 
  CardContent, 
  Textarea, 
  Alert, 
  AlertDescription 
} from '@r-cz/shadcn-ui';

interface Example {
  name: string;
  code: string;
}

function MermaidViewer() {
  const [code, setCode] = useState<string>(
    'graph TD\n  A[Start] --> B{Is it working?}\n  B -->|Yes| C[Great!]\n  B -->|No| D[Debug]\n  D --> B'
  );
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(
    document.documentElement.classList.contains('dark')
  );
  const [showAbout, setShowAbout] = useState<boolean>(true);

  // Initialize mermaid with configuration when component mounts or dark mode changes
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: darkMode ? 'dark' : 'default',
      securityLevel: 'strict',
      fontFamily: 'Inter',
      flowchart: {
        curve: 'basis',
        padding: 15
      }
    });
  }, [darkMode]);

  // Observe dark mode changes to update the diagram theme
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const renderDiagram = useCallback(async () => {
    if (!code.trim()) {
      setSvg('');
      setError('');
      return;
    }

    try {
      setError('');
      const { svg } = await mermaid.render('graph-div', code);
      setSvg(svg);
    } catch (err) {
      console.error('Error rendering diagram:', err);
      setError('Invalid diagram syntax. Please check your Mermaid code.');
    }
  }, [code]);

  // Debounced render effect to prevent too frequent updates
  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 500);

    return () => clearTimeout(timer);
  }, [code, renderDiagram]);

  // Predefined examples that users can try
  const examples: Example[] = [
    {
      name: 'Flowchart',
      code: `flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`
    },
    {
      name: 'Sequence Diagram',
      code: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
      John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!`
    },
    {
      name: 'Class Diagram',
      code: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }`
    }
  ];

  const loadExample = (example: Example) => {
    setSelectedExample(example.name);
    setCode(example.code);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Mermaid Diagram Viewer</h1>
        <p className="text-muted-foreground">
          Create and preview Mermaid diagrams with live updates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <Button
                key={example.name}
                onClick={() => loadExample(example)}
                variant={selectedExample === example.name ? "default" : "secondary"}
                size="sm"
              >
                {example.name}
              </Button>
            ))}
          </div>

          <div>
            <label htmlFor="mermaid-code" className="block text-sm font-medium mb-1">
              Diagram Code
            </label>
            <Textarea
              id="mermaid-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-96 font-mono"
              placeholder="Enter your Mermaid diagram code here..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Preview</h2>
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : svg ? (
            <Card className="overflow-auto">
              <CardContent className="p-4">
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4 text-muted-foreground">
                Your diagram preview will appear here
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {showAbout && (
        <Card className="relative">
          <CardContent className="pt-6">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close about section"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold mb-2">About Mermaid Diagrams</h2>
            <p className="text-sm text-muted-foreground">
              Mermaid lets you create diagrams and visualizations using text and code.
              It supports many diagram types including flowcharts, sequence diagrams,
              class diagrams, state diagrams, and more. The syntax is simple and
              markdown-like, making it easy to maintain and version control your diagrams.
            </p>
            <div className="mt-2">
              <a
                href="https://mermaid.js.org/syntax/flowchart.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View Mermaid Syntax Documentation →
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MermaidViewer;