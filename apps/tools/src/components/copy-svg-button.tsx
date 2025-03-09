"use client";

import { useState, useRef } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@r-cz/ui/src/lib/utils";
import { Button } from "@r-cz/ui";

export function CopySvgButton({ 
  containerRef, 
  className,
  label = "Copy as SVG"
}: { 
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!containerRef.current) {
      console.error('Container reference is null');
      return;
    }

    try {
      // Find SVG element inside the container
      const svgElement = containerRef.current.querySelector('svg');
      if (!svgElement) {
        console.error('No SVG element found in container');
        return;
      }

      // Clone the SVG so we can modify it without affecting the displayed diagram
      const svgClone = svgElement.cloneNode(true) as SVGElement;
      
      // Ensure proper XML namespace
      if (!svgClone.getAttribute('xmlns')) {
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      
      // Preserve other useful attributes
      if (!svgClone.getAttribute('width') && svgElement.getBoundingClientRect().width) {
        svgClone.setAttribute('width', `${svgElement.getBoundingClientRect().width}`);
      }
      if (!svgClone.getAttribute('height') && svgElement.getBoundingClientRect().height) {
        svgClone.setAttribute('height', `${svgElement.getBoundingClientRect().height}`);
      }

      // Serialize the SVG to XML string
      const svgString = new XMLSerializer().serializeToString(svgClone);
      const cleanSvgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix namespace

      // Just copy the SVG as text
      await navigator.clipboard.writeText(cleanSvgString);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      
    } catch (error) {
      console.error('Failed to copy SVG:', error);
      
      // Final fallback - just try to copy any text content if everything else fails
      if (containerRef.current) {
        const textContent = containerRef.current.textContent || '';
        navigator.clipboard.writeText(textContent)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(e => console.error("Couldn't even copy text content", e));
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-1", className)}
      onClick={handleCopy}
    >
      {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      {label}
    </Button>
  );
}
