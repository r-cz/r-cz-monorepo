"use client";

import React from "react";
import Image from "next/image";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Separator
} from "@r-cz/ui";

interface EducationItemProps {
  institution: string;
  degree: string;
  logo: string;
  period: string;
  description?: string;
}

function EducationItem({ institution, degree, logo, period, description }: EducationItemProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 relative overflow-hidden rounded-md">
          <Image 
            src={logo} 
            alt={`${institution} logo`} 
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <CardTitle>{degree}</CardTitle>
          <CardDescription>{institution}</CardDescription>
          <CardDescription>{period}</CardDescription>
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <p>{description}</p>
        </CardContent>
      )}
    </Card>
  );
}

export function Education() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6">Education</h2>
      <Separator className="mb-8" />
      
      <EducationItem
        institution="University of Texas at Austin"
        degree="B.S. Computer Science"
        logo="/images/utexas-logo.png"
        period="2014 - 2018"
        description="Focused on cybersecurity and distributed systems."
      />
      
      {/* Add more education items as needed */}
    </section>
  );
}
