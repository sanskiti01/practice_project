const concepts = [
  ["LLM API integration", "server/src/services/aiService.js"],
  ["Prompt engineering", "server/src/services/aiService.js"],
  ["Structured outputs", "server/src/services/aiService.js"],
  ["HTTP status codes used correctly", "controllers + tests"],
  ["Middleware", "server/src/middleware/"],
  ["Problem modeling", "server/prisma/schema.prisma + bugService.js"],
  ["RESTful endpoint design", "server/src/routes/bugRoutes.js"],
  ["Server-side error handling", "server/src/middleware/errorHandler.js"],
  ["System design basics", "HLD.md"],
  ["Environment variables & secrets management", "server/.env.example"],
  ["Git workflow", "docs/GIT_WORKFLOW.md"],
  ["Async data fetching from API", "client/src/pages/Bugs.jsx"],
  ["Client-side routing", "client/src/main.jsx + React Router"],
  ["JavaScript — async/await", "client/src/api + server services"]
];

export default function About() {
  return (
    <section>
      <p className="eyebrow">PROJECT SCORE MAP</p>
      <h2>Concepts demonstrated</h2>
      <p className="lead">Each concept is connected to a real file or behavior instead of being included only as documentation.</p>
      <div className="concept-list">
        {concepts.map(([name, file], index) => (
          <div className="concept" key={name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{name}</strong><small>{file}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}
