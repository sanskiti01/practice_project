# BugLab — Full-Stack Debugging Practice Platform

BugLab is a small full-stack debugging practice platform built specifically to demonstrate the concepts shown in the uploaded Project Score screenshot.

## Concepts intentionally implemented

1. LLM API integration
2. Prompt engineering
3. Structured outputs
4. HTTP status codes used correctly
5. Middleware
6. Problem modeling
7. RESTful endpoint design
8. Server-side error handling
9. System design basics: frontend, backend, DB and integration
10. Environment variables & secrets management
11. Git workflow
12. Async data fetching from API
13. Client-side routing
14. JavaScript async/await

The project also includes `PRD.md`, `HLD.md`, `LLD.md`, seed data, API tests, frontend pages, and a concept-to-code mapping.

## Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: SQLite through Prisma
- AI: OpenAI-compatible chat-completions integration with a safe mock fallback
- Testing: Vitest + Supertest
- Configuration: `.env.example`
- Containerization: Docker + Docker Compose

## Run locally

### 1. Install

```bash
npm install
npm run install:all
```

### 2. Configure

```bash
cp server/.env.example server/.env
```

The default configuration runs without an API key by using the mock AI provider.

### 3. Database

```bash
npm run db:setup
```

### 4. Start both applications

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

### Useful commands

```bash
npm run dev:client
npm run dev:server
npm run build
npm run test
npm run db:seed
```

## AI mode

The server supports:

- `AI_PROVIDER=mock` — works immediately without a secret.
- `AI_PROVIDER=openai-compatible` — sends a structured debugging request to an OpenAI-compatible API.

Never commit `server/.env`.

## Git workflow demonstrated

Recommended workflow:

```bash
git checkout -b feature/bug-hint
git add .
git commit -m "feat: add AI bug hint"
git push -u origin feature/bug-hint
```

See `docs/GIT_WORKFLOW.md`.

## Project structure

```text
BugLab_All_Concepts/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
├── docs/
├── PRD.md
├── HLD.md
├── LLD.md
└── package.json
```

## Viva/demo path

1. Open `/bugs`.
2. Fetch bugs from the REST API.
3. Open a bug detail page using client-side routing.
4. Submit a proposed fix.
5. Show the API response and correct HTTP status.
6. Request an AI hint.
7. Show the structured AI response.
8. Explain middleware, validation, error handling, database model, async/await, environment variables, and Git workflow.
