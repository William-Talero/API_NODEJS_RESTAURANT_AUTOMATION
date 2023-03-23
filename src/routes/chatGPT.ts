import { Router } from "express";
import verifyJWT from "../middleware/session";
import {
  sendPrompt,
  findCategory,
  identifyTopic,
} from "../controllers/chatGPT.cotroller";

const router = Router();

router.get("/", verifyJWT, sendPrompt);
router.get("/category", verifyJWT, findCategory);
router.get("/topic", verifyJWT, identifyTopic);

export { router };
