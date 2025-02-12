import express from "express";
import { addProductController, deleteProductController, updateProductController, viewProductController } from "../controllers/product.controllers";

const productRouter =  express.Router();
productRouter.post("/create", addProductController);
productRouter.post("/view", viewProductController);
productRouter.post("/update", updateProductController);
productRouter.post("/update", deleteProductController);

export default productRouter;