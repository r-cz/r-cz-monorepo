"use client";

import React from "react";
import { 
  Header as SharedHeader,
  Button, 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@r-cz/ui";
import { Mail, FileText, Linkedin, ExternalLink } from "lucide-react";

export function Header() {
  const menuContent = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-2">
          <span className="inline-block font-bold">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <a href="mailto:mail@ryancruz.com" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Resume</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://www.linkedin.com/in/cruzryan" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Subdomains</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href="https://tools.ryancruz.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>tools.ryancruz.com</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return <SharedHeader menuContent={menuContent} />;
}