# Gmail OAuth & Webhook Tenant Resolution

## Background

Triagent integrates Gmail using **Corsair**. During the initial implementation, webhooks required a `tenantId` to process Gmail notifications.

The initial implementation looked like this:

```text
Google Pub/Sub
        ↓
Webhook
        ↓
tenantId (query parameter)
        ↓
processWebhook()
```

This worked during development but had a major flaw.

A webhook endpoint should not depend on an external query parameter to identify the tenant. The webhook itself should contain enough information to resolve the correct tenant.

---

# Problem Statement

Corsair's webhook processor requires:

```ts
processWebhook(corsair, headers, body, {
  tenantId,
});
```

However, Google Pub/Sub webhook requests do **not** include our application's tenant ID.

Initially, the application relied on:

```text
/webhook?tenantId=...
```

This tightly coupled the webhook URL with a specific tenant and prevented having a generic webhook endpoint.

---

# Initial Investigation

We investigated several possible approaches.

## 1. Can `processWebhook()` determine the tenant automatically?

**No.**

Removing `tenantId` resulted in:

```text
Account not found for tenant "default"
```

which confirmed that Corsair expects the application to provide the tenant.

---

## 2. Can Corsair expose the connected Gmail account?

We explored:

- `gmail.api.users`
- `gmail.api.profile`
- `gmail.db.profile`
- OAuth callback result

None exposed the Gmail email.

`processOAuthCallback()` only returns:

```ts
{
  tenantId,
  plugin,
  integrationId,
}
```

The Gmail identity is not included.

---

## 3. Can we access the OAuth access token?

Initially, we believed the answer was **no** because only setter methods were documented:

```ts
gmail.keys.setAccessToken(...)
gmail.keys.setRefreshToken(...)
```

Later, we discovered that Corsair also exposes:

```ts
tenantCorsair.gmail.keys.get_access_token()
```

This became the missing piece of the architecture.

---

# Understanding the Webhook Payload

Google Pub/Sub sends a payload similar to:

```json
{
  "message": {
    "data": "base64..."
  }
}
```

Decoding the Base64 payload produces:

```json
{
  "emailAddress": "user@gmail.com",
  "historyId": 206734
}
```

The important observation is that every Gmail webhook already contains the connected Gmail account.

That means we only need a way to map:

```text
gmail email
        ↓
tenant
```

---

# Designing the Mapping

Instead of relying on the application's login email, we introduced a dedicated table:

```text
connected_accounts
```

### Schema

| Column | Description |
|--------|-------------|
| `id` | Primary key |
| `tenantId` | Application tenant |
| `provider` | Connected provider (e.g. Gmail) |
| `externalIdentifier` | External account identifier (Gmail email) |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last updated timestamp |

Where:

```text
provider = gmail

externalIdentifier = Gmail email
```

This table represents:

```text
External Account
        ↓
Application Tenant
```

instead of

```text
User Login Email
        ↓
Application Tenant
```

This allows future support for:

- Multiple Gmail accounts
- Different login providers
- Additional integrations

without changing the architecture.

---

# OAuth Flow

The connection flow now becomes:

```text
User
    ↓
generateOAuthUrl()
    ↓
Google OAuth
    ↓
processOAuthCallback()
    ↓
get_access_token()
    ↓
GET /gmail/v1/users/me/profile
    ↓
emailAddress
    ↓
connected_accounts
```

## Why call the Gmail Profile API?

Although Corsair stores OAuth tokens internally, it does not expose the connected Gmail identity directly.

Using the stored access token allows a single request to:

```http
GET https://gmail.googleapis.com/gmail/v1/users/me/profile
```

which returns:

```json
{
  "emailAddress": "user@gmail.com"
}
```

This email is then persisted into `connected_accounts`.

---

# Webhook Flow

The webhook no longer requires a tenant query parameter.

Instead:

```text
Google Pub/Sub
        ↓
Webhook
        ↓
Decode Base64 payload
        ↓
emailAddress
        ↓
connected_accounts
        ↓
tenantId
        ↓
processWebhook()
```

The webhook endpoint is now completely generic.

---

# Disconnect Flow

When a Gmail account is disconnected:

```text
Delete corsair_events
        ↓
Delete corsair_entities
        ↓
Delete corsair_accounts
        ↓
Delete connected_accounts
```

Removing the mapping keeps the database consistent and prevents duplicate mappings when reconnecting later.

---

# Final Architecture

```text
                OAuth
                  │
                  ▼
        processOAuthCallback()
                  │
                  ▼
      Gmail Profile API
                  │
                  ▼
        connected_accounts
                  ▲
                  │
          Gmail Webhook
                  │
                  ▼
      Decode emailAddress
                  │
                  ▼
         Resolve tenant
                  │
                  ▼
        processWebhook()
```

---

# Key Learnings

## 1. Own your application's mapping

Corsair manages:

- OAuth
- Tokens
- Synchronization
- Webhook processing

Triagent manages:

- Which external account belongs to which tenant.

Keeping these responsibilities separate results in a cleaner architecture.

---

## 2. Don't assume login identity equals integration identity

A user may:

- Sign in with Outlook
- Connect Gmail
- Connect multiple Gmail accounts later

Using a dedicated mapping table keeps authentication and third-party integrations independent.

---

## 3. Investigate before designing

Several assumptions turned out to be incorrect:

- We assumed Corsair exposed Gmail profile information.
- We assumed OAuth tokens were inaccessible.
- We assumed the webhook needed a tenant query parameter.

Systematically validating each assumption led to a much cleaner architecture.

---

## 4. Design one complete pipeline before generalizing

Instead of trying to solve Gmail and Google Calendar together, we completed one end-to-end pipeline:

```text
OAuth
    ↓
Persist mapping
    ↓
Webhook
    ↓
Resolve tenant
    ↓
Sync
```

Having one fully working vertical slice provides a solid foundation for extending the same pattern to future integrations.