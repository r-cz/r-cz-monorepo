import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useTheme as useLegacyTheme } from '@r-cz/theme';
import { 
  Layout, 
  Card, 
  CardContent, 
  ThemeToggle 
} from '@r-cz/shadcn-ui';

// Lazy load tool components
const JWTDecoder = lazy(() => import('./tools/JWTDecoder'));
const MermaidViewer = lazy(() => import('./tools/MermaidViewer'));

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

function App() {
  return (
    <Router>
      <Layout>
        <div className="w-full flex justify-between items-center mb-6">
          <div className="flex items-center"> 
            <WrenchScrewdriverIcon className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-semibold">Developer Tools</span>
          </div>
          <ThemeToggle />
        </div>
        
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<ToolsList />} />
            <Route path="/jwt" element={<JWTDecoder />} />
            <Route path="/mermaid" element={<MermaidViewer />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

function ToolsList() {
  const tools: Tool[] = [
    {
      name: 'JWT Decoder',
      description: 'Decode and verify JWT tokens with ease',
      path: '/jwt',
      icon: '🔑'
    },
    {
      name: 'Mermaid Viewer',
      description: 'Live preview for Mermaid diagrams',
      path: '/mermaid',
      icon: '🧜‍♀️'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link
          key={tool.path}
          to={tool.path}
          className="block"
        >
          <Card className="h-full border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl mb-2">{tool.icon}</div>
              <h3 className="text-lg font-semibold">{tool.name}</h3>
              <p className="mt-1 text-muted-foreground">{tool.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default App;