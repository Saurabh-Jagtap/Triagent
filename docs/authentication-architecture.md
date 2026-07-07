# Authentication Architecture

## Background

Triagent consists of two independent applications:

- Frontend: Next.js
- Backend: Express.js

Authentication is handled by Better Auth inside the Next.js application.

Initially, the frontend communicated directly with the Express backend. After receiving security feedback during the hackathon, the authentication system was redesigned to follow a Backend-for-Frontend (BFF) architecture.

## Initial Architecture
```
Browser
        │
        ▼
Next.js (UI)

        │

        ▼

Express API
```
Every frontend request was sent directly to the Express backend.

The browser included:

x-user-id
Request body

The backend trusted the value received in the header.

## Security Problem

The backend authenticated users using:

```ts
const userId = req.header("x-user-id");
```
This meant any client could impersonate another user simply by modifying the request header.

Example:
```ts
POST /api/assistant/chat

x-user-id: victim-user-id
```

The backend accepted the request without verifying the identity of the caller.

This violated one of the most important security principles:

> Never trust data supplied by the client.

---

# Section 4 — Hackathon Feedback

I'd literally quote the feedback:
```
## Hackathon Feedback

Security/config quality is weak:
backend auth trusts arbitrary x-user-id headers.
```

---
# Section 5 — Solutions Considered

This is the part interviewers love.

Document the alternatives.

### Option 1
> Express validates Better Auth session

Rejected because:

- network call every request
- tightly couples Express with Better Auth

### Option 2
Backend JWT

Rejected because:

- duplicated authentication
- two identity systems
- logout inconsistency

### Option 3
Backend-for-Frontend

Selected.

Reasons:

- Better separation of concerns
- Express remains framework agnostic
- Browser never communicates directly with backend
- Backend trusts gateway instead of browser
- Section 6 — Final Architecture

```
Browser
      │
      ▼
Next.js
      │
      │ Better Auth
      ▼
Gateway Route
      │
      ▼
forwardToBackend()
      │
      ▼
Express

Section 7 — Request Lifecycle

Walk through a request.

Example:
User clicks Send Email

↓

React Component

↓

/api/gmail/send

↓

Better Auth validates session

↓

forwardToBackend()

↓

Internal API Key attached

↓

Express Middleware

↓

Controller

↓

Service

↓

Corsair

↓

Response
```
This becomes a fantastic interview explanation.

---
# Section 8 — Internal API Key

Explain:

why it exists
why browser never sees it
why Express only trusts Next.js

This is probably the most important section.

---
# Section 9 — Security Improvements

A simple table:

| Before              | After |
| :---------------- | :------: |
| Browser knew backend URL | Browser only knows Next.js |
| Browser sent `x-user-id` | Gateway derives user from session |
| Express trusted client    |  Express trusts gateway   |
| Duplicate auth logic | Centralized in `forwardToBackend()` | 
| Direct browser → backend | BFF architecture |

---
# Section 10 — Trade-offs

Be honest.

## Pros:

Cleaner architecture
Better security
Easier scaling
Centralized authentication

## Cons:

One additional network hop
Gateway must be maintained
Slightly more code

This shows mature engineering thinking.

---
# Section 11 — Future Improvements

I'd include things like:

Private networking between Next.js and Express.
Rate limiting at the gateway.
Request tracing and correlation IDs.
Internal service authentication using signed service tokens instead of a shared API key.
Distributed caching.

Shows you know where the architecture can evolve.

---
# Section 12 — Interview Notes

This is something I haven't suggested before, but I think it'll be incredibly useful.

---
# Interview Notes

### Why was `x-user-id` insecure?

Because clients are fully controllable by the user. Any user could modify the header and impersonate another user.

---

### Why didn't you let Express validate Better Auth directly?

That would introduce an extra network call and tightly couple the backend to Better Auth.

---

### Why choose a Backend-for-Frontend?

It centralizes authentication, hides backend infrastructure from the browser, and allows the backend to focus solely on business logic.

---

### Biggest takeaway

Authentication should establish a clear trust boundary. In the final architecture, the browser authenticates with Next.js, and Express trusts only the authenticated gateway—not the client.