"use client";

import React, { useState } from "react";
import { ValidationResult, TokenType } from "../utils/types";
import { getClaimDescription } from "../data/claim-descriptions";
import { getProviderSpecificClaimInfo } from "../data/provider-claims";

interface TokenPayloadProps {
  payload: any;
  tokenType: TokenType;
  validationResults: ValidationResult[];
}

export function TokenPayload({ 
  payload, 
  tokenType,
  validationResults 
}: TokenPayloadProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Common OIDC claims to show first
  const standardClaims = [
    "iss", "sub", "aud", "exp", "iat", "auth_time", "nonce",
    "acr", "amr", "azp", "at_hash", "c_hash"
  ];
  
  // Map to track which claims have validation results
  const validatedClaims = new Set(
    validationResults.map(result => result.claim)
  );

  // Categorize claims
  const commonClaims = Object.keys(payload).filter(key => 
    standardClaims.includes(key)
  );
  
  const otherClaims = Object.keys(payload).filter(key => 
    !standardClaims.includes(key)
  );

  // Format display value for different claim types
  const formatClaimValue = (key: string, value: any) => {
    // Format timestamps as human-readable dates
    if (["exp", "iat", "auth_time", "nbf"].includes(key) && 
        typeof value === "number") {
      return (
        <div>
          <span className="font-mono">{value}</span>
          <span className="ml-2 text-gray-500">
            ({new Date(value * 1000).toLocaleString()})
          </span>
        </div>
      );
    }
    
    // Handle arrays and objects
    if (typeof value === "object" && value !== null) {
      return (
        <pre className="bg-gray-50 p-1 rounded overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    
    // Default string/number display
    return <span className="font-mono">{String(value)}</span>;
  };

  // Render a single claim
  const renderClaim = (key: string, value: any) => {
    const relevantResults = validationResults.filter(
      result => result.claim === key
    );
    
    const claimDescription = getClaimDescription(key);
    const providerSpecificInfo = getProviderSpecificClaimInfo(key);
    
    return (
      <div 
        key={key}
        className="border rounded-md p-3 space-y-2"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <span className="font-mono text-sm font-medium">{key}</span>
            {validatedClaims.has(key) && 
              relevantResults.some(r => r.valid) && (
                <span className="ml-2 w-2 h-2 rounded-full bg-green-500"></span>
              )}
            {validatedClaims.has(key) && 
              relevantResults.some(r => !r.valid) && (
                <span className="ml-2 w-2 h-2 rounded-full bg-yellow-500"></span>
              )}
          </div>
          <div className="text-sm">
            {formatClaimValue(key, value)}
          </div>
        </div>
        
        {/* Validation results */}
        {relevantResults.length > 0 && (
          <div className="space-y-1">
            {relevantResults.map((result, index) => (
              <div 
                key={index}
                className={`text-xs p-2 rounded ${
                  result.severity === 'error' 
                    ? 'bg-red-50 text-red-700' 
                    : result.severity === 'warning'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-blue-50 text-blue-700'
                }`}
              >
                {result.message}
                {result.details && (
                  <p className="mt-1 text-xs opacity-80">{result.details}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Claim description and info */}
        <div className="text-xs text-gray-500 space-y-1">
          {claimDescription && (
            <>
              <p>{claimDescription.description}</p>
              <p className="text-gray-400">
                {claimDescription.specification} 
                {claimDescription.required && tokenType === "id_token" && 
                  " (Required for ID tokens)"}
              </p>
            </>
          )}
          
          {providerSpecificInfo && (
            <div className="mt-1 p-1 bg-blue-50 text-blue-700 rounded">
              Provider-specific: {providerSpecificInfo.provider} - {providerSpecificInfo.description}
            </div>
          )}
          
          {/* Additional helpful info for specific claims */}
          {key === "aud" && Array.isArray(value) && value.length > 1 && (
            <p className="mt-1 text-yellow-600">
              Multiple audiences detected. The "azp" claim should be present when there are multiple audiences.
            </p>
          )}
          
          {key === "scope" && typeof value === "string" && (
            <div className="mt-1">
              <p>Scopes:</p>
              <ul className="list-disc list-inside">
                {value.split(" ").map((scope, i) => (
                  <li key={i}>{scope}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
        {JSON.stringify(payload, null, 2)}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium">Common OIDC Claims</h3>
        
        <div className="grid grid-cols-1 gap-2">
          {commonClaims.map(key => renderClaim(key, payload[key]))}
        </div>
      </div>
      
      {otherClaims.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium">Additional Claims</h3>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600"
            >
              {showAll ? 'Show Less' : `Show All (${otherClaims.length})`}
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {(showAll ? otherClaims : otherClaims.slice(0, 3)).map(key => 
              renderClaim(key, payload[key])
            )}
          </div>
        </div>
      )}
    </div>
  );
}
