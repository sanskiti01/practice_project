import { Router } from "express";
import { list, detail, attempt, aiHint } from "../controllers/bugController.js";
import { requireFields } from "../middleware/validate.js";

const router = Router();

router.get("/", list);
router.get("/:id", detail);
router.post("/attempts", requireFields("bugId", "diagnosis"), attempt);
router.post("/ai/hint", requireFields("bugId", "question"), aiHint);

export default router;
