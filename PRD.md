# Product Requirements Document — BugLab

## 1. Product

**BugLab** is a debugging-practice platform where learners solve intentionally broken frontend/backend code problems.

## 2. Problem

Traditional coding-practice platforms mostly ask learners to produce a correct solution. Debugging requires a different skill: reading an existing system, reproducing a failure, locating the root cause, and making a targeted fix.

BugLab turns debugging into repeatable practice.

## 3. Goals

- Provide a list of realistic bugs.
- Allow a learner to inspect a problem and submit a diagnosis.
- Track attempts and results.
- Provide AI-powered hints without exposing secrets to the browser.
- Return predictable, structured AI responses.
- Demonstrate a complete frontend → backend → database flow.
- Make every concept visible and defendable during a project viva.

## 4. Non-goals

- Production-grade authentication.
- A real code execution sandbox.
- Automatic execution of arbitrary user code.
- Payment or subscription functionality.

## 5. User stories

### Learner
- As a learner, I want to browse debugging problems by difficulty.
- As a learner, I want to open a problem and understand its expected behavior.
- As a learner, I want to submit my diagnosis.
- As a learner, I want an AI hint when I am stuck.
- As a learner, I want to see whether my diagnosis was accepted.

### Developer
- As a developer, I want clear REST endpoints.
- As a developer, I want centralized error handling.
- As a developer, I want secrets kept on the server.
- As a developer, I want structured AI output.
- As a developer, I want the project easy to test and extend.

## 6. Functional requirements

FR-01: List debugging problems.
FR-02: Filter problems by difficulty.
FR-03: Show a single problem.
FR-04: Submit an attempt.
FR-05: Persist attempts.
FR-06: Request an AI hint.
FR-07: Return AI hint data in a predictable JSON shape.
FR-08: Return appropriate HTTP status codes.
FR-09: Validate API input.
FR-10: Handle unexpected server errors centrally.

## 7. Quality requirements

- Secrets must not be stored in frontend source.
- API responses must have a consistent shape.
- Database operations must use async/await.
- Client API calls must use async/await.
- Server failures must not expose stack traces to users.
- Routes must be separated from business logic.

## 8. Success criteria

A reviewer can start the project, open the browser, solve a sample bug, request an AI hint, inspect the network request, and trace the request through frontend, REST route, middleware, controller, service, database, and response.

## 9. Acceptance criteria

- `GET /api/bugs` returns a list with HTTP 200.
- `GET /api/bugs/:id` returns one bug or HTTP 404.
- `POST /api/attempts` returns HTTP 201 for a valid attempt.
- Invalid input returns HTTP 400.
- AI endpoint returns a structured object with `hint`, `nextStep`, and `confidence`.
- Unexpected errors reach the central error middleware.
- Frontend navigation does not reload the page.
