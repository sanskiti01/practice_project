import { listBugs, getBug, createAttempt } from "../services/bugService.js";
import { getAiHint } from "../services/aiService.js";

export async function list(req, res) {
  const bugs = await listBugs(req.query.difficulty);
  res.status(200).json({ success: true, data: bugs });
}

export async function detail(req, res) {
  const bug = await getBug(req.params.id);
  res.status(200).json({ success: true, data: bug });
}

export async function attempt(req, res) {
  const result = await createAttempt({
    bugId: Number(req.body.bugId),
    diagnosis: req.body.diagnosis
  });

  res.status(201).json({ success: true, data: result });
}

export async function aiHint(req, res) {
  const result = await getAiHint({
    bugId: Number(req.body.bugId),
    question: req.body.question
  });

  res.status(200).json({ success: true, data: result });
}
