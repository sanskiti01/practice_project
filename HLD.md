# High-Level Design — BugLab

## 1. Architecture

```text
┌─────────────────────────────┐
│        React Browser        │
│ Pages + Router + API Client │
└──────────────┬──────────────┘
               │ HTTP/JSON
               ▼
┌─────────────────────────────┐
│       Express Backend       │
│ Middleware → Routes → Ctrl  │
│          → Services         │
└───────┬─────────────┬───────┘
        │             │
        ▼             ▼
┌──────────────┐  ┌──────────────────┐
│ SQLite/Prisma│  │ AI Service       │
│ Bugs/Attempts│  │ Mock or external │
└──────────────┘  └──────────────────┘
```

## 2. Components

### Frontend
React provides the user interface. React Router handles client-side routing. `apiClient.js` centralizes asynchronous API calls.

### Backend
Express exposes REST endpoints. Middleware performs request logging and JSON parsing. Controllers translate HTTP requests into service calls. Services contain business logic.

### Database
SQLite stores bugs and attempts. Prisma provides a typed data-access layer.

### AI integration
The backend contains the AI integration. The browser never receives the secret API key. The AI service asks for a constrained JSON response and normalizes the result before sending it to the frontend.

## 3. Request flow

Example: AI hint

```text
Browser
  ↓ POST /api/ai/hint
Express middleware
  ↓
Route
  ↓
Controller
  ↓
AI service
  ↓
Mock/OpenAI-compatible provider
  ↓
Structured result
  ↓
HTTP 200 JSON
  ↓
React state
```

## 4. Security boundaries

- `.env` remains server-only.
- Frontend only knows `VITE_API_URL`.
- AI secret is read by Node.js.
- Input is validated before service calls.
- Error responses avoid stack traces.

## 5. Scaling path

For a larger deployment:

- PostgreSQL instead of SQLite.
- Redis for caching/rate limits.
- Object storage for larger problem assets.
- Background jobs for expensive AI calls.
- Authentication and role-based authorization.
- Observability with structured logs and metrics.
