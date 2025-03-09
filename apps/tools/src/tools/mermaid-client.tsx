"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidClientProps {
  code: string;
  onError: (message: string) => void;
}

export const MermaidClient: React.FC<MermaidClientProps> = ({ code, onError }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [renderAttempt, setRenderAttempt] = useState(0);

  useEffect(() => {
    // Reset error state on new code
    onError("");
    
    // Wait for DOM to be ready
    const renderTimeout = setTimeout(() => {
      renderDiagram();
    }, 50);
    
    return () => clearTimeout(renderTimeout);
  }, [code, renderAttempt]);

  const renderDiagram = async () => {
    if (!diagramRef.current) return;
    
    try {
      // Clear previous content
      diagramRef.current.innerHTML = '';
      
      // Initialize with sensible defaults and current theme
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        securityLevel: 'strict',
        fontFamily: 'sans-serif',
        logLevel: 'error',
        flowchart: {
          htmlLabels: true,
          curve: 'linear',
        },
        er: {
          layoutDirection: 'TB',
          minEntityWidth: 100,
          minEntityHeight: 75,
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 120,
        }
      });
      
      // Generate unique ID to avoid potential conflicts
      const id = `mermaid-diagram-${Date.now()}`;
      
      try {
        // Use the new render API pattern
        const { svg } = await mermaid.render(id, code, diagramRef.current);
        
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      } catch (err: any) {
        // Try one more time with a clean element
        if (renderAttempt < 1) {
          setRenderAttempt(prev => prev + 1);
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      console.error(err);
      onError(err.message || 'Failed to render diagram');
    }
  };

  return (
    <div 
      className="min-h-[300px] w-full bg-background rounded-md border border-input p-4 overflow-auto flex items-center justify-center"
      ref={diagramRef}
    />
  );
};

// Default export for dynamic import
export default MermaidClient;
