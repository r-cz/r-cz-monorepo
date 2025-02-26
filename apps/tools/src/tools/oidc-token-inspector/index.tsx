"use client";

import React, { useState } from "react";
import * as jose from "jose";
import { 
  Card, 
  CardContent, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Button
} from "@r-cz/ui";
import { TokenInput } from "./components/TokenInput";
import { JwksResolver } from "./components/JwksResolver";
import { TokenHeader } from "./components/TokenHeader";
import { TokenPayload } from "./components/TokenPayload";
import { TokenSignature } from "./components/TokenSignature";
import { TokenTimeline } from "./components/TokenTimeline";
import { validateOidcToken } from "./utils/oidc-validation";
import { TokenType, DecodedToken, ValidationResult } from "./utils/types";

export function OidcTokenInspector() {
  const [token, setToken] = useState("");
  const [jwks, setJwks] = useState<jose.JSONWebKeySet | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [tokenType, setTokenType] = useState<TokenType>("id_token");
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [activeTab, setActiveTab] = useState("payload");
  const [issuerUrl, setIssuerUrl] = useState("");

  const decodeToken = async () => {
    if (!token) {
      return;
    }

    try {
      // Parse the token to get parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const [encodedHeader, encodedPayload] = parts;
      const header = JSON.parse(
        Buffer.from(encodedHeader, "base64").toString()
      );
      const payload = JSON.parse(
        Buffer.from(encodedPayload, "base64").toString()
      );

      // Determine token type from payload
      let detectedTokenType: TokenType = "unknown";
      if (payload.nonce || payload.at_hash || payload.c_hash) {
        detectedTokenType = "id_token";
      } else if (payload.scope || payload.scp) {
        detectedTokenType = "access_token";
      } else if (payload.azp && !payload.nonce) {
        detectedTokenType = "access_token";
      }
      
      setTokenType(detectedTokenType);

      // Perform validation
      const validationResults = validateOidcToken(header, payload, detectedTokenType);

      let signatureValid = false;
      let signatureError = undefined;

      // Verify signature if JWKS is provided
      if (jwks) {
        try {
          const keystore = jose.createRemoteJWKSet(
            new URL(`data:application/json;base64,${Buffer.from(JSON.stringify(jwks)).toString('base64')}`)
          );
          
          // Add logging to help with debugging
          console.log('Verifying token signature with JWKS:', { 
            tokenKid: header.kid,
            jwksKeyCount: jwks.keys.length,
            jwksKeys: jwks.keys.map(k => k.kid)
          });
          
          await jose.jwtVerify(token, keystore);
          signatureValid = true;
        } catch (e: any) {
          console.error('Signature verification error:', e);
          signatureError = e.message;
        }
      }

      setDecodedToken({
        header,
        payload,
        signature: {
          valid: signatureValid,
          error: signatureError
        },
        raw: token
      });

      setValidationResults(validationResults);
      
    } catch (err: any) {
      setDecodedToken({
        header: {},
        payload: {},
        signature: {
          valid: false,
          error: err.message
        },
        raw: token
      });
      setValidationResults([{
        claim: "format",
        valid: false,
        message: err.message,
        severity: "error"
      }]);
    }
  };

  const handleJwksResolved = async (resolvedJwks: jose.JSONWebKeySet) => {
    setJwks(resolvedJwks);
    
    // Re-decode token with new JWKS if token is already decoded
    if (decodedToken && token) {
      // Use the new JWKS directly instead of relying on state update
      try {
        const parts = token.split(".");
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format");
        }

        const [encodedHeader, encodedPayload] = parts;
        const header = JSON.parse(
          Buffer.from(encodedHeader, "base64").toString()
        );
        const payload = JSON.parse(
          Buffer.from(encodedPayload, "base64").toString()
        );

        // Determine token type from payload
        let detectedTokenType: TokenType = "unknown";
        if (payload.nonce || payload.at_hash || payload.c_hash) {
          detectedTokenType = "id_token";
        } else if (payload.scope || payload.scp) {
          detectedTokenType = "access_token";
        } else if (payload.azp && !payload.nonce) {
          detectedTokenType = "access_token";
        }
        
        setTokenType(detectedTokenType);

        // Perform validation
        const validationResults = validateOidcToken(header, payload, detectedTokenType);

        let signatureValid = false;
        let signatureError = undefined;

        // Verify signature with the new JWKS
        try {
          const keystore = jose.createRemoteJWKSet(
            new URL(`data:application/json;base64,${Buffer.from(JSON.stringify(resolvedJwks)).toString('base64')}`)
          );
          
          // Add logging to help with debugging
          console.log('Verifying token signature with newly resolved JWKS:', { 
            tokenKid: header.kid,
            jwksKeyCount: resolvedJwks.keys.length,
            jwksKeys: resolvedJwks.keys.map(k => k.kid)
          });
          
          await jose.jwtVerify(token, keystore);
          signatureValid = true;
          console.log('Token signature verification successful');
        } catch (e: any) {
          console.error('Signature verification error with newly resolved JWKS:', e);
          signatureError = e.message;
        }

        setDecodedToken({
          header,
          payload,
          signature: {
            valid: signatureValid,
            error: signatureError
          },
          raw: token
        });

        setValidationResults(validationResults);
      } catch (err: any) {
        // Handle errors
        setDecodedToken({
          header: decodedToken.header,
          payload: decodedToken.payload,
          signature: {
            valid: false,
            error: err.message
          },
          raw: token
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <TokenInput 
            token={token} 
            setToken={setToken} 
            onDecode={decodeToken} 
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">JWKS Configuration</h3>
          <JwksResolver 
            issuerUrl={issuerUrl}
            setIssuerUrl={setIssuerUrl}
            onJwksResolved={handleJwksResolved} 
          />
        </CardContent>
      </Card>

      {decodedToken && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className={`w-4 h-4 rounded-full mr-2 ${
                    decodedToken.signature.valid ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                ></div>
                <span>
                  {decodedToken.signature.valid 
                    ? 'Signature Valid' 
                    : jwks 
                      ? 'Signature Invalid' 
                      : 'Signature Not Verified'
                  }
                </span>
              </div>
              <div className="text-sm font-medium">
                Detected: {tokenType === "id_token" 
                  ? "ID Token" 
                  : tokenType === "access_token" 
                    ? "Access Token" 
                    : "Unknown Token Type"
                }
              </div>
            </div>
            
            {decodedToken.signature.error && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
                {decodedToken.signature.error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="payload">Payload</TabsTrigger>
                <TabsTrigger value="signature">Signature</TabsTrigger>
                {tokenType === "id_token" && (
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="header">
                <TokenHeader 
                  header={decodedToken.header} 
                  validationResults={validationResults.filter(r => r.claim.startsWith('header.'))}
                />
              </TabsContent>
              
              <TabsContent value="payload">
                <TokenPayload 
                  payload={decodedToken.payload} 
                  tokenType={tokenType}
                  validationResults={validationResults.filter(r => !r.claim.startsWith('header.'))}
                />
              </TabsContent>
              
              <TabsContent value="signature">
                <TokenSignature 
                  token={decodedToken.raw}
                  header={decodedToken.header}
                  signatureValid={decodedToken.signature.valid}
                  signatureError={decodedToken.signature.error}
                  jwks={jwks}
                />
              </TabsContent>
              
              {tokenType === "id_token" && (
                <TabsContent value="timeline">
                  <TokenTimeline payload={decodedToken.payload} />
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
