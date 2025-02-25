import { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';
import mermaid from 'mermaid';
import { 
  Card, 
  CardContent, 
  Button, 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator
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

      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <Button
            key={example.name}
            onClick={() => loadExample(example)}
            variant={selectedExample === example.name ? "default" : "outline"}
            size="sm"
          >
            {example.name}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="mt-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 font-mono text-sm px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-background border-border"
                placeholder="Enter your Mermaid diagram code here..."
                spellCheck="false"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="p-4 pt-4">
              {error ? (
                <div className="p-4 text-sm border rounded-md bg-destructive/10 border-destructive/20 text-destructive">
                  {error}
                </div>
              ) : svg ? (
                <div
                  className="p-4 bg-background rounded-md shadow overflow-auto border border-border"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ) : (
                <div className="p-4 text-muted-foreground bg-background rounded-md border border-border">
                  Your diagram preview will appear here
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showAbout && (
        <Card className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2"
            onClick={() => setShowAbout(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">About Mermaid Diagrams</h2>
            <p className="text-sm text-muted-foreground">
              Mermaid lets you create diagrams and visualizations using text and code.
              It supports many diagram types including flowcharts, sequence diagrams,
              class diagrams, state diagrams, and more.
            </p>
            <Separator className="my-4" />
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://mermaid.js.org/syntax/flowchart.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                View Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MermaidViewer;