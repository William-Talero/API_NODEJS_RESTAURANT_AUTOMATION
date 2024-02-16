import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import productService from "../services/product.service";

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await productService.getProduct(id);
    const data = response ? response : "No se encontró el producto";
    res.status(200).send({ data: data });
  } catch (error) {
    handleHttp(res, "Error al obtener el producto");
  }
};

const getProductById = async (id: string) => {
  try {
    const response = await productService.getProduct(id);
    const data = response ? response : "No se encontró el producto";
    return data;
  } catch (error) {
    return "No se encuentra un producto con dichas especificaciones.";
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await productService.getProducts();
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al obtener los productos");
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await productService.createProduct(body);
    res.status(201).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al crear el product", error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await productService.updateProduct(id, body);
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al actualizar el producto");
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await productService.deleteProduct(id);
    res.status(200).send({ data: response });
  } catch (error) {
    handleHttp(res, "Error al eliminar el producto");
  }
};

const getProductSuggest = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    let finalProductSuggest = {};
    const response = await productService.getProductCategory(body.prompt);
    if (typeof response === "string" && response.includes("ERROR")) {
      return res.status(403).send({ message: response });
    }
    const products = await productService.getProductByCategory(response || "");
    const productSuggestions = await productService.getProductSuggest(
      body.prompt,
      products
    );
    productSuggestions !== "null"
      ? (finalProductSuggest = await getProductById(productSuggestions || ""))
      : (finalProductSuggest = {});
    res.status(200).send({
      status: 200,
      response: {
        suggestProduct: finalProductSuggest,
        otherProducts: products,
      },
    });
  } catch (error) {
    handleHttp(res, "Error al obtener el producto sugerido");
  }
};

export {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSuggest,
};
