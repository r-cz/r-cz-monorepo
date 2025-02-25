// This file serves as an entry point to all tools

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.FC<{ className?: string }>;
}

// Tool exports will go here as the tools are implemented
export const tools: Tool[] = [];
