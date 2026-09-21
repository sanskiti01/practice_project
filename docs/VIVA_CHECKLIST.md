# BugLab Viva Checklist

## LLM API integration
Show `aiService.js`. Explain that the browser calls your backend, not the AI provider directly.

## Prompt engineering
Point to the role, context, constraints and output requirements in the prompt.

## Structured outputs
Explain the JSON schema, parser, required fields and confidence clamping.

## HTTP status codes
Show:
- 200 health/list/detail
- 201 attempt creation
- 400 validation
- 404 missing route/bug
- 500 unexpected server error
- 502 external AI provider failure

## Middleware
Show logger, validation, not-found and error middleware.

## Problem modeling
Explain the Bug and Attempt tables and their relationship.

## REST
Explain why resources and actions are represented with predictable HTTP methods and paths.

## System design
Trace Browser → Express → Service → Prisma/AI → Response.

## Secrets
Explain why `OPENAI_API_KEY` exists only in `server/.env`.

## Async/await
Show one frontend `await fetch` call and one backend `await prisma` call.

## Client-side routing
Click between `/`, `/bugs`, `/bugs/1`, and `/about` without a full browser reload.

## Git workflow
Show the feature branch → commit → push → pull request sequence.
