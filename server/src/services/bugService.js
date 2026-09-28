import { prisma } from "../db.js";
import { AppError } from "../utils/AppError.js";

export async function listBugs(difficulty) {
  return prisma.bug.findMany({
    where: difficulty ? { difficulty } : undefined,
    orderBy: { id: "asc" }
  });
}

export async function getBug(id) {
  const bug = await prisma.bug.findUnique({
    where: { id: Number(id) }
  });

  if (!bug) {
    throw new AppError("Bug not found.", 404, "BUG_NOT_FOUND");
  }

  return bug;
}

export async function createAttempt({ bugId, diagnosis }) {
  const bug = await getBug(bugId);

  const normalized = diagnosis.toLowerCase();
  const keywords = bug.id === 1
    ? ["dependency", "useeffect", "dependency array"]
    : bug.id === 2
      ? ["201", "status", "created"]
      : ["error", "next", "catch", "error handler"];

  const correct = keywords.some((keyword) => normalized.includes(keyword));

  return prisma.attempt.create({
    data: {
      bugId: bug.id,
      diagnosis,
      correct
    }
  });
}
