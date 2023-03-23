import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import itemService from "../services/item.service";

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await itemService.getItem(id);
    const data = response ? response : "No se encontro el item";
    res.status(200).send({ data: data });
  } catch (error) {
    handleHttp(res, "Error al obtener el item");
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const response = await itemService.getItems();
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al obtener los items");
  }
};

const createItem = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await itemService.createItem(body);
    res.status(201).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al crear el item", error);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await itemService.updateItem(id, body);
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al actualizar el item");
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await itemService.deleteItem(id);
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al eliminar el item");
  }
};

export { getItem, getItems, createItem, updateItem, deleteItem };
