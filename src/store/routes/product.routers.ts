import express from "express";
import { addProductController, deleteProductController, updateProductController, viewProductController } from "../controllers/product.controllers";
import productImage from "../middleware/productImageUpload";

const productRouter =  express.Router();
productRouter.post("/create",productImage.single("productImage"), addProductController);
productRouter.post("/view", viewProductController);
productRouter.post("/update", updateProductController);
productRouter.post("/update", deleteProductController);

export default productRouter;