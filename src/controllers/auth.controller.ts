import { Request, Response } from "express";
import authService from "../services/auth.service";
import { handleHttp } from "../utils/error.handle";

const resgisterUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await authService.resgisterUser(body);
    if (typeof response === "string") {
      return res.status(403).send({ message: response });
    }
    res.status(201).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al crear el usuario", error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await authService.loginUser(body);
    if (typeof response === "string" && response.includes("ERROR")) {
      return res.status(403).send({ message: response });
    }
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al iniciar sesion", error);
  }
};

export { resgisterUser, loginUser };
