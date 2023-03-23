import { Request, Response, Router } from "express";
import { resgisterUser, loginUser } from "../controllers/auth.controller";

const router = Router();

router.post('/register', resgisterUser);
router.post('/login', loginUser);

export { router };