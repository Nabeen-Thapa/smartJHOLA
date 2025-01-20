import express, { Router } from "express";
import addCategory from "../controllers/add-category";
import addProduct from "../controllers/add-products";
import viewCategory from "../controllers/view-category";

const productRoutes:Router = express.Router();

productRoutes.use("/smartjhola",addCategory);
productRoutes.use("/smartjhola",addProduct);
productRoutes.use("/smartjhola",viewCategory);


export default productRoutes;
