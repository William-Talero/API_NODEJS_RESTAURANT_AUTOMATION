import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/product";
import ChatGPTService from "./chatGPT.service";

const createProduct = (product: Product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const getProducts = () => {
  return ProductModel.find().sort({ category: -1 });
};

const getProduct = (id: string) => {
  const newProduct = ProductModel.findById(id);
  return newProduct;
};

const updateProduct = (id: string, product: Product) => {
  const newProduct = ProductModel.findById(id);
  return newProduct.updateOne(product);
};

const deleteProduct = (id: string) => {
  const newProduct = ProductModel.findById(id);
  return newProduct.deleteOne();
};

const getProductCategory = (prompt: string) => {
  const categories = ["Pastas", "Pizzas", "Bebidas", "Postres", "General"];
  const productSuggest = ChatGPTService.identifyMenuProductCategory(
    prompt,
    categories
  );
  return productSuggest;
};

const getProductByCategory = (category: string) => {
  let product = <any>[];
  category !== "General"
    ? (product = ProductModel.find({
        $or: [
          { category: category },
          { subcategory: category },
          { subcategory2: category },
        ],
      })
        .sort({ category: -1 })
        .limit(20))
    : (product = ProductModel.find().sort({ top: -1 }).limit(20));
  return product;
};

const getProductSuggest = (prompt: string, products: Array<any>) => {
  const productSuggest = ChatGPTService.identifySuggestProduct(
    prompt,
    products
  );
  return productSuggest;
};

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductSuggest,
  getProductCategory,
  getProductByCategory,
};
