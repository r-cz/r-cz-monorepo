import { ClaimDescription, TokenType } from "../utils/types";

const claimDescriptions: ClaimDescription[] = [
  // Original claims
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
  },

  // New claims from IANA registry
  {
    name: "middle_name",
    description: "End-User's middle name(s)",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "William"
  },
  {
    name: "nickname",
    description: "Casual name of the End-User",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "Bill"
  },
  {
    name: "preferred_username",
    description: "Shorthand name by which the End-User wishes to be referred to",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "billdoe"
  },
  {
    name: "profile",
    description: "URL of the End-User's profile page",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "URL",
    example: "https://example.com/profile/johndoe"
  },
  {
    name: "picture",
    description: "URL of the End-User's profile picture",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "URL",
    example: "https://example.com/photos/johndoe.jpg"
  },
  {
    name: "website",
    description: "URL of the End-User's web page or blog",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "URL",
    example: "https://johndoe.blog.example.com"
  },
  {
    name: "gender",
    description: "End-User's gender",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "female"
  },
  {
    name: "birthdate",
    description: "End-User's birthday",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "ISO 8601:2004 YYYY-MM-DD format",
    example: "1980-01-15"
  },
  {
    name: "zoneinfo",
    description: "String from zoneinfo time zone database",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    example: "America/Los_Angeles"
  },
  {
    name: "locale",
    description: "End-User's locale",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "RFC 5646 language tag",
    example: "en-US"
  },
  {
    name: "phone_number",
    description: "End-User's preferred telephone number",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "E.164 format",
    example: "+1 (425) 555-1212"
  },
  {
    name: "phone_number_verified",
    description: "True if the End-User's phone number has been verified",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "Boolean",
    example: "true"
  },
  {
    name: "address",
    description: "End-User's preferred postal address",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "JSON object",
    example: "{ \"street_address\": \"123 Main St\", \"locality\": \"Anytown\", \"region\": \"Anystate\", \"postal_code\": \"12345\", \"country\": \"US\" }"
  },
  {
    name: "updated_at",
    description: "Time when the End-User's information was last updated",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "UNIX timestamp",
    example: "1311280970"
  },
  {
    name: "sub_jwk",
    description: "Public key used to check the signature of an ID Token",
    specification: "OIDC Core",
    required: false,
    tokenTypes: ["id_token"],
    format: "JWK",
    example: "{ \"kty\": \"RSA\", \"n\": \"...\", \"e\": \"AQAB\" }"
  },
  {
    name: "cnf",
    description: "Confirmation - contains members that confirm the keys",
    specification: "RFC 7800",
    required: false,
    tokenTypes: ["access_token"],
    format: "JSON object",
    example: "{ \"jwk\": { \"kty\": \"RSA\", \"n\": \"...\", \"e\": \"AQAB\" } }"
  },
  {
    name: "events",
    description: "Security Events",
    specification: "RFC 8417",
    required: false,
    tokenTypes: ["id_token", "access_token"],
    format: "JSON object",
    example: "{ \"https://example.org/events/accountEnabled\": {} }"
  },
  {
    name: "toe",
    description: "Time of Event",
    specification: "RFC 8417",
    required: false,
    tokenTypes: ["id_token", "access_token"],
    format: "UNIX timestamp",
    example: "1311280970"
  },
  {
    name: "txn",
    description: "Transaction Identifier",
    specification: "RFC 8417",
    required: false,
    tokenTypes: ["id_token", "access_token"],
    example: "transaction-12345"
  },
  {
    name: "vot",
    description: "Vector of Trust value",
    specification: "RFC 8485",
    required: false,
    tokenTypes: ["id_token"],
    example: "P1.Cc.Ac"
  },
  {
    name: "vtm",
    description: "Vector of Trust trustmark URL",
    specification: "RFC 8485",
    required: false,
    tokenTypes: ["id_token"],
    format: "URL",
    example: "https://example.org/trustmark/2018"
  },
  {
    name: "act",
    description: "Actor - identifies the subject that is acting on behalf of the JWT's subject",
    specification: "RFC 8693",
    required: false,
    tokenTypes: ["access_token"],
    format: "JSON object",
    example: "{ \"sub\": \"user123\" }"
  },
  {
    name: "may_act",
    description: "Authorized Actor - the party that is authorized to become the actor",
    specification: "RFC 8693",
    required: false,
    tokenTypes: ["access_token"],
    format: "JSON object",
    example: "{ \"sub\": \"agent123\" }"
  },
  {
    name: "roles",
    description: "Roles assigned to the subject",
    specification: "RFC 9068",
    required: false,
    tokenTypes: ["access_token"],
    format: "Array of strings",
    example: "[\"admin\", \"user\"]"
  },
  {
    name: "groups",
    description: "Groups that the subject belongs to",
    specification: "RFC 9068",
    required: false,
    tokenTypes: ["access_token", "id_token"],
    format: "Array of strings",
    example: "[\"admins\", \"developers\"]"
  },
  {
    name: "entitlements",
    description: "Entitlements granted to the subject",
    specification: "RFC 9068",
    required: false,
    tokenTypes: ["access_token"],
    format: "Array of strings",
    example: "[\"read:user\", \"write:user\"]"
  },
  {
    name: "token_introspection",
    description: "Token introspection response",
    specification: "RFC 9701",
    required: false,
    tokenTypes: ["access_token"],
    format: "JSON object",
    example: "{ \"active\": true }"
  },
  {
    name: "htm",
    description: "The HTTP method of the request",
    specification: "OAuth 2.0 Demonstration of Proof-of-Possession",
    required: false,
    tokenTypes: ["access_token"],
    example: "POST"
  },
  {
    name: "htu",
    description: "The HTTP URI of the request (without query and fragment parts)",
    specification: "OAuth 2.0 Demonstration of Proof-of-Possession",
    required: false,
    tokenTypes: ["access_token"],
    format: "URL",
    example: "https://api.example.com/resource"
  },
  {
    name: "verified_claims",
    description: "A structured claim containing end-user claims and how they were assured",
    specification: "OpenID Identity Assurance",
    required: false,
    tokenTypes: ["id_token"],
    format: "JSON object",
    example: "{ \"verification\": { \"trust_framework\": \"eidas\" }, \"claims\": { \"given_name\": \"John\" } }"
  },
  {
    name: "nationalities",
    description: "String array representing the end-user's nationalities",
    specification: "OpenID Identity Assurance",
    required: false,
    tokenTypes: ["id_token"],
    format: "Array of strings",
    example: "[\"US\", \"UK\"]"
  },
  {
    name: "birth_family_name",
    description: "Family name(s) someone has when they were born or as a child",
    specification: "OpenID Identity Assurance",
    required: false,
    tokenTypes: ["id_token"],
    example: "Smith"
  },
  {
    name: "birth_given_name",
    description: "Given name(s) someone has when they were born or as a child",
    specification: "OpenID Identity Assurance",
    required: false,
    tokenTypes: ["id_token"],
    example: "James"
  },
  {
    name: "place_of_birth",
    description: "A structured claim representing the end-user's place of birth",
    specification: "OpenID Identity Assurance",
    required: false,
    tokenTypes: ["id_token"],
    format: "JSON object",
    example: "{ \"country\": \"US\", \"locality\": \"Los Angeles\", \"region\": \"CA\" }"
  },
  {
    name: "authorization_details",
    description: "Contains details about the authorization, including rights of the access token",
    specification: "RFC 9396",
    required: false,
    tokenTypes: ["access_token"],
    format: "JSON array of objects",
    example: "[{ \"type\": \"account_information\", \"actions\": [\"read\"] }]"
  }
];

export function getClaimDescription(claim: string): ClaimDescription | undefined {
  return claimDescriptions.find(desc => desc.name === claim);
}
