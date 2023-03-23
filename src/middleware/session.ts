import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ")[1];
    const validate = verifyToken(`${jwt}`);
    if (!validate) {
      return res.status(401).send({ message: "INVALID_TOKEN" });
    }
    next();
  } catch (error) {
    return res.status(401).send({ message: "INVALID_TOKEN" });
  }
};

export default verifyJWT;
