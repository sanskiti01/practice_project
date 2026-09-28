# Concept → Evidence Map

This map is based on the concepts visible in the uploaded screenshot.

| Concept | Evidence |
|---|---|
| LLM API integration | `server/src/services/aiService.js` |
| Prompt engineering | AI prompt with role, context and constraints |
| Structured outputs | JSON schema + parser + normalized response |
| HTTP status codes used correctly | 200/201/400/404/500 + tests |
| Middleware | logger, validation, not-found and error middleware |
| Problem modeling | `Bug` and `Attempt` Prisma models |
| RESTful endpoint design | `/api/bugs`, `/api/bugs/:id`, POST actions |
| Server-side error handling | `errorHandler.js` + `AppError.js` |
| System design basics | `HLD.md` and full-stack request flow |
| Environment variables & secrets management | `.env.example`, server-only AI secret |
| Git workflow | `docs/GIT_WORKFLOW.md` |
| Async data fetching from API | `apiClient.js` + `Bugs.jsx` |
| Client-side routing | React Router routes |
| JavaScript async/await | frontend API calls and backend services |

## Viva evidence

For each item, demonstrate the behavior in the running application first, then open the mapped source file and explain why it exists.
