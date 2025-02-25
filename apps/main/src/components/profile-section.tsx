"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback,
  Button
} from "@r-cz/ui";

export function ProfileSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-32 w-32 mb-6">
          <AvatarImage src="/images/avatar.png" alt="Ryan Cruz" />
          <AvatarFallback>RC</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
          Ryan Cruz
        </h1>
        <h2 className="text-xl text-muted-foreground mb-6">
          Identity Engineer
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground mb-6">
          Cybersecurity Engineer with 6 years of experience. 
          Currently building a CIAM solution for Southwest Airlines.
          Working hybrid from Dallas, Texas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://tools.ryancruz.com">
              Developer Tools
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
