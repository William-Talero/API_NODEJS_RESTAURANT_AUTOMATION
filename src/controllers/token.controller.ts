import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import tokenService from "../services/token.service";

const getToken = async (req: Request, res: Response) => {
  try {
    const response = await tokenService.getToken();
    res.status(200).send({ token: response });
  } catch (error) {
    handleHttp(res, "Error al obtener el token");
  }
};

export { getToken };