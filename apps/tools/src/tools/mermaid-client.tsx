"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidClientProps {
  code: string;
  onError: (message: string) => void;
}

export const MermaidClient: React.FC<MermaidClientProps> = ({ code, onError }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return;
      
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          securityLevel: 'strict'
        });
        
        diagramRef.current.innerHTML = '';
        
        // Use the new render method which returns an object with svg and bindFunctions
        const { svg, bindFunctions } = await mermaid.render('mermaid-diagram', code);
        
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
          
          // Apply event bindings if available
          if (bindFunctions) {
            bindFunctions(diagramRef.current);
          }
        }
      } catch (err: any) {
        console.error(err);
        onError(err.message || 'Failed to render diagram');
      }
    };

    renderDiagram();
    
    return () => {
      if (diagramRef.current) {
        diagramRef.current.innerHTML = '';
      }
    };
  }, [code, onError]);

  return (
    <div 
      className="min-h-[300px] w-full bg-background rounded-md border border-input p-4 overflow-auto flex items-center justify-center"
      ref={diagramRef}
    />
  );
};

// Default export for dynamic import
export default MermaidClient;
