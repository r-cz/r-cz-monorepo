import { JWTDecoder } from "@/tools/jwt-decoder";

export default function JWTPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">JWT Decoder</h1>
      <p className="text-muted-foreground mb-6">
        Paste your JWT token and optionally provide JWKS content for signature verification
      </p>
      
      <JWTDecoder />
    </div>
  );
}
