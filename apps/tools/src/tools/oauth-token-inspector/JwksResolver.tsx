"use client";

import React, { useState } from 'react';
import { Button } from "@r-cz/ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@r-cz/ui";

interface JwksResolverProps {
  onJwksResolved: (jwks: any) => void;
}

export function JwksResolver({ onJwksResolved }: JwksResolverProps) {
  const [issuerUrl, setIssuerUrl] = useState('');
  const [jwksMode, setJwksMode] = useState('automatic');
  const [manualJwks, setManualJwks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{message: string; isCors?: boolean} | null>(null);
  
  const fetchJwks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First, try to fetch the OpenID Configuration
      const configUrl = issuerUrl.endsWith('/') 
        ? `${issuerUrl}.well-known/openid-configuration`
        : `${issuerUrl}/.well-known/openid-configuration`;
        
      const configResponse = await fetch(configUrl);
      const config = await configResponse.json();
      
      // Then, fetch the JWKS using the jwks_uri
      const jwksResponse = await fetch(config.jwks_uri);
      const jwks = await jwksResponse.json();
      
      onJwksResolved(jwks);
    } catch (err: any) {
      // Check if it's likely a CORS error
      const isCorsError = err.message.includes('CORS') || 
                         err.name === 'TypeError' && err.message.includes('Failed to fetch');
      
      setError({
        message: isCorsError 
          ? 'CORS error: The server does not allow direct browser access.' 
          : `Error fetching JWKS: ${err.message}`,
        isCors: isCorsError
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleManualJwksSubmit = () => {
    try {
      const parsedJwks = JSON.parse(manualJwks);
      onJwksResolved(parsedJwks);
    } catch (err: any) {
      setError({
        message: `Invalid JWKS JSON: ${err.message}`,
        isCors: false
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">JWKS Configuration</h3>
      
      <div className="flex space-x-2">
        <Button 
          variant={jwksMode === 'automatic' ? 'default' : 'outline'}
          onClick={() => setJwksMode('automatic')}
        >
          Automatic
        </Button>
        <Button 
          variant={jwksMode === 'manual' ? 'default' : 'outline'}
          onClick={() => setJwksMode('manual')}
        >
          Manual Entry
        </Button>
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
              variant="default"
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
                    curl {issuerUrl.endsWith('/') ? `${issuerUrl}` : `${issuerUrl}/`}.well-known/jwks.json
                  </pre>
                  <p className="text-sm mt-2">Then use the "Manual Entry" option to paste the result.</p>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium">Paste JWKS JSON:</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-600 text-xs font-medium cursor-help" aria-label="JWKS format info">?</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>JWKS should be a JSON object with a "keys" array containing JWK objects.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <textarea
            value={manualJwks}
            onChange={(e) => setManualJwks(e.target.value)}
            placeholder='{"keys":[{"kty":"RSA","kid":"...",...}]}'
            className="w-full p-2 border rounded font-mono h-40"
          />
          <Button 
            onClick={handleManualJwksSubmit}
            disabled={!manualJwks}
            variant="default"
          >
            Use This JWKS
          </Button>
          
          <div className="text-xs text-gray-500 mt-1">
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