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
import { TokenSize } from "./components/TokenSize";
import { validateToken, determineTokenType } from "./utils/token-validation";
import { TokenType, DecodedToken, ValidationResult } from "./utils/types";

export function TokenInspector() {
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

      // Use the new determineTokenType function
      const detectedTokenType = determineTokenType(header, payload);
      console.log('Detected token type:', detectedTokenType);
      
      setTokenType(detectedTokenType);

      // Perform validation using the new validation function
      const validationResults = validateToken(header, payload, detectedTokenType);

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
            jwksKeys: jwks.keys.map((k: {kid?: string}) => k.kid)
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
        
        // Log token payload for debugging
        console.log('Token payload for type detection (in JWKS handler):', payload);
        
        // ID Token detection (more comprehensive checks)
        if (payload.nonce || payload.at_hash || payload.c_hash || 
            (payload.aud && payload.sub && payload.iss && payload.exp) || // Standard OpenID claims
            payload.sid || // Session ID is common in ID tokens
            (header.typ === 'JWT' && payload.auth_time) // auth_time is typically in ID tokens
        ) {
          console.log('Detected as ID Token based on:', { 
            hasNonce: !!payload.nonce,
            hasAtHash: !!payload.at_hash, 
            hasCHash: !!payload.c_hash,
            hasStandardClaims: !!(payload.aud && payload.sub && payload.iss && payload.exp),
            hasSid: !!payload.sid,
            hasAuthTime: !!payload.auth_time
          });
          detectedTokenType = "id_token";
        } 
        // Access Token detection
        else if (payload.scope || payload.scp || 
                 (payload.azp && !payload.nonce) ||
                 payload.client_id ||
                 header.typ === 'at+jwt' || // RFC 9068 format
                 (header.typ === 'JWT' && (payload.authorities || payload.roles || payload.permissions))
        ) {
          console.log('Detected as Access Token based on:', { 
            hasScope: !!payload.scope,
            hasScp: !!payload.scp,
            hasAzpWithoutNonce: !!(payload.azp && !payload.nonce),
            hasClientId: !!payload.client_id,
            isAtJwt: header.typ === 'at+jwt',
            hasAuthoritiesRolesPermissions: !!(payload.authorities || payload.roles || payload.permissions)
          });
          detectedTokenType = "access_token";
        } else {
          console.log('Could not determine token type from payload. Setting as unknown.');
        }
        
        setTokenType(detectedTokenType);

        // Perform validation
        const validationResults = validateToken(header, payload, detectedTokenType);

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
            jwksKeys: resolvedJwks.keys.map((k: {kid?: string}) => k.kid)
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
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                ? "OIDC ID Token" 
                : tokenType === "access_token" 
                ? decodedToken.header.typ === "at+jwt" || decodedToken.header.typ === "application/at+jwt"
                  ? "OAuth JWT Access Token (RFC9068)" 
                      : "OAuth Access Token"
                    : <span className="text-amber-500 font-medium">Unknown Token Type</span>
                }
                {tokenType === "unknown" && (
                <span className="block text-xs text-gray-500 mt-1">
                    Missing standard claims. Check browser console for details.
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-3">
                <TokenSize token={decodedToken.raw} />
              </div>
            </div>
            
            {decodedToken.signature.error && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
                {decodedToken.signature.error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 w-full flex overflow-x-auto max-w-full">
                <TabsTrigger value="header" className="flex-1 min-w-fit">Header</TabsTrigger>
                <TabsTrigger value="payload" className="flex-1 min-w-fit">Payload</TabsTrigger>
                <TabsTrigger value="signature" className="flex-1 min-w-fit">Signature</TabsTrigger>
                <TabsTrigger value="timeline" className="flex-1 min-w-fit">Timeline</TabsTrigger>
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
              
              <TabsContent value="timeline">
                <TokenTimeline payload={decodedToken.payload} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
