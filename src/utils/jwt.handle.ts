import "dotenv/config";
import { sign, verify } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "jdNmyT61.90,K.60248Jffbcnt";

const generateToken = (id: string) => {
  const JWT = sign({ id }, JWT_SECRET_KEY, { expiresIn: "10m" });
  return JWT;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, JWT_SECRET_KEY);
  return decoded;
};

export { generateToken, verifyToken };
