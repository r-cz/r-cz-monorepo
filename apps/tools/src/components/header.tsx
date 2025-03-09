"use client";

import React from "react";
import { Header as SharedHeader } from "@r-cz/ui";
import { Wrench } from "lucide-react";

export function Header() {
  const logo = <Wrench className="h-6 w-6 text-primary" />;
  
  return (
    <SharedHeader 
      logo={logo}
      title="Developer Tools"
    />
  );
}