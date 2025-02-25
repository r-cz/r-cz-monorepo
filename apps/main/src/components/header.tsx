"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { 
  Button, 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@r-cz/ui";
import { Menu, Mail, FileText, Linkedin, ExternalLink } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
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
                <a href="https://www.linkedin.com/in/ryancruz" target="_blank" rel="noopener noreferrer" className="flex items-center">
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
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
