import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@r-cz/theme';
import { Layout, Card, CardContent } from '@r-cz/ui';

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
      <Layout
        header={{
          title: 'Developer Tools',
          logo: <WrenchScrewdriverIcon className="h-8 w-8 text-primary-600" />,
          showThemeToggle: true
        }}
        footer={{
          links: [
            { label: 'Main Site', href: 'https://ryancruz.com', external: true },
            { label: 'GitHub', href: 'https://github.com/r-cz', external: true }
          ]
        }}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
      icon: '📊'
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
          <Card variant="bordered" className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl mb-2">{tool.icon}</div>
              <h3 className="text-lg font-semibold">{tool.name}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{tool.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default App;