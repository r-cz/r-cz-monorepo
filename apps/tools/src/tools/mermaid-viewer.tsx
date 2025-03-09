"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Card, 
  CardContent,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@r-cz/ui";
import { ChevronDown } from "lucide-react";

// Import MermaidClient dynamically with ssr disabled
const MermaidClient = dynamic(
  () => import('./mermaid-client'),
  { ssr: false }
);

// Define examples with labels and code
const diagramExamples = {
  flowchart: {
    label: "Flowchart",
    code: `graph TD
  A[Start] --> B{Is it working?}
  B -->|Yes| C[Great!]
  B -->|No| D[Debug]
  D --> B`
  },
  sequence: {
    label: "Sequence Diagram",
    code: `sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
  loop Health check
    John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts prevail!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!`
  },
  class: {
    label: "Class Diagram",
    code: `classDiagram
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
  Animal <|-- Cat`
  },
  gantt: {
    label: "Gantt Chart",
    code: `gantt
  title A Gantt Diagram
  dateFormat YYYY-MM-DD
  section Section
  A task         :a1, 2023-01-01, 30d
  Another task   :after a1, 20d
  section Another
  Task in sec    :2023-01-12, 12d
  Another task   :24d`
  },
  erDiagram: {
    label: "Entity Relationship",
    code: `erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
  },
  pie: {
    label: "Pie Chart",
    code: `pie title Favorite Types of Pies
  "Apple" : 42.96
  "Blueberry" : 19.91
  "Cherry" : 17.04
  "Pecan" : 20.09`
  } 
};

export function MermaidViewer() {
  const [code, setCode] = useState(diagramExamples.flowchart.code);
  const [currentExample, setCurrentExample] = useState("flowchart");
  const [error, setError] = useState<string | null>(null);
  
  const handleError = (message: string) => {
    setError(message || null);
  };
  
  const loadExample = (exampleKey: string) => {
    if (exampleKey in diagramExamples) {
      setCurrentExample(exampleKey);
      setCode(diagramExamples[exampleKey as keyof typeof diagramExamples].code);
      setError(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Diagram Code
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8">
                    Examples <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Diagram Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(diagramExamples).map(([key, { label }]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => loadExample(key)}
                      className={currentExample === key ? "bg-accent" : ""}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <textarea
              className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(null);
              }}
              spellCheck="false"
            />
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
