import { Router } from "express";
import {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
import verifyJWT from "../middleware/session";

const router = Router();

router.get("/", verifyJWT, getItems);
router.get("/:id", verifyJWT, getItem);
router.post("/", verifyJWT,createItem);
router.put("/:id", verifyJWT, updateItem);
router.delete("/:id", verifyJWT, deleteItem);

export { router };
