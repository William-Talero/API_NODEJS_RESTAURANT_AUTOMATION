import { Router } from "express";
import verifyJWT from "../middleware/session";
import {
  sendPrompt,
  findCategory,
  identifyTopic,
} from "../controllers/chatGPT.cotroller";

const router = Router();

/**
 * @openapi
 * /api/chatGPT:
 *   get:
 *     tags:
 *       - ChatGPT
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", verifyJWT, sendPrompt);
/**
 * @openapi
 * /api/chatGPT/category:
 *   get:
 *     tags:
 *       - ChatGPT
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/category", verifyJWT, findCategory);
/**
 * @swagger
 * /api/chatGPT/topic:
 *   get:
 *     tags:
 *       - ChatGPT
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/topic", verifyJWT, identifyTopic);

export { router };
