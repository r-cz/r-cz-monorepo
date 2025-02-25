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

interface DecodedToken {
  header: any;
  payload: any;
  valid: boolean;
  error?: string;
}

export function JWTDecoder() {
  const [token, setToken] = useState("");
  const [jwks, setJwks] = useState("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [activeTab, setActiveTab] = useState("header");

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

      let valid = false;
      let error = undefined;

      if (jwks) {
        try {
          // Attempt to verify with JWKS if provided
          const jwksJSON = JSON.parse(jwks);
          const keystore = jose.createRemoteJWKSet(
            new URL(`data:application/json;base64,${Buffer.from(JSON.stringify(jwksJSON)).toString('base64')}`)
          );
          
          await jose.jwtVerify(token, keystore);
          valid = true;
        } catch (e: any) {
          error = e.message;
          valid = false;
        }
      }

      setDecodedToken({
        header,
        payload,
        valid,
        error
      });
    } catch (err: any) {
      setDecodedToken({
        header: {},
        payload: {},
        valid: false,
        error: err.message
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              JWT Token
            </label>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              JWKS Content (optional)
            </label>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={jwks}
              onChange={(e) => setJwks(e.target.value)}
              placeholder='{"keys":[{"kty":"RSA","kid":"...","n":"...","e":"..."}]}'
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste the content of your JWKS endpoint to verify the token's signature
            </p>
          </div>
          
          <Button onClick={decodeToken}>Decode Token</Button>
        </CardContent>
      </Card>

      {decodedToken && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className={`w-4 h-4 rounded-full mr-2 ${decodedToken.valid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span>
                {decodedToken.valid ? 'Signature Valid' : 'Signature Not Verified'}
              </span>
            </div>
            
            {decodedToken.error && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
                {decodedToken.error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="payload">Payload</TabsTrigger>
              </TabsList>
              <TabsContent value="header">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(decodedToken.header, null, 2)}
                </pre>
              </TabsContent>
              <TabsContent value="payload">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(decodedToken.payload, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
