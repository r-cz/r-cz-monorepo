"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { 
  Card, 
  CardContent, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Button
} from "@r-cz/ui";

// Import MermaidClient dynamically with ssr disabled
const MermaidClient = dynamic(
  () => import('./mermaid-client'),
  { ssr: false }
);

export function MermaidViewer() {
  const [code, setCode] = useState(`graph TD
  A[Start] --> B{Is it working?}
  B -->|Yes| C[Great!]
  B -->|No| D[Debug]
  D --> B`);
  
  const [diagramType, setDiagramType] = useState("flowchart");
  const [error, setError] = useState<string | null>(null);
  
  const handleError = (message: string) => {
    setError(message);
  };
  
  const renderDiagram = () => {
    setError(null);
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

  // Update examples when diagram type changes
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
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
              <MermaidClient 
                code={code}
                onError={handleError}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
