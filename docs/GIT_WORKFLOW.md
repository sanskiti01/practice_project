# Git Workflow Demonstration

The project is structured for a normal feature-branch workflow.

## Example

```bash
git checkout -b feature/ai-hints
git status
git add server/src/services/aiService.js client/src/pages/BugDetail.jsx
git commit -m "feat: add AI debugging hints"
git push -u origin feature/ai-hints
```

Then open a pull request, review it, merge it into the main branch, and pull the updated branch.

## Why this demonstrates the concept

- Small feature branches isolate work.
- `git status` shows changed files.
- `git add` creates an intentional commit set.
- A descriptive commit message explains the change.
- Pull requests create a review point.
