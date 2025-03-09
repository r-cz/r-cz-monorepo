"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { cn } from "@r-cz/ui/src/lib/utils";
import { Button } from "@r-cz/ui";

export function DiagramActions({ 
  containerRef, 
  className
}: { 
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const copySvg = async () => {
    if (!containerRef.current) return;
    
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;
    
    // Create clean copy of SVG
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    
    if (!svgClone.getAttribute('xmlns')) {
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    
    // Convert to string
    const svgString = new XMLSerializer().serializeToString(svgClone);
    const cleanSvgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=');
    
    try {
      await navigator.clipboard.writeText(cleanSvgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy SVG code:', error);
    }
  };

  const downloadSvg = () => {
    if (!containerRef.current) return;
    
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;
    
    // Create clean copy of SVG
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    
    if (!svgClone.getAttribute('xmlns')) {
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    
    // Ensure dimensions
    if (!svgClone.getAttribute('width') && svgElement.getBoundingClientRect().width) {
      svgClone.setAttribute('width', `${svgElement.getBoundingClientRect().width}`);
    }
    if (!svgClone.getAttribute('height') && svgElement.getBoundingClientRect().height) {
      svgClone.setAttribute('height', `${svgElement.getBoundingClientRect().height}`);
    }
    
    // Convert to string
    const svgString = new XMLSerializer().serializeToString(svgClone);
    const cleanSvgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=');
    
    // Create download link
    const blob = new Blob([cleanSvgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={copySvg}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        Copy SVG Code
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={downloadSvg}
      >
        <DownloadIcon className="h-4 w-4" />
        Download SVG
      </Button>
    </div>
  );
}
