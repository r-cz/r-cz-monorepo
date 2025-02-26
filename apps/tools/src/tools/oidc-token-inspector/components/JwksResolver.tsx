"use client";

import React, { useState } from "react";
import { Button } from "@r-cz/ui";

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
      <div className="flex space-x-4">
        <button 
          className={`px-4 py-2 rounded ${jwksMode === 'automatic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setJwksMode('automatic')}
        >
          Automatic
        </button>
        <button 
          className={`px-4 py-2 rounded ${jwksMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setJwksMode('manual')}
        >
          Manual Entry
        </button>
      </div>
      
      {jwksMode === 'automatic' ? (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Issuer URL:</label>
            <input
              type="text"
              value={issuerUrl}
              onChange={(e) => setIssuerUrl(e.target.value)}
              placeholder="https://example.com/identity"
              className="w-full p-2 border rounded"
            />
            <Button 
              onClick={fetchJwks}
              disabled={isLoading || !issuerUrl}
              className={isLoading ? 'opacity-50' : ''}
            >
              {isLoading ? 'Fetching...' : 'Fetch JWKS'}
            </Button>
          </div>
          
          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded">
              <p className="text-amber-800 font-medium">{error.message}</p>
              {error.isCors && (
                <div className="mt-2">
                  <p className="text-sm">Try fetching the JWKS manually with:</p>
                  <pre className="p-2 bg-gray-100 rounded text-xs overflow-x-auto mt-1">
                    curl {issuerUrl.endsWith('/') 
                      ? `${issuerUrl}.well-known/jwks.json` 
                      : `${issuerUrl}/.well-known/jwks.json`}
                  </pre>
                  <p className="text-sm mt-2">Then use the "Manual Entry" option to paste the result.</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Paste JWKS JSON:</label>
          <textarea
            value={manualJwks}
            onChange={(e) => setManualJwks(e.target.value)}
            placeholder='{"keys":[{"kty":"RSA","kid":"...",...}]}'
            className="w-full p-2 border rounded font-mono h-40"
          />
          <Button 
            onClick={handleManualJwksSubmit}
            disabled={!manualJwks}
            className={!manualJwks ? 'opacity-50' : ''}
          >
            Use This JWKS
          </Button>
          
          <div className="text-xs text-gray-500 mt-1">
            <p>JWKS should be a JSON object with a "keys" array containing JWK objects.</p>
            <p>Example format:</p>
            <pre className="p-2 bg-gray-100 rounded mt-1 overflow-x-auto">
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
        </div>
      )}
    </div>
  );
}
