"use client";

import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { cn } from '../../../lib/utils';

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

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre
      ref={ref}
      className={cn(
        "p-3 block overflow-x-auto rounded-md bg-muted",
        className
      )}
      {...props}
    >
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
});

CodeBlock.displayName = 'CodeBlock';
