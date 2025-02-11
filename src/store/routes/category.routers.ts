import express, { Router } from "express";
import { createCategory, deletedCategory, readCategory, updatedCategord } from "../controllers/category.controller";



const categoryRouter :Router = express.Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/view", readCategory);
categoryRouter.put("/update", updatedCategord);
categoryRouter.delete("/delete", deletedCategory);



export default categoryRouter;