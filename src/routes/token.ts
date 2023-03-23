import { Router } from "express";
import { getToken } from "../controllers/token.controller";
import verifyBasicAuth from "../middleware/basicAuthValidate";

const router = Router();

router.get("/", verifyBasicAuth, getToken);

export { router };
