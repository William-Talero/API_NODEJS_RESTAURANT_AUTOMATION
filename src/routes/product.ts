import { Router } from "express";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSuggest
} from "../controllers/product.controller";
import verifyJWT from "../middleware/session";

const router = Router();

router.get("/", verifyJWT, getProducts);
router.get("/get-product/:id", verifyJWT, getProduct);
router.post("/", verifyJWT,createProduct);
router.put("/update-product/:id", verifyJWT, updateProduct);
router.delete("/delete-product/:id", verifyJWT, deleteProduct);
router.get("/product-suggest", verifyJWT, getProductSuggest);

export { router };
