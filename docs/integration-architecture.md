# Integration Architecture

## Overview

Triagent integrates external services like Gmail and Google Calendar through Corsair.

The application follows a gateway architecture where the browser never communicates directly with the Express backend. All requests first pass through Next.js, which authenticates the user using Better Auth and securely forwards the request to the backend.

```
Browser
    │
    ▼
Next.js (Better Auth)
    │
    │ HttpOnly Cookie
    ▼
Forward Request
    │
    │ x-user-id
    │ x-internal-api-key
    ▼
Express Backend
    │
    ▼
Corsair
    │
    ▼
Google APIs
```

---

# Authentication

The browser authenticates with Better Auth.

The Express backend has no knowledge of Better Auth sessions.

Instead, Next.js forwards:

- x-user-id
- x-internal-api-key

The backend validates the internal API key before trusting the forwarded user ID.

This prevents clients from impersonating another user by manually sending headers.

---

# Multi-Tenancy

Corsair stores OAuth connections per tenant.

The tenant identifier is:

```
Better Auth user.id
```

NOT

```
account.id
```

NOT

```
session.id
```

This distinction became important while implementing disconnect.

Initially the application forwarded the wrong identifier, causing queries against `corsair_accounts` to fail because the stored tenant ID and authenticated tenant ID were different.

Correct implementation:

```ts
"x-user-id": session.session.userId
```

---

# Connection Lifecycle

Each integration follows the same lifecycle.

```
Connect

↓

Connected

↓

Connection Status

↓

Disconnect

↓

Reconnect
```

The architecture is generic and plugin-driven.

```
/api/connect?plugin=gmail

/api/connect?plugin=googlecalendar

/api/disconnect?plugin=gmail

/api/disconnect?plugin=googlecalendar
```

Future integrations (Slack, GitHub, Notion) can reuse the same endpoints.

---

# Disconnect Implementation

The installed version of Corsair does not expose a public disconnect API.

Runtime inspection confirmed:

- no tenant.disconnect()
- no manage.disconnect()
- no manage.connect()

Because of this, disconnect is implemented manually.

Implementation:

1. Find integration.
2. Find account for tenant.
3. Delete synced events.
4. Delete synced entities.
5. Delete OAuth account.

All operations execute inside a database transaction.

```
BEGIN

↓

Delete Events

↓

Delete Entities

↓

Delete Account

↓

COMMIT
```

If any step fails:

```
ROLLBACK
```

---

# Important Debugging Lessons

## 1. Wrong Tenant ID

Symptoms:

```
Plugin is not connected.
```

Cause:

The backend was querying:

```
tenant_id = account.id
```

while Corsair stored:

```
tenant_id = user.id
```

Fix:

Always forward the Better Auth user ID.

---

## 2. Calendar Configuration

The calendar plugin was previously configured using:

```
tenant = "dev"
```

After migrating to user-based tenancy:

```
tenant = session.session.userId
```

Calendar immediately started working.

---

## 3. Google Calendar Timezone

The assistant generated:

```
2026-07-08T17:00:00+05:30
```

which was correct.

The incorrect time shown in Google Calendar was caused by the Google Calendar account being configured with:

```
UTC
```

Changing the Google Calendar primary timezone to:

```
Asia/Kolkata
```

resolved the issue.

---

## 4. Drizzle ORM Investigation

While implementing disconnect, Drizzle type errors appeared when querying Corsair tables.

The investigation revealed:

- shared workspace package
- duplicate dependency trees
- schema typing limitations

Instead of continuing to fight the typings, the disconnect feature was implemented using parameterized SQL with the existing PostgreSQL pool.

This approach is:

- transactional
- secure
- explicit
- independent of ORM typing issues

---

# Design Decisions

## Chosen

- HttpOnly cookie authentication
- Generic plugin architecture
- Next.js gateway
- Internal API key
- Manual disconnect transaction
- Plugin-driven endpoints

## Deferred

- OAuth token revocation with Google
- Soft delete of integrations
- Audit logs
- Connection history

---

# Future Improvements

- Revoke Google refresh tokens during disconnect.
- Rename x-user-id → x-tenant-id for clearer multi-tenancy semantics.
- Rename req.user.id → req.tenantId.
- Add integration health checks.
- Add reconnect flow.
- Add Slack, GitHub and Notion using the same architecture.