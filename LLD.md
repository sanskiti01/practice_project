# Low-Level Design — BugLab

## 1. Database model

### Bug

| Field | Type | Purpose |
|---|---|---|
| id | Int | Primary key |
| title | String | Problem title |
| description | String | Broken behavior |
| difficulty | String | EASY/MEDIUM/HARD |
| brokenCode | String | Example faulty code |
| expectedBehavior | String | Correct behavior |

### Attempt

| Field | Type | Purpose |
|---|---|---|
| id | Int | Primary key |
| bugId | Int | Related bug |
| diagnosis | String | Learner diagnosis |
| correct | Boolean | Evaluation result |
| createdAt | DateTime | Attempt timestamp |

## 2. API contracts

### GET `/api/bugs`

Response:

```json
{
  "success": true,
  "data": []
}
```

### GET `/api/bugs/:id`

Success: HTTP 200.

Not found: HTTP 404.

### POST `/api/attempts`

Request:

```json
{
  "bugId": 1,
  "diagnosis": "The dependency array is empty..."
}
```

Success: HTTP 201.

Validation error: HTTP 400.

### POST `/api/ai/hint`

Request:

```json
{
  "bugId": 1,
  "question": "What should I inspect first?"
}
```

Structured response:

```json
{
  "hint": "Inspect the effect dependencies.",
  "nextStep": "Compare the dependency array with the values used inside the effect.",
  "confidence": 0.88
}
```

## 3. Middleware

`requestLogger.js`
- Records method, path and duration.

`validate.js`
- Validates request body fields.

`errorHandler.js`
- Converts thrown errors into safe JSON responses.

## 4. Error strategy

Expected client errors:
- 400 for malformed input.
- 404 for missing resources.
- 405/404 for unsupported routes where applicable.

Unexpected server errors:
- 500.
- Generic public message.
- Detailed stack trace only in server logs.

## 5. AI prompt design

The prompt contains:
- Role: debugging mentor.
- Problem context.
- User question.
- Output schema.
- Constraint not to reveal the final fix immediately.

The service parses JSON, validates required keys, clamps confidence to `[0,1]`, and returns a stable application-level object.

## 6. Frontend routing

Routes:
- `/` — dashboard
- `/bugs` — problem list
- `/bugs/:id` — problem detail
- `/about` — architecture/concepts

Navigation uses React Router links, so route changes happen on the client.

## 7. Async flow

The browser uses:

```js
const response = await api.get("/api/bugs");
```

The server uses:

```js
const bugs = await prisma.bug.findMany();
```

This makes asynchronous I/O explicit and readable.
