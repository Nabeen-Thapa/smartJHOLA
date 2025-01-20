import express, { Router } from "express";
import addCategory from "../controllers/add-category";
import addProduct from "../controllers/add-products";
import viewCategory from "../controllers/view-category";
import viewProduct from "../controllers/view-product";

const productRoutes:Router = express.Router();

productRoutes.use("/smartjhola",addCategory);
productRoutes.use("/smartjhola",addProduct);
productRoutes.use("/smartjhola",viewCategory);
productRoutes.use("/smartjhola",viewProduct);


export default productRoutes;
