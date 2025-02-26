"use client";

import React from "react";
import { JSONWebKeySet } from "jose";

interface TokenSignatureProps {
  token: string;
  header: any;
  signatureValid: boolean;
  signatureError?: string;
  jwks: JSONWebKeySet | null;
}

export function TokenSignature({ 
  token, 
  header, 
  signatureValid, 
  signatureError, 
  jwks 
}: TokenSignatureProps) {
  const parts = token.split('.');
  const signaturePart = parts.length === 3 ? parts[2] : '';
  
  const matchingKey = jwks?.keys.find(key => key.kid === header.kid);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div 
          className={`w-4 h-4 rounded-full ${
            signatureValid ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        ></div>
        <span className="font-medium">
          {signatureValid 
            ? 'Signature Valid' 
            : jwks 
              ? 'Signature Invalid' 
              : 'Signature Not Verified'
          }
        </span>
      </div>
      
      {signatureError && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md">
          {signatureError}
        </div>
      )}
      
      <div>
        <h3 className="text-md font-medium mb-2">Signature Information</h3>
        <div className="border rounded-md p-3 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Algorithm:</label>
            <span className="text-sm font-mono">
              {header.alg || 'Not specified'}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Key ID (kid):</label>
            <span className="text-sm font-mono">
              {header.kid || 'Not specified'}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Raw Signature:</label>
            <div className="bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-xs">
              {signaturePart}
            </div>
          </div>
        </div>
      </div>
      
      {jwks && (
        <div>
          <h3 className="text-md font-medium mb-2">JWKS Information</h3>
          <div className="border rounded-md p-3 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Total Keys in JWKS:</label>
              <span className="text-sm">
                {jwks.keys.length} {jwks.keys.length === 1 ? 'key' : 'keys'}
              </span>
            </div>
            
            {matchingKey ? (
              <div>
                <label className="block text-sm font-medium mb-1">Matching Key Found:</label>
                <div className="bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                  {JSON.stringify(matchingKey, null, 2)}
                </div>
              </div>
            ) : header.kid ? (
              <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                No key with matching key ID "{header.kid}" found in the JWKS.
                This could indicate a key rotation issue or an incorrect JWKS.
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                Token header does not contain a key ID (kid),
                making it difficult to identify the correct key for validation.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
