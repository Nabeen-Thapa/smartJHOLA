import express, { Router } from "express";
import viewSmartUsers from "../controllers/view-users";
import addCategory from "../../products/controllers/add-category";
import addProduct from "../../products/controllers/add-products";

const adminRoutes:Router = express.Router();

adminRoutes.use("/smartjhola", viewSmartUsers);
adminRoutes.use("/smartjhola", addCategory);
adminRoutes.use("/smartjhola", addProduct);


export default adminRoutes;