"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

interface MermaidClientProps {
  code: string;
  onError: (message: string) => void;
}

export const MermaidClient: React.FC<MermaidClientProps> = ({ code, onError }) => {
  const [renderAttempt, setRenderAttempt] = useState(0);
  const [diagramHtml, setDiagramHtml] = useState<string>('');

  useEffect(() => {
    // Reset error state on new code
    onError("");
    
    // Wait for DOM to be ready
    const renderTimeout = setTimeout(() => {
      renderDiagram();
    }, 50);
    
    return () => clearTimeout(renderTimeout);
  }, [code, renderAttempt]);

  useEffect(() => {
    // Handle responsive behavior
    const handleResize = () => {
      if (renderAttempt <= 2) {
        setRenderAttempt(prev => prev + 1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDiagram = async () => {
    try {
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
        },
        // Add responsive configuration
        gantt: {
          fontSize: 14
        }
      });
      
      // Generate unique ID to avoid potential conflicts
      const id = `mermaid-diagram-${Date.now()}`;
      
      try {
        // Use the API that returns SVG as a string
        const { svg } = await mermaid.render(id, code);
        
        // Ensure the SVG has proper XML attributes
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svg, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        
        if (!svgElement.getAttribute('xmlns')) {
          svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        
        // Ensure it has width and height
        if (!svgElement.hasAttribute('width')) {
          svgElement.setAttribute('width', '100%');
        }
        if (!svgElement.hasAttribute('height')) {
          svgElement.setAttribute('height', '100%');
        }
        
        // Set viewBox if needed for better scaling
        if (!svgElement.hasAttribute('viewBox') && svgElement.hasAttribute('width') && svgElement.hasAttribute('height')) {
          const width = parseInt(svgElement.getAttribute('width') || '800');
          const height = parseInt(svgElement.getAttribute('height') || '600');
          svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
        
        // Convert back to string
        const serializer = new XMLSerializer();
        const modifiedSvg = serializer.serializeToString(svgElement);
        
        setDiagramHtml(modifiedSvg);
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
      className="min-h-[300px] w-full h-full bg-background rounded-md border border-input p-2 sm:p-4 overflow-auto flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: diagramHtml }}
    />
  );
};

// Default export for dynamic import
export default MermaidClient;
