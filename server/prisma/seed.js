import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bugs = [
  {
    title: "React Effect Runs with Stale Data",
    description: "A counter displays an old value inside an effect.",
    difficulty: "EASY",
    brokenCode: `useEffect(() => {\n  document.title = count;\n}, []);`,
    expectedBehavior: "The document title should update whenever count changes."
  },
  {
    title: "Express Route Returns the Wrong Status",
    description: "A create endpoint reports success with a generic 200 response.",
    difficulty: "MEDIUM",
    brokenCode: `app.post("/api/bugs", async (req, res) => {\n  const bug = await createBug(req.body);\n  res.json(bug);\n});`,
    expectedBehavior: "A successfully created resource should use HTTP 201."
  },
  {
    title: "Async Error Escapes the Route",
    description: "A rejected database promise is not passed to centralized error handling.",
    difficulty: "MEDIUM",
    brokenCode: `app.get("/api/report", async (req, res) => {\n  const report = await buildReport();\n  res.json(report);\n});`,
    expectedBehavior: "Async failures should produce a safe server error response."
  }
];

await prisma.attempt.deleteMany();
await prisma.bug.deleteMany();

await prisma.bug.createMany({ data: bugs });

console.log(`Seeded ${bugs.length} bugs.`);
await prisma.$disconnect();
