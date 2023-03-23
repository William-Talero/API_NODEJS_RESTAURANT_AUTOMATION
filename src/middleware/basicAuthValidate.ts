import { Request, Response, NextFunction } from "express";

const verifyBasicAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userEnv = process.env.USER_EMAIL;
    const passwordEnv = process.env.USER_PASSWORD;
    const { authorization } = req.headers || "";

    if (!authorization) {
      return res.status(401).send({ message: "NO_CRENDENTIALS_PROVIDED" });
    }

    const [type, credentials] = authorization.split(" ");
    if (type !== "Basic") {
      return res.status(401).send({ message: "INVALID_AUTH_TYPE" });
    }

    const [username, password] = Buffer.from(credentials, "base64")
      .toString("utf-8")
      .split(":");

    if (username !== userEnv || password !== passwordEnv) {
      return res.status(401).send({ message: "INVALID_CREDENTIALS" });
    }

    next();
  } catch (error) {
    return res.status(401).send({ message: "INVALID_CREDENTIALS" });
  }
};

export default verifyBasicAuth;
