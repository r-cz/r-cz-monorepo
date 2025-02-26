import { ProviderSpecificClaim } from "../utils/types";

const providerSpecificClaims: ProviderSpecificClaim[] = [
  // Microsoft Azure AD claims
  {
    name: "tid",
    description: "Tenant ID - Represents the Azure AD tenant that the user belongs to",
    provider: "Microsoft Azure AD",
    example: "72f988bf-86f1-41af-91ab-2d7cd011db47"
  },
  {
    name: "preferred_username",
    description: "The username that the end user prefers to be referred to as",
    provider: "Microsoft Azure AD",
    example: "john.doe@example.com"
  },
  {
    name: "roles",
    description: "Array of app roles the user is assigned to",
    provider: "Microsoft Azure AD",
    format: "Array of strings",
    example: "[\"Admin\", \"User\"]"
  },
  {
    name: "groups",
    description: "Groups that the user belongs to",
    provider: "Microsoft Azure AD",
    format: "Array of strings",
    example: "[\"group1\", \"group2\"]"
  },
  {
    name: "ver",
    description: "Version number - indicates the version of the token",
    provider: "Microsoft Azure AD",
    example: "2.0"
  },
  
  // Auth0 claims
  {
    name: "nickname",
    description: "Casual name of the user",
    provider: "Auth0",
    example: "johnny"
  },
  {
    name: "picture",
    description: "URL of user profile picture",
    provider: "Auth0",
    example: "https://example.com/johndoe.png"
  },
  {
    name: "updated_at",
    description: "Time the user's information was last updated",
    provider: "Auth0",
    example: "2020-01-01T00:00:00.000Z"
  },
  {
    name: "https://example.com/roles",
    description: "Custom namespace claim for roles",
    provider: "Auth0",
    format: "Array of strings",
    example: "[\"admin\", \"editor\"]"
  },
  {
    name: "https://example.com/permissions",
    description: "Custom namespace claim for permissions",
    provider: "Auth0",
    format: "Array of strings",
    example: "[\"read:users\", \"write:users\"]"
  },
  
  // Okta claims
  {
    name: "ver",
    description: "Version of the Okta ID token",
    provider: "Okta",
    example: "1.0"
  },
  {
    name: "groups",
    description: "Groups that the user belongs to",
    provider: "Okta",
    format: "Array of strings",
    example: "[\"Everyone\", \"Admins\"]"
  },
  
  // Google claims
  {
    name: "hd",
    description: "G Suite domain - hosted domain parameter",
    provider: "Google",
    example: "example.com"
  },
  {
    name: "locale",
    description: "User's locale/language preference",
    provider: "Google",
    example: "en-US"
  },
  {
    name: "picture",
    description: "URL of user profile picture",
    provider: "Google",
    example: "https://lh3.googleusercontent.com/a/...s96-c"
  },
  
  // PingFederate claims
  {
    name: "at_class",
    description: "Token class or type identifier",
    provider: "PingFederate",
    example: "access_token" 
  },
  {
    name: "org_id",
    description: "Organization identifier",
    provider: "PingFederate",
    example: "f1a10068-3a9a-4e9b-98af-bb8f8320f1ae"
  },
  {
    name: "ping_roles", 
    description: "Roles assigned to the user within PingFederate",
    provider: "PingFederate",
    format: "Array of strings",
    example: "[\"admin\", \"user\", \"api_access\"]"
  },
  {
    name: "sid",
    description: "Session identifier - links the token to a specific authentication session",
    provider: "PingFederate",
    example: "4f41110b468548af8d5c95e9cfd6cbdd"
  },
  {
    name: "amr_values",
    description: "Authentication Method References - methods used to authenticate the user",
    provider: "PingFederate",
    format: "Array of strings",
    example: "[\"pwd\", \"mfa\", \"otp\"]"
  },
  
  // AWS Cognito claims
  {
    name: "cognito:username",
    description: "User's Cognito username",
    provider: "AWS Cognito",
    example: "johndoe"
  },
  {
    name: "identities",
    description: "User's identity information in identity pools",
    provider: "AWS Cognito",
    format: "JSON array",
    example: "[{\"userId\":\"...\",\"providerName\":\"...\"}]"
  },
  {
    name: "cognito:groups",
    description: "Groups that the user belongs to",
    provider: "AWS Cognito",
    format: "Array of strings",
    example: "[\"admin\", \"standard-users\"]"
  }
];

export function getProviderSpecificClaimInfo(claim: string): ProviderSpecificClaim | undefined {
  return providerSpecificClaims.find(c => c.name === claim);
}

export function getAllProviderSpecificClaims(): ProviderSpecificClaim[] {
  return providerSpecificClaims;
}
