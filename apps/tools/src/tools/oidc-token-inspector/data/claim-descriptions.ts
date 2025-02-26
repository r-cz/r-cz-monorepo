import { ClaimDescription, TokenType } from "../utils/types";

const claimDescriptions: ClaimDescription[] = [
  {
    name: "iss",
    description: "Issuer Identifier - identifies the principal that issued the token",
    specification: "OIDC Core",
    required: true,
    tokenTypes: ["id_token", "access_token", "refresh_token"],
    format: "URL",
    example: "https://auth.example.com"
  },
  {
    name: "sub",
    description: "Subject Identifier - identifies the principal that is the subject of the token",
    specification: "OIDC Core",
    required: true,
    tokenTypes: ["id_token", "access_token"],
    example: "24400320"
  },
  {
    name: "aud",
    description: "Audience - identifies the recipient(s) for which the token is intended",
    specification: "OIDC Core",
    required: true,
    tokenTypes: ["id_token", "access_token"],
    example: "s6BhdRkqt3"
  },
  {
    name: "exp",
    description: "Expiration Time - identifies the expiration time of the token",
    specification: "OIDC Core",
    required: true,
    tokenTypes: ["id_token", "access_token", "refresh_token"],
    format: "UNIX timestamp",
    example: "1311281970"
  },
  {
    name: "iat",
    description: "Issued At - identifies the time at which the token was issued",
    specification: "OIDC Core",
    required: true,
    tokenTypes: ["id_token", "access_token", "refresh_token"],
    format: "UNIX timestamp",
    example: "1311280970"
  },
  {
    name: "auth_time",
    description: "Time when authentication occurred",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "UNIX timestamp",
    example: "1311280969"
  },
  {
    name: "nonce",
    description: "String value used to associate a client session with an ID Token (mitigates replay attacks)",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "n-0S6_WzA2Mj"
  },
  {
    name: "acr",
    description: "Authentication Context Class Reference - level of authentication/assurance",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "urn:mace:incommon:iap:silver"
  },
  {
    name: "amr",
    description: "Authentication Methods References - methods used for authentication",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "Array of strings",
    example: "[\"pwd\",\"otp\"]"
  },
  {
    name: "azp",
    description: "Authorized Party - the party to which the token was issued",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token", "access_token"],
    example: "s6BhdRkqt3"
  },
  {
    name: "at_hash",
    description: "Access Token hash value - provides validation of the access token",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "MTIzNDU2Nzg5MDEyMzQ1Ng"
  },
  {
    name: "c_hash",
    description: "Code hash value - provides validation of the authorization code",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "LDktKdoQak3Pk0cnXxCltA"
  },
  {
    name: "scope",
    description: "OAuth 2.0 scopes that the client has been granted",
    specification: "OAuth 2.0",
    required: false,
    tokenTypes: ["access_token"],
    format: "Space-delimited string",
    example: "openid profile email"
  },
  {
    name: "scp",
    description: "Alternative representation of scopes (used by some providers)",
    specification: "Vendor-specific",
    required: false,
    tokenTypes: ["access_token"],
    format: "Array of strings",
    example: "[\"openid\",\"profile\",\"email\"]"
  },
  {
    name: "client_id",
    description: "OAuth 2.0 client identifier",
    specification: "OAuth 2.0",
    required: false,
    tokenTypes: ["access_token", "refresh_token"],
    example: "s6BhdRkqt3"
  },
  {
    name: "jti",
    description: "JWT ID - provides a unique identifier for the token",
    specification: "JWT",
    required: false,
    tokenTypes: ["id_token", "access_token", "refresh_token"],
    example: "id12342"
  },
  {
    name: "sid",
    description: "Session ID - identifies the end-user's session",
    specification: "OIDC Session Management",
    required: false,
    tokenTypes: ["id_token"],
    example: "08a5019c-17e1-4977-8f42-65a12843ea02"
  },
  {
    name: "nbf",
    description: "Not Before - identifies the time before which the token must not be accepted",
    specification: "JWT",
    required: false,
    tokenTypes: ["id_token", "access_token", "refresh_token"],
    format: "UNIX timestamp",
    example: "1311280970"
  },
  {
    name: "name",
    description: "End-User's full name",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "John Doe"
  },
  {
    name: "given_name",
    description: "End-User's given name(s) or first name(s)",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "John"
  },
  {
    name: "family_name",
    description: "End-User's surname(s) or last name(s)",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "Doe"
  },
  {
    name: "email",
    description: "End-User's email address",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "john.doe@example.com"
  },
  {
    name: "email_verified",
    description: "True if the End-User's email address has been verified",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "Boolean",
    example: "true"
  }
];

export function getClaimDescription(claim: string): ClaimDescription | undefined {
  return claimDescriptions.find(desc => desc.name === claim);
}
