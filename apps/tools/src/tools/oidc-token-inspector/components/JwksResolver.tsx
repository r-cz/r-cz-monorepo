"use client";

import React, { useState } from "react";
import { Button } from "@r-cz/ui";
// Use plain input and textarea elements with shadcn-inspired styling since we don't have the components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@r-cz/ui";
// Using styled divs for alerts

interface JwksResolverProps {
  issuerUrl: string;
  setIssuerUrl: (url: string) => void;
  onJwksResolved: (jwks: any) => void;
}

export function JwksResolver({ 
  issuerUrl, 
  setIssuerUrl, 
  onJwksResolved 
}: JwksResolverProps) {
  const [jwksMode, setJwksMode] = useState<"automatic" | "manual">("automatic");
  const [manualJwks, setManualJwks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; isCors?: boolean } | null>(null);
  
  const fetchJwks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Normalize issuer URL
      const normalizedIssuerUrl = issuerUrl.endsWith("/") 
        ? issuerUrl 
        : `${issuerUrl}/`;
        
      // First, try to fetch the OpenID Configuration
      const configUrl = `${normalizedIssuerUrl}.well-known/openid-configuration`;
      console.log(`Fetching OpenID configuration from: ${configUrl}`);
      
      const configResponse = await fetch(configUrl);
      if (!configResponse.ok) {
        throw new Error(`Failed to fetch OpenID configuration: ${configResponse.status} ${configResponse.statusText}`);
      }
      
      const config = await configResponse.json();
      
      if (!config.jwks_uri) {
        throw new Error("No JWKS URI found in OpenID configuration");
      }
      
      // Then, fetch the JWKS using the jwks_uri
      console.log(`Fetching JWKS from: ${config.jwks_uri}`);
      const jwksResponse = await fetch(config.jwks_uri);
      
      if (!jwksResponse.ok) {
        throw new Error(`Failed to fetch JWKS: ${jwksResponse.status} ${jwksResponse.statusText}`);
      }
      
      const jwks = await jwksResponse.json();
      
      if (!jwks.keys || !Array.isArray(jwks.keys)) {
        throw new Error("Invalid JWKS format: missing 'keys' array");
      }
      
      onJwksResolved(jwks);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching JWKS:", err);
      
      // Check if it's likely a CORS error
      const errorMessage = err.message || "Unknown error";
      const isCorsError = errorMessage.includes("CORS") || 
                         err.name === 'TypeError' && errorMessage.includes('Failed to fetch');
      
      setError({
        message: isCorsError 
          ? 'CORS error: The server does not allow direct browser access.' 
          : `Error fetching JWKS: ${errorMessage}`,
        isCors: isCorsError
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleManualJwksSubmit = () => {
    try {
      const parsedJwks = JSON.parse(manualJwks);
      
      if (!parsedJwks.keys || !Array.isArray(parsedJwks.keys)) {
        throw new Error("Invalid JWKS format: missing 'keys' array");
      }
      
      onJwksResolved(parsedJwks);
      setError(null);
    } catch (err: any) {
      setError({
        message: `Invalid JWKS JSON: ${err.message}`,
        isCors: false
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={jwksMode} onValueChange={(value) => setJwksMode(value as "automatic" | "manual")}>
        <TabsList className="grid grid-cols-2 w-full max-w-xs">
          <TabsTrigger value="automatic">Automatic</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automatic" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="issuer-url" className="block text-sm font-medium pb-2">Issuer URL:</label>
            <input
              id="issuer-url"
              type="text"
              value={issuerUrl}
              onChange={(e) => setIssuerUrl(e.target.value)}
              placeholder="https://example.com/identity"
              className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button 
              onClick={fetchJwks}
              disabled={isLoading || !issuerUrl}
            >
              {isLoading ? 'Fetching...' : 'Fetch JWKS'}
            </Button>
          </div>
          
          {error && (
            <div className="relative w-full rounded-lg border p-4 bg-amber-500/10 text-amber-700">
              <p className="font-medium">{error.message}</p>
              {error.isCors && (
                <div className="mt-2">
                  <p className="text-sm">Try fetching the JWKS manually with:</p>
                  <pre className="bg-muted text-xs mt-1 p-2 rounded-md overflow-x-auto">
                    curl {issuerUrl.endsWith('/') 
                      ? `${issuerUrl}.well-known/jwks.json` 
                      : `${issuerUrl}/.well-known/jwks.json`}
                  </pre>
                  <p className="text-sm mt-2">Then use the "Manual Entry" option to paste the result.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="manual-jwks" className="block text-sm font-medium pb-2">Paste JWKS JSON:</label>
            <textarea
              id="manual-jwks"
              value={manualJwks}
              onChange={(e) => setManualJwks(e.target.value)}
              placeholder='{"keys":[{"kty":"RSA","kid":"...",...}]}'
              className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
            <Button 
              onClick={handleManualJwksSubmit}
              disabled={!manualJwks}
            >
              Use This JWKS
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            <p>JWKS should be a JSON object with a "keys" array containing JWK objects.</p>
            <p>Example format:</p>
            <pre className="bg-muted mt-1 p-2 rounded-md text-xs overflow-x-auto">
{`{
  "keys": [
    {
      "kty": "RSA",
      "kid": "KEY_ID",
      "use": "sig",
      "n": "BASE64_MODULUS",
      "e": "BASE64_EXPONENT"
    }
  ]
}`}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
