import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import chatGPTService from "../services/chatGPT.service";

const sendPrompt = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const response = await chatGPTService.sendPrompt(prompt);
    if (typeof response === "string" && response.includes("ERROR")) {
      return res.status(403).send({ message: response });
    }
    res.status(200).send([{ status: 200 }, { response: response }]);
  } catch (error) {
    handleHttp(res, "ERROR", error);
  }
};

const findCategory = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const { categories } = req.body;
    const response = await chatGPTService.findCategory(prompt, categories);
    if (typeof response === "string" && response.includes("ERROR")) {
      return res.status(403).send({ message: response });
    }
    res.status(200).send([{ status: 200 }, { response: response }]);
  } catch (error) {
    handleHttp(res, "ERROR", error);
  }
};

const identifyTopic = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const response = await chatGPTService.identifyTopic(prompt);
        if (typeof response === "string" && response.includes("ERROR")) {
            return res.status(403).send({ message: response });
        }
        res.status(200).send([{ status: 200 }, { response: response }]);
    } catch (error) {
        handleHttp(res, "ERROR", error);
    }
};

export { sendPrompt, findCategory, identifyTopic };
