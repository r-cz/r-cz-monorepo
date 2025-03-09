"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../../";
import { Wrench } from "lucide-react";

interface HeaderProps {
  logo?: ReactNode;
  title?: string;
  menuContent?: ReactNode;
  rightContent?: ReactNode;
  href?: string;
}

export function Header({
  logo,
  title,
  menuContent,
  rightContent,
  href = "/"
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          {(logo || title) && (
            <Link href={href} className="flex items-center space-x-2">
              {logo || <Wrench className="h-6 w-6 text-primary" />}
              {title && <span className="inline-block font-bold">{title}</span>}
            </Link>
          )}
          {menuContent}
        </div>
        <div className="flex items-center gap-2">
          {rightContent}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}