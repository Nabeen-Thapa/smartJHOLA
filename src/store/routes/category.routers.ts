import express, { Router } from "express";
import { createCategory } from "../controllers/category.controller";


const categoryRouter :Router = express.Router();

categoryRouter.post("/createCategory", createCategory);
categoryRouter.post("/createCategory", createCategory);



export default categoryRouter;