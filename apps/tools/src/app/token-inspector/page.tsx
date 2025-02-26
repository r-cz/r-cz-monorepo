"use client";

import { TokenInspector } from "../../tools/oauth-token-inspector";

export default function OidcPage() {
  return (
    <main className="container mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">OAuth/OIDC Token Inspector</h1>
        <p className="text-gray-600 mb-4">
          Inspect and validate OpenID Connect ID Tokens and OAuth 2.0 Access Tokens with detailed explanations of claims and validation results.
        </p>
      </div>
      
      <TokenInspector />
    </main>
  );
}
