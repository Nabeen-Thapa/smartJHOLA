import express, { Request, Response, Router } from "express";


const deleteCategory :Router = express.Router();

deleteCategory.delete("/delete-category", async(req:Request, res:Response):Promise<void>=>{

})

export default deleteCategory;