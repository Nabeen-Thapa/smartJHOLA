import express, { Router } from "express";
//import { createCategory, deletedCategory, readCategory, updatedCategord } from "../controllers/category.controller";
import { CategoryServiceClass } from "../services/category.services";
import { CategoryControllerClass } from "../controllers/category.controller";



const categoryRouter :Router = express.Router();
const categoryServices = new CategoryServiceClass();
const categroyController = new CategoryControllerClass(categoryServices);
categoryRouter.post("/create", categroyController.createCategory);
categoryRouter.get("/view", categroyController.readCategory);
categoryRouter.put("/update", categroyController.updatedCategord);
categoryRouter.delete("/delete", categroyController.deletedCategory);



export default categoryRouter;