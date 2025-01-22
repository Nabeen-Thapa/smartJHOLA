import express, { Request, Response, Router } from "express";

const updateProduct:Router = express.Router();

updateProduct.patch("/update-product", async(req:Request, res:Response):Promise<void>=>{

});

export default updateProduct;