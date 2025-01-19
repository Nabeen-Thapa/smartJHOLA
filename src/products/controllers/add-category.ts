import express, { Request, Response, Router } from "express";

const addCategory:Router =express.Router();

addCategory.post("/add-category", async(req:Request, res:Response):Promise<void> =>{
    const {categoryName, categoryDescription} = req.body;
});

export default addCategory;
