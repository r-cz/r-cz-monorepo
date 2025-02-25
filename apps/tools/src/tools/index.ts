import React from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.FC<{ className?: string }>;
}

const JWTDecoder = React.lazy(() => import('./JWTDecoder'));
const MermaidViewer = React.lazy(() => import('./MermaidViewer'));

export { JWTDecoder, MermaidViewer };