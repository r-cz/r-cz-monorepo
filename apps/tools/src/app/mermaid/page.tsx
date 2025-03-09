import { MermaidViewer } from "@/tools/mermaid-viewer";

export default function MermaidPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mermaid Diagram Viewer</h1>
      <p className="text-muted-foreground mb-6">
        Create and preview Mermaid diagrams with live updates
      </p>
      
      <MermaidViewer />
    </div>
  );
}
