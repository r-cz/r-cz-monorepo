"use client";

import React from "react";
import { ValidationResult } from "../utils/types";

interface TokenHeaderProps {
  header: any;
  validationResults: ValidationResult[];
}

export function TokenHeader({ header, validationResults }: TokenHeaderProps) {
  // Map to track which claims have validation results
  const validatedClaims = new Set(
    validationResults.map(result => result.claim.replace('header.', ''))
  );

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
        {JSON.stringify(header, null, 2)}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-md font-medium">Header Claims</h3>
        
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(header).map(([key, value]) => {
            const relevantResults = validationResults.filter(
              result => result.claim === `header.${key}` || result.claim === key
            );
            
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
                  <div className="text-sm text-muted-foreground">
                    {typeof value === 'string' && value}
                    {typeof value !== 'string' && JSON.stringify(value)}
                  </div>
                </div>
                
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

                {/* Common header field explanations */}
                {key === 'alg' && (
                  <div className="text-xs text-gray-500">
                    The algorithm used to sign the token
                  </div>
                )}
                {key === 'typ' && (
                  <div className="text-xs text-gray-500">
                    Token type (usually "JWT")
                  </div>
                )}
                {key === 'kid' && (
                  <div className="text-xs text-gray-500">
                    Key ID used to identify which key to use for validation
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
