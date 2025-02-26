"use client";

import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../button';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock = React.forwardRef<
  HTMLPreElement,
  CodeBlockProps
>(({ code, language = 'json', className, ...props }, ref) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    
    // Reset after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre
        ref={ref}
        className={cn(
          "p-3 block overflow-x-auto rounded-md bg-muted pr-12",
          className
        )}
        {...props}
      >
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        onClick={copyToClipboard}
        aria-label="Copy code"
        type="button"
      >
        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';
