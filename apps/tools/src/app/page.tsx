import Link from "next/link";
import { Card, CardContent } from "@r-cz/ui";

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

export default function Home() {
  const tools: Tool[] = [
    {
      name: "JWT Decoder",
      description: "Decode and verify JWT tokens with ease",
      path: "/jwt",
      icon: "🔑"
    },
    {
      name: "Mermaid Viewer",
      description: "Live preview for Mermaid diagrams",
      path: "/mermaid",
      icon: "🧜‍♀️"
    },
    {
      name: "OIDC Token Inspector",
      description: "Inspect and validate OpenID Connect tokens with detailed validation",
      path: "/oidc",
      icon: "🔍"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Developer Tools</h1>
      <p className="text-muted-foreground mb-8">
        A collection of useful tools for developers. Choose a tool below to get started.
      </p>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="block"
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                <p className="mt-1 text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
