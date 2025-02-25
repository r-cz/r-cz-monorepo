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

interface JobProps {
  title: string;
  company: string;
  logo: string;
  period: string;
  description: string | React.ReactNode;
}

function Job({ title, company, logo, period, description }: JobProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 relative overflow-hidden rounded-md">
          <Image 
            src={logo} 
            alt={`${company} logo`} 
            fill
            className="object-contain"
          />
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{company}</CardDescription>
          <CardDescription>{period}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {typeof description === "string" ? (
          <p>{description}</p>
        ) : (
          description
        )}
      </CardContent>
    </Card>
  );
}

export function WorkExperience() {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
      <Separator className="mb-8" />
      
      <Job
        title="Senior Cybersecurity Engineer"
        company="Southwest"
        logo="/images/LUV.svg"
        period="Aug 2018 - Present"
        description={
          <>
            <p className="mb-4">Building a modern Identity solution for 100M+ Southwest.com customers.</p>
            <p className="mb-4">Previously migrated a legacy login solution for the Enterprise to a new Identity Provider enabling 70,000+ employees with SSO and MFA across hundreds of onboarded applications.</p>
          </>
        }
      />
      
      <Job
        title="Mac+ Technical Advisor"
        company="Apple"
        logo="/images/apple-light.svg"
        period="Jul 2016 - May 2018"
        description="Provided technical support for all mobile and desktop Apple devices and related Apple Account and iCloud services"
      />
    </section>
  );
}
