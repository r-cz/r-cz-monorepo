"use client";

import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { 
  Card, 
  CardContent, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Button
} from "@r-cz/ui";

export function MermaidViewer() {
  const [code, setCode] = useState(`graph TD
  A[Start] --> B{Is it working?}
  B -->|Yes| C[Great!]
  B -->|No| D[Debug]
  D --> B`);
  
  const [diagramType, setDiagramType] = useState("flowchart");
  const [error, setError] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const renderDiagram = async () => {
    if (!diagramRef.current) return;
    
    try {
      setError(null);
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        securityLevel: 'strict'
      });
      
      diagramRef.current.innerHTML = '';
      await mermaid.render('mermaid-diagram', code, (svgCode) => {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svgCode;
        }
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to render diagram');
    }
  };

  // Set examples based on diagram type
  const setExample = () => {
    switch (diagramType) {
      case "flowchart":
        setCode(`graph TD
  A[Start] --> B{Is it working?}
  B -->|Yes| C[Great!]
  B -->|No| D[Debug]
  D --> B`);
        break;
      case "sequence":
        setCode(`sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Health check
    John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts prevail!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!`);
        break;
      case "class":
        setCode(`classDiagram
  class Animal {
    +name: string
    +eat(): void
    +sleep(): void
  }
  class Dog {
    +breed: string
    +bark(): void
  }
  class Cat {
    +color: string
    +meow(): void
  }
  Animal <|-- Dog
  Animal <|-- Cat`);
        break;
    }
  };

  // Initialize mermaid and render diagram
  useEffect(() => {
    renderDiagram();
    
    // Re-render when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          renderDiagram();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
    };
  }, [code]);

  // Update examples when diagram type changes
  useEffect(() => {
    setExample();
  }, [diagramType]);

  return (
    <div className="space-y-6">
      <Tabs 
        value={diagramType} 
        onValueChange={(value) => setDiagramType(value)}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="flowchart">Flowchart</TabsTrigger>
          <TabsTrigger value="sequence">Sequence Diagram</TabsTrigger>
          <TabsTrigger value="class">Class Diagram</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-2">
              Diagram Code
            </label>
            <textarea
              className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex justify-between mt-4">
              <Button onClick={renderDiagram}>Render</Button>
              <Button variant="outline" onClick={setExample}>Reset to Example</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-2">
              Preview
            </label>
            {error ? (
              <div className="min-h-[300px] bg-destructive/10 text-destructive p-4 rounded-md overflow-auto">
                <p className="font-bold">Error:</p>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            ) : (
              <div 
                className="min-h-[300px] w-full bg-background rounded-md border border-input p-4 overflow-auto flex items-center justify-center"
                ref={diagramRef}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
