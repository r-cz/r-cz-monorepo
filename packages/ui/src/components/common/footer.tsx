"use client";

import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

interface FooterProps {
  showGithubLink?: boolean;
  showMainSiteLink?: boolean;
  githubUrl?: string;
  customLinks?: React.ReactNode;
}

export function Footer({ 
  showGithubLink = false, 
  showMainSiteLink = false,
  githubUrl = "https://github.com/ryancruz/r-cz-monorepo",
  customLinks
}: FooterProps) {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Ryan Cruz. All rights reserved.
        </p>
        
        {(showGithubLink || showMainSiteLink || customLinks) && (
          <div className="flex items-center gap-4">
            {showGithubLink && (
              <Link 
                href={githubUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            )}
            
            {showMainSiteLink && (
              <Link 
                href="https://ryancruz.com" 
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ryancruz.com
              </Link>
            )}

            {customLinks}
          </div>
        )}
      </div>
    </footer>
  );
}